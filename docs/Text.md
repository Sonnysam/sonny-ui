# Text Component

The `Text` component is an enhanced version of React Native's Text component with built-in support for Google Fonts (Poppins & Inter) and convenient styling props.

## Features

- 🎨 **Google Fonts Support** - Beautiful fonts with multiple weights (Poppins & Inter)
- 🔧 **Easy Styling** - Simple props for common text styling
- 📱 **System Font Fallback** - Option to use system default fonts
- 🎯 **TypeScript Support** - Fully typed for better development experience
- ⚡ **Performance Optimized** - Efficient font loading and rendering

## Installation

The Text component requires Google Fonts to be installed in your project. Following the [Expo Google Fonts guide](https://github.com/expo/google-fonts):

```bash
npx expo install @expo-google-fonts/poppins @expo-google-fonts/inter expo-font expo-splash-screen
```

## Setup

You need to load the fonts in your app's root component (usually `app/_layout.tsx` or `App.tsx`), following the [Expo Google Fonts documentation](https://docs.expo.dev/develop/user-interface/fonts/#use-google-fonts):

```tsx
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Poppins fonts - Modern, friendly, geometric
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    // Inter fonts - Clean, professional, highly readable
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    // Your app content here
  );
}
```

## Basic Usage

```tsx
import { Text } from 'sonny-ui';

// Simple text with default Poppins Regular
<Text>Hello World</Text>

// Different font families
<Text fontFamily="poppins" fontWeight="700">Bold Poppins text</Text>
<Text fontFamily="inter" fontWeight="600">SemiBold Inter text</Text>

// Different sizes and colors
<Text fontSize={20} color="#007AFF">Large blue text</Text>
<Text fontSize={12} color="#6B7280">Small gray text</Text>

// Use system font instead of Google Fonts
<Text fontFamily="system">System default font</Text>
```

## Props

| Prop         | Type                                                          | Default        | Description                 |
| ------------ | ------------------------------------------------------------- | -------------- | --------------------------- |
| `children`   | `React.ReactNode`                                             | -              | The text content to display |
| `fontFamily` | `'system' \| 'poppins' \| 'inter'`                            | `'poppins'`    | Font family to use          |
| `fontWeight` | `'300' \| '400' \| '500' \| '600' \| '700' \| '800' \| '900'` | `'400'`        | Font weight                 |
| `fontSize`   | `number`                                                      | `16`           | Font size in pixels         |
| `color`      | `string`                                                      | `Colors.black` | Text color                  |
| `style`      | `TextStyle`                                                   | -              | Additional style overrides  |
| `...props`   | `TextProps`                                                   | -              | All React Native Text props |

## Font Families

### Poppins

**Modern, friendly, and geometric** - Perfect for:

- Headlines and titles
- Branding and marketing content
- User interfaces requiring a friendly feel

### Inter

**Clean, professional, and highly readable** - Perfect for:

- Body text and paragraphs
- Professional applications
- Data-heavy interfaces

## Font Weight Guide

| Weight | Name      | Usage                    |
| ------ | --------- | ------------------------ |
| `300`  | Light     | Subtle text, captions    |
| `400`  | Regular   | Body text, default       |
| `500`  | Medium    | Emphasized body text     |
| `600`  | SemiBold  | Subheadings              |
| `700`  | Bold      | Headings, important text |
| `800`  | ExtraBold | Strong emphasis          |
| `900`  | Black     | Hero text, display       |

## Examples

### Font Family Comparison

```tsx
// Poppins - Modern and friendly
<Text fontFamily="poppins" fontWeight="600" fontSize={20}>
  Modern & Friendly Design
</Text>

// Inter - Clean and professional
<Text fontFamily="inter" fontWeight="600" fontSize={20}>
  Clean & Professional Text
</Text>

// System font - Platform default
<Text fontFamily="system" fontSize={20}>
  System Default Font
</Text>
```

### Typography Scale

```tsx
// Display text
<Text fontFamily="inter" fontSize={32} fontWeight="800">Hero Title</Text>

// Headings
<Text fontFamily="poppins" fontSize={24} fontWeight="700">Main Heading</Text>
<Text fontFamily="inter" fontSize={20} fontWeight="600">Sub Heading</Text>

// Body text
<Text fontFamily="inter" fontSize={16} fontWeight="400">Regular body text</Text>
<Text fontSize={14} fontWeight="400">Secondary text</Text>

// Small text
<Text fontSize={12} fontWeight="400">Caption or fine print</Text>
```

### Color Variations

```tsx
// Semantic colors
<Text color="#000000">Black text</Text>
<Text color="#6B7280">Gray text</Text>
<Text color="#007AFF">Blue text</Text>
<Text color="#10B981">Green text</Text>
<Text color="#EF4444">Red text</Text>
```

### Custom Styling

```tsx
// Combine props with custom styles
<Text
  fontFamily="inter"
  fontWeight="600"
  fontSize={18}
  color="#007AFF"
  style={{
    textAlign: "center",
    textDecorationLine: "underline",
    marginVertical: 10,
  }}
>
  Custom styled text
</Text>
```

## Best Practices

### Font Selection Guidelines

1. **Use Inter for body text** - excellent readability
2. **Use Poppins for headings** - friendly and attention-grabbing
3. **Use system font sparingly** - for performance-critical scenarios
4. **Maintain consistency** - stick to 2-3 font weights maximum

### Typography Hierarchy

```tsx
// Recommended hierarchy
<Text fontFamily="poppins" fontSize={32} fontWeight="800">Display</Text>
<Text fontFamily="poppins" fontSize={24} fontWeight="700">H1 Heading</Text>
<Text fontFamily="poppins" fontSize={20} fontWeight="600">H2 Heading</Text>
<Text fontFamily="inter" fontSize={18} fontWeight="500">H3 Heading</Text>
<Text fontFamily="inter" fontSize={16} fontWeight="400">Body Text</Text>
<Text fontFamily="inter" fontSize={14} fontWeight="400">Secondary</Text>
<Text fontFamily="inter" fontSize={12} fontWeight="400">Caption</Text>
```

### Accessibility

```tsx
// Good: Sufficient contrast and readable size
<Text fontSize={16} color="#000000">Readable text</Text>

// Use semantic props when needed
<Text
  fontSize={16}
  accessibilityRole="header"
  accessibilityLevel={1}
>
  Main Heading
</Text>
```

## Advanced Usage

### Component Composition

```tsx
// Create semantic text components
const Heading = ({ children, level = 1, ...props }) => {
  const sizes = { 1: 24, 2: 20, 3: 18 };
  const weights = { 1: '700', 2: '600', 3: '500' };

  return (
    <Text
      fontFamily="poppins"
      fontSize={sizes[level]}
      fontWeight={weights[level]}
      {...props}
    >
      {children}
    </Text>
  );
};

const Body = ({ children, ...props }) => (
  <Text fontFamily="inter" fontSize={16} fontWeight="400" {...props}>
    {children}
  </Text>
);

// Usage
<Heading level={1}>Main Title</Heading>
<Body>This is body text with great readability.</Body>
```

### Conditional Fonts

```tsx
const useInterFont = true;

<Text fontFamily={useInterFont ? "inter" : "poppins"} fontWeight="500">
  Conditionally use different fonts
</Text>;
```

## Performance Tips

1. **Preload fonts** in your root layout following [Expo's Google Fonts documentation](https://docs.expo.dev/develop/user-interface/fonts/#use-google-fonts)
2. **Use system font** for large amounts of text if performance is critical
3. **Avoid inline styles** when possible - use StyleSheet.create()
4. **Load only needed weights** - don't import all 18 variants if you only use a few
5. **Handle splash screen properly** - Use `expo-splash-screen` to prevent rendering before fonts load

## Troubleshooting

### Fonts Not Loading

If fonts aren't appearing, follow the [Expo Google Fonts documentation](https://docs.expo.dev/develop/user-interface/fonts/#use-google-fonts):

1. **Check font installation**: Ensure both `@expo-google-fonts/poppins` and `@expo-google-fonts/inter` are installed
2. **Verify font loading**: Make sure fonts are properly loaded in your root component with `useFonts`
3. **Check error handling**: Use both `loaded` and `error` states from `useFonts` hook
4. **Splash screen**: Ensure you're handling the splash screen correctly with `expo-splash-screen`
5. **Check console**: Look for font loading errors in your development console

### TypeScript Issues

```tsx
// Use proper typing for font families and weights
const family: FontFamily = "inter"; // ✅ Good
const weight: FontWeight = "700"; // ✅ Good
const family = "inter" as const; // ✅ Also good
```

## Migration

### From React Native Text

```tsx
// Before (React Native Text)
<RNText style={{ fontSize: 16, fontWeight: 'bold', color: 'blue' }}>
  Text content
</RNText>

// After (Sonny Text)
<Text fontFamily="inter" fontSize={16} fontWeight="700" color="blue">
  Text content
</Text>
```

### Adding to Existing App

1. Install the required packages: `@expo-google-fonts/poppins`, `@expo-google-fonts/inter`, `expo-font`, `expo-splash-screen`
2. Set up font loading in your root component following [Expo's Google Fonts documentation](https://docs.expo.dev/develop/user-interface/fonts/#use-google-fonts)
3. Gradually replace Text components throughout your app
4. Test on both platforms (iOS and Android)

## Related Components

- **[SonnyInput](./SonnyInput.md)** - Uses Text component for labels
- **[SonnyButton](./SonnyButton.md)** - Uses Text component for button text
- **[SonnyToast](./SonnyToast.md)** - Uses Text component for messages
