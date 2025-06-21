import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { nanoid } from "nanoid/non-secure";

// Cache configuration
const CACHE_FOLDER = `${FileSystem.cacheDirectory}image_cache/`;
const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB

// In-memory cache map for faster lookups
let cachedUriMap: Record<string, string> = {};

interface UseImageCacheProps {
  /** The image URI to cache */
  uri: string;
  /** Optional custom cache key. If not provided, will be generated from URI */
  cacheKey?: string;
  /** Time to live in milliseconds. Default: 7 days */
  ttl?: number;
}

interface CacheMetadata {
  uri: string;
  timestamp: number;
  expires: number;
  size: number;
}

interface UseImageCacheReturn {
  /** The cached URI (local file path) or original URI if not cached */
  cachedUri: string | null;
  /** Whether the image is currently being downloaded/cached */
  isLoading: boolean;
  /** Any error that occurred during caching */
  error: Error | null;
}

/**
 * Initialize the cache map from existing metadata
 */
const initializeCacheMap = async (): Promise<void> => {
  try {
    const metadataPath = `${CACHE_FOLDER}metadata.json`;
    const metadataExists = await FileSystem.getInfoAsync(metadataPath);

    if (metadataExists.exists) {
      const metadataContent = await FileSystem.readAsStringAsync(metadataPath);
      const metadata = JSON.parse(metadataContent);

      // Populate cachedUriMap from metadata
      Object.entries(metadata).forEach(([fileName, data]: [string, any]) => {
        if (data.uri) {
          const cachePath = `${CACHE_FOLDER}${fileName}`;
          cachedUriMap[data.uri] = cachePath;
        }
      });
    }
  } catch (error) {
    console.warn("Failed to initialize image cache map:", error);
  }
};

/**
 * Ensure the cache directory exists
 */
const ensureCacheDirectory = async (): Promise<void> => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(CACHE_FOLDER);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(CACHE_FOLDER, {
        intermediates: true,
      });
    }
  } catch (error) {
    console.error("Failed to create cache directory:", error);
    throw error;
  }
};

/**
 * Manage cache size by removing oldest files when over limit
 */
const manageCacheSize = async (): Promise<void> => {
  try {
    const metadataPath = `${CACHE_FOLDER}metadata.json`;
    const metadataInfo = await FileSystem.getInfoAsync(metadataPath);

    if (!metadataInfo.exists) return;

    const metadataContent = await FileSystem.readAsStringAsync(metadataPath);
    const metadata: Record<string, CacheMetadata> = JSON.parse(metadataContent);

    // Calculate total cache size
    const entries = Object.entries(metadata);
    let totalSize = entries.reduce(
      (sum, [_, data]) => sum + (data.size || 0),
      0
    );

    // If under limit, do nothing
    if (totalSize <= MAX_CACHE_SIZE) return;

    // Sort by oldest first
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    // Delete oldest files until under 80% of limit
    const updatedMetadata: Record<string, CacheMetadata> = { ...metadata };
    for (const [fileName, data] of entries) {
      if (totalSize <= MAX_CACHE_SIZE * 0.8) break;

      const filePath = `${CACHE_FOLDER}${fileName}`;
      try {
        await FileSystem.deleteAsync(filePath);
        delete updatedMetadata[fileName];
        totalSize -= data.size || 0;

        // Remove from memory cache
        const uriToDelete = Object.entries(cachedUriMap).find(
          ([_, path]) => path === filePath
        )?.[0];
        if (uriToDelete) delete cachedUriMap[uriToDelete];
      } catch (error) {
        console.warn(`Failed to delete cached file ${fileName}:`, error);
      }
    }

    // Update metadata file
    await FileSystem.writeAsStringAsync(
      metadataPath,
      JSON.stringify(updatedMetadata)
    );
  } catch (error) {
    console.error("Failed to manage cache size:", error);
  }
};

/**
 * Generate a safe filename from a URI or cache key
 */
const generateSafeFileName = (uri: string, cacheKey?: string): string => {
  const key = cacheKey || uri.split("/").pop() || "image";
  return key.replace(/[^a-z0-9]/gi, "_").toLowerCase();
};

/**
 * Hook for caching images with automatic cache management
 */
