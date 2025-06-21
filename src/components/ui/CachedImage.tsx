import React, { useState } from 'react';
import { Image, ImageProps, ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';
import { useImageCache } from '../../hooks/useImageCache';
import { Colors } from '../../constants/colors';

export interface CachedImageProps extends Omit<ImageProps, 'source'> {
    /** The image URI to cache and display */
    uri: string;
    /** Optional custom cache key for the image */
    cacheKey?: string;
    /** Time to live for the cached image in milliseconds */
    ttl?: number;
    /** Whether to show a loading indicator while caching */
    showLoadingIndicator?: boolean;
    /** Fallback image source when the main image fails to load */
    fallbackSource?: ImageProps['source'];
    /** Custom styles for the container wrapper */
    containerStyle?: ViewStyle;
    /** Color for the loading indicator */
    loadingColor?: string;
    /** Size of the loading indicator */
    loadingSize?: 'small' | 'large';
}

/**
 * A cached image component that automatically downloads and caches images
 * for improved performance and offline access.
 * 
 * @example
 * ```tsx
 * <CachedImage
 *   uri="https://example.com/image.jpg"
 *   style={{ width: 100, height: 100 }}
 *   showLoadingIndicator
 *   fallbackSource={require('./fallback.png')}
 * />
 * ```
 */
export const CachedImage: React.FC<CachedImageProps> = ({
    uri,
    cacheKey,
    ttl,
    style,
    showLoadingIndicator = false,
    fallbackSource,
    containerStyle,
    loadingColor = Colors.info,
    loadingSize = 'small',
    onError,
    ...imageProps
}) => {
    const [showFallback, setShowFallback] = useState(false);

    // Validate URI
    const isValidUri = typeof uri === 'string' && uri.trim().length > 0;

    // Generate stable cache key if none provided
    const stableCacheKey = cacheKey || (isValidUri ? uri.split('/').pop() || uri : '');

    // Use the image cache hook
    const { cachedUri, isLoading, error } = useImageCache({
        uri: isValidUri ? uri : '',
        cacheKey: stableCacheKey,
        ttl,
    });

    const handleImageError = (errorEvent: any) => {
        setShowFallback(true);
        onError?.(errorEvent);
    };

    // If no valid URI and no fallback, render nothing
    if (!isValidUri && !fallbackSource) {
        return null;
    }

    // Determine which image source to use
    const shouldShowFallback = !isValidUri || error || showFallback;
    const imageSource = shouldShowFallback && fallbackSource
        ? fallbackSource
        : { uri: cachedUri || uri };

    return (
        <View style={[styles.container, containerStyle]}>
            {/* Loading indicator */}
            {isLoading && showLoadingIndicator && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        size={loadingSize}
                        color={loadingColor}
                    />
                </View>
            )}

            {/* Main image */}
            {(isValidUri || fallbackSource) && (
                <Image
                    source={imageSource}
                    style={[styles.image, style]}
                    onError={handleImageError}
                    {...imageProps}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
});

export default CachedImage; 