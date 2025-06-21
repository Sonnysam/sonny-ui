# CachedImage

A high-performance image component that automatically downloads and caches **remote images** for improved performance and offline access.

> **⚠️ Important**: CachedImage is designed for **remote URLs only** (http/https). For local images, use the regular React Native `Image` component.

## Installation

```bash
npm install sonny-ui expo-file-system
```

## Usage

### ✅ Correct Usage (Remote Images)

```tsx
import { CachedImage } from "sonny-ui";

const MyComponent = () => {
  return (
    <CachedImage
      uri="https://example.com/image.jpg" // Remote URL
      style={{ width: 200, height: 200 }}
      showLoadingIndicator
      fallbackSource={require("./placeholder.png")}
    />
  );
};
```

### ❌ Incorrect Usage (Local Images)

```tsx
// Don't do this - won't work!
<CachedImage uri={require("./local-image.png")} />
```

### ✅ For Local Images, Use Regular Image Component

```tsx
import { Image } from "react-native";

<Image
  source={require("./local-image.png")}
  style={{ width: 200, height: 200 }}
/>;
```

## Props

| Prop                 | Type               | Default        | Description                                     |
| -------------------- | ------------------ | -------------- | ----------------------------------------------- |
| uri                  | string             | required       | The image URI to cache and display              |
| cacheKey             | string             | auto-generated | Optional custom cache key for the image         |
| ttl                  | number             | 7 days         | Time to live for cached image in milliseconds   |
| showLoadingIndicator | boolean            | false          | Whether to show loading indicator while caching |
| fallbackSource       | ImageSource        | undefined      | Fallback image when main image fails            |
| containerStyle       | ViewStyle          | undefined      | Custom styles for the container wrapper         |
| loadingColor         | string             | Colors.info    | Color for the loading indicator                 |
| loadingSize          | 'small' \| 'large' | 'small'        | Size of the loading indicator                   |
| ...ImageProps        | -                  | -              | All other React Native Image props              |

## When to Use CachedImage vs Image

| Scenario                  | Component     | Reason                                      |
| ------------------------- | ------------- | ------------------------------------------- |
| Remote URLs (https://...) | `CachedImage` | Downloads and caches for better performance |
| Local assets (require)    | `Image`       | Already bundled, no caching needed          |
| Profile pictures from API | `CachedImage` | Benefits from caching for offline access    |
| App icons/logos           | `Image`       | Static assets, always available             |
| User-generated content    | `CachedImage` | Remote content that benefits from caching   |

## Features

- **Automatic Caching**: Downloads and stores images locally for faster loading
- **Cache Management**: Automatically manages cache size (50MB limit)
- **TTL Support**: Configurable time-to-live for cached images
- **Fallback Images**: Graceful fallback when images fail to load
- **Loading States**: Optional loading indicators with customization
- **Memory Optimization**: In-memory cache map for instant lookups
- **Offline Support**: Cached images work without internet connection
- **Remote URLs Only**: Designed specifically for http/https URLs

## Cache Management

### Cache Configuration

- **Cache Size**: 50MB maximum
- **Default TTL**: 7 days
- **Storage Location**: Expo FileSystem cache directory
- **Auto Cleanup**: Removes oldest files when cache limit exceeded

### Manual Cache Control

```tsx
import { clearImageCache } from "sonny-ui";

// Clear all cached images
const handleClearCache = async () => {
  try {
    await clearImageCache();
    console.log("Cache cleared successfully");
  } catch (error) {
    console.error("Failed to clear cache:", error);
  }
};
```

## Examples

### Basic Usage

```tsx
<CachedImage
  uri="https://picsum.photos/200/200"
  style={{ width: 200, height: 200, borderRadius: 8 }}
/>
```

### With Loading Indicator

```tsx
<CachedImage
  uri="https://example.com/image.jpg"
  style={{ width: 150, height: 150 }}
  showLoadingIndicator
  loadingColor="#007BFF"
  loadingSize="large"
/>
```

### With Fallback Image

```tsx
<CachedImage
  uri="https://example.com/image.jpg"
  style={{ width: 100, height: 100 }}
  fallbackSource={require("./assets/placeholder.png")}
  showLoadingIndicator
/>
```

### Custom Cache Settings

```tsx
<CachedImage
  uri="https://example.com/profile.jpg"
  cacheKey="user_profile_123"
  ttl={24 * 60 * 60 * 1000} // 24 hours
  style={{ width: 80, height: 80, borderRadius: 40 }}
/>
```

### Rounded Image with Container Styling

```tsx
<CachedImage
  uri="https://example.com/avatar.jpg"
  style={{ width: 100, height: 100, borderRadius: 50 }}
  containerStyle={{
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#007BFF",
  }}
  showLoadingIndicator
/>
```

## Performance Tips

1. **Use Cache Keys**: Provide meaningful cache keys for better organization
2. **Set Appropriate TTL**: Use shorter TTL for frequently changing images
3. **Optimize Image Sizes**: Use appropriately sized images for your use case
4. **Fallback Images**: Always provide fallback images for better UX
5. **Clear Cache**: Implement cache clearing for user privacy/storage management

## Error Handling

The component handles various error scenarios:

- Invalid URIs gracefully fall back to placeholder
- Network errors show fallback images
- Cache corruption is automatically handled
- File system errors are logged and handled

## Example

See the [CachedImageExample.tsx](../examples/CachedImageExample.tsx) for a complete example with various use cases.