export const useImageCache = ({
  uri,
  cacheKey,
  ttl = DEFAULT_TTL,
}: UseImageCacheProps): UseImageCacheReturn => {
  const [cachedUri, setCachedUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const cacheImage = async (): Promise<void> => {
      if (!uri) {
        setCachedUri(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Check memory cache first (fastest)
        if (cachedUriMap[uri]) {
          const fileInfo = await FileSystem.getInfoAsync(cachedUriMap[uri]);
          if (fileInfo.exists) {
            if (isMounted) {
              setCachedUri(cachedUriMap[uri]);
              setIsLoading(false);
            }
            return;
          }
          // File doesn't exist, remove from memory cache
          delete cachedUriMap[uri];
        }

        // Generate safe filename
        const fileName = generateSafeFileName(uri, cacheKey);

        // Ensure cache directory exists
        await ensureCacheDirectory();

        const metadataPath = `${CACHE_FOLDER}metadata.json`;
        const cachePath = `${CACHE_FOLDER}${fileName}`;

        // Check if file exists in cache
        const fileInfo = await FileSystem.getInfoAsync(cachePath);

        if (fileInfo.exists) {
          // Check if cache is still valid
          let metadata: Record<string, CacheMetadata> = {};
          try {
            const metadataContent = await FileSystem.readAsStringAsync(
              metadataPath
            );
            metadata = JSON.parse(metadataContent);
          } catch {
            // Metadata file corrupted or missing, treat as expired
          }

          const imageMetadata = metadata[fileName];
          const now = Date.now();

          // If not expired, use cached version
          if (imageMetadata && now < imageMetadata.expires) {
            cachedUriMap[uri] = cachePath;
            if (isMounted) {
              setCachedUri(cachePath);
              setIsLoading(false);
            }
            return;
          }

          // Cache expired, clean up
          try {
            await FileSystem.deleteAsync(cachePath);
            delete metadata[fileName];
            await FileSystem.writeAsStringAsync(
              metadataPath,
              JSON.stringify(metadata)
            );
          } catch {
            // Ignore cleanup errors
          }
        }

        // Manage cache size before downloading
        await manageCacheSize();

        // Download and cache the image
        const downloadResult = await FileSystem.downloadAsync(uri, cachePath);

        if (downloadResult.status === 200) {
          // Update metadata
          const newFileInfo = await FileSystem.getInfoAsync(cachePath);
          let metadata: Record<string, CacheMetadata> = {};

          try {
            const metadataExists = await FileSystem.getInfoAsync(metadataPath);
            if (metadataExists.exists) {
              const metadataContent = await FileSystem.readAsStringAsync(
                metadataPath
              );
              metadata = JSON.parse(metadataContent);
            }
          } catch {
            // Start with empty metadata if read fails
          }

          // Add new image metadata
          metadata[fileName] = {
            uri,
            timestamp: Date.now(),
            expires: Date.now() + ttl,
            size: newFileInfo.exists ? (newFileInfo as any).size || 0 : 0,
          };

          await FileSystem.writeAsStringAsync(
            metadataPath,
            JSON.stringify(metadata)
          );

          // Update memory cache
          cachedUriMap[uri] = cachePath;

          if (isMounted) {
            setCachedUri(cachePath);
            setIsLoading(false);
          }
        } else {
          throw new Error(
            `Download failed with status ${downloadResult.status}`
          );
        }
      } catch (err) {
        console.warn("Image caching failed:", err);
        if (isMounted) {
          // Fallback to original URI on error
          setCachedUri(uri);
          setError(
            err instanceof Error ? err : new Error("Failed to cache image")
          );
          setIsLoading(false);
        }
      }
    };

    cacheImage();

    return () => {
      isMounted = false;
    };
  }, [uri, cacheKey, ttl]);

  return {
    cachedUri,
    isLoading,
    error,
  };
};

/**
 * Clear all cached images and reset the cache
 */
export const clearImageCache = async (): Promise<void> => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(CACHE_FOLDER);
    if (dirInfo.exists) {
      await FileSystem.deleteAsync(CACHE_FOLDER);
    }
    cachedUriMap = {};
    await ensureCacheDirectory();
  } catch (error) {
    console.error("Failed to clear image cache:", error);
    throw error;
  }
};

// Initialize cache map on module load
initializeCacheMap();
