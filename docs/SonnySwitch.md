# SonnySwitch

A fully customizable switch component with multiple variants, smooth animations, icon support, labels, and extensive styling options. Built specifically for React Native/Expo apps with smooth native animations and platform-optimized performance.

## Features

- **6 Switch Variants**: Default, iOS, Material, Rounded, Square, Outline
- **3 Size Options**: Small, Medium, Large with custom sizing support
- **Smooth Animations**: 60fps native animations with customizable duration
- **Icon Support**: On/Off state icons with 1000+ Ionicons
- **Label Support**: Left, Right, Top, Bottom label positioning
- **Full Customization**: Colors, sizes, borders, shadows, spacing
- **Platform Optimized**: Uses native driver for smooth performance
- **Accessibility**: Screen reader support and proper touch targets
- **TypeScript**: Full type safety with comprehensive prop types

## Installation

```bash
npm install sonny-ui
# or
yarn add sonny-ui
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { SonnySwitch } from "sonny-ui";

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);

  return <SonnySwitch value={isEnabled} onValueChange={setIsEnabled} />;
}
```

## Props

| Prop                | Type                                                                     | Default     | Description                                    |
| ------------------- | ------------------------------------------------------------------------ | ----------- | ---------------------------------------------- |
| `value`             | `boolean`                                                                | -           | **Required** - Current switch state            |
| `onValueChange`     | `(value: boolean) => void`                                               | -           | **Required** - Callback when switch is toggled |
| `disabled`          | `boolean`                                                                | `false`     | Whether the switch is disabled                 |
| `size`              | `'small' \| 'medium' \| 'large'`                                         | `'medium'`  | Switch size                                    |
| `variant`           | `'default' \| 'ios' \| 'material' \| 'rounded' \| 'square' \| 'outline'` | `'default'` | Switch style variant                           |
| `trackColorOn`      | `string`                                                                 | -           | Track color when switch is on                  |
| `trackColorOff`     | `string`                                                                 | -           | Track color when switch is off                 |
| `thumbColorOn`      | `string`                                                                 | -           | Thumb color when switch is on                  |
| `thumbColorOff`     | `string`                                                                 | -           | Thumb color when switch is off                 |
| `iconOn`            | `keyof typeof Ionicons.glyphMap`                                         | -           | Icon to show when switch is on                 |
| `iconOff`           | `keyof typeof Ionicons.glyphMap`                                         | -           | Icon to show when switch is off                |
| `iconColorOn`       | `string`                                                                 | -           | Color of the icon when on                      |
| `iconColorOff`      | `string`                                                                 | -           | Color of the icon when off                     |
| `iconSize`          | `number`                                                                 | -           | Size of the icons                              |
| `label`             | `string`                                                                 | -           | Label text for the switch                      |
| `labelPosition`     | `'left' \| 'right' \| 'top' \| 'bottom'`                                 | `'right'`   | Position of the label                          |
| `labelStyle`        | `ViewStyle`                                                              | -           | Custom styles for the label                    |
| `containerStyle`    | `ViewStyle`                                                              | -           | Custom styles for the switch container         |
| `trackStyle`        | `ViewStyle`                                                              | -           | Custom styles for the track                    |
| `thumbStyle`        | `ViewStyle`                                                              | -           | Custom styles for the thumb                    |
| `animationDuration` | `number`                                                                 | `200`       | Animation duration in milliseconds             |
| `borderWidth`       | `number`                                                                 | -           | Custom border width                            |
| `borderColorOn`     | `string`                                                                 | -           | Border color when on                           |
| `borderColorOff`    | `string`                                                                 | -           | Border color when off                          |
| `shadow`            | `boolean`                                                                | `false`     | Whether to show shadow                         |
| `shadowStyle`       | `ViewStyle`                                                              | -           | Custom shadow style                            |
| `trackWidth`        | `number`                                                                 | -           | Custom track width                             |
| `trackHeight`       | `number`                                                                 | -           | Custom track height                            |
| `thumbSize`         | `number`                                                                 | -           | Custom thumb size                              |
| `thumbPadding`      | `number`                                                                 | -           | Padding around the thumb                       |

## Variants

### Default

Standard switch with blue track when on.

```tsx
<SonnySwitch value={isEnabled} onValueChange={setIsEnabled} variant="default" />
```

### iOS Style

Mimics iOS switch appearance.

```tsx
<SonnySwitch value={isEnabled} onValueChange={setIsEnabled} variant="ios" />
```

### Material Design

Material Design switch with colored thumb.

```tsx
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  variant="material"
/>
```

### Rounded

Switch with moderately rounded corners.

```tsx
<SonnySwitch value={isEnabled} onValueChange={setIsEnabled} variant="rounded" />
```

### Square

Switch with minimal border radius.

```tsx
<SonnySwitch value={isEnabled} onValueChange={setIsEnabled} variant="square" />
```

### Outline

Transparent track with colored thumb and border.

```tsx
<SonnySwitch value={isEnabled} onValueChange={setIsEnabled} variant="outline" />
```

## Sizes

```tsx
{
  /* Small - 40x24px track */
}
<SonnySwitch value={isEnabled} onValueChange={setIsEnabled} size="small" />;

{
  /* Medium - 52x30px track (default) */
}
<SonnySwitch value={isEnabled} onValueChange={setIsEnabled} size="medium" />;

{
  /* Large - 64x36px track */
}
<SonnySwitch value={isEnabled} onValueChange={setIsEnabled} size="large" />;
```

## Icons

### Basic Icons

```tsx
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  iconOn="checkmark"
  iconOff="close"
  variant="ios"
  size="large"
/>
```

### Theme Toggle

```tsx
const [isDarkMode, setIsDarkMode] = useState(false);

<SonnySwitch
  value={isDarkMode}
  onValueChange={setIsDarkMode}
  iconOn="moon"
  iconOff="sunny"
  iconColorOn="#FFF"
  iconColorOff="#FFD700"
  trackColorOn="#1a1a1a"
  trackColorOff="#87CEEB"
  thumbColorOn="#333"
  thumbColorOff="#FFF"
/>;
```

### Volume Control

```tsx
<SonnySwitch
  value={isMuted}
  onValueChange={setIsMuted}
  iconOn="volume-high"
  iconOff="volume-mute"
  variant="material"
/>
```

## Labels

### Label Positions

```tsx
{
  /* Left label */
}
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Enable Notifications"
  labelPosition="left"
/>;

{
  /* Right label (default) */
}
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Auto-Save"
  labelPosition="right"
/>;

{
  /* Top label */
}
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Background Sync"
  labelPosition="top"
/>;

{
  /* Bottom label */
}
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Dark Mode"
  labelPosition="bottom"
/>;
```

### Custom Label Styling

```tsx
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Premium Feature"
  labelStyle={{
    fontSize: 18,
    fontWeight: "bold",
    color: "#9C27B0",
  }}
/>
```

## Customization

### Custom Colors

```tsx
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  trackColorOn="#9C27B0"
  trackColorOff="#E1BEE7"
  thumbColorOn="#FFFFFF"
  thumbColorOff="#9C27B0"
  borderColorOn="#9C27B0"
  borderColorOff="#E1BEE7"
/>
```

### Custom Sizes

```tsx
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  trackWidth={70}
  trackHeight={40}
  thumbSize={32}
  thumbPadding={4}
/>
```

### With Shadow

```tsx
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  variant="ios"
  shadow
  size="large"
/>
```

### Custom Animation

```tsx
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  animationDuration={300}
/>
```

## Advanced Usage

### Settings Panel

```tsx
export default function SettingsPanel() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <View style={styles.container}>
      <SonnySwitch
        value={notifications}
        onValueChange={setNotifications}
        label="Push Notifications"
        labelPosition="left"
        variant="ios"
        containerStyle={styles.setting}
      />

      <SonnySwitch
        value={darkMode}
        onValueChange={setDarkMode}
        label="Dark Mode"
        labelPosition="left"
        iconOn="moon"
        iconOff="sunny"
        containerStyle={styles.setting}
      />

      <SonnySwitch
        value={autoSave}
        onValueChange={setAutoSave}
        label="Auto-Save Documents"
        labelPosition="left"
        variant="material"
        containerStyle={styles.setting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  setting: {
    marginBottom: 20,
    paddingVertical: 10,
  },
});
```

### Feature Toggles

```tsx
const FeatureToggles = () => {
  const [features, setFeatures] = useState({
    analytics: false,
    pushNotifications: true,
    location: false,
    camera: true,
  });

  const toggleFeature = (feature: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <View>
      <SonnySwitch
        value={features.analytics}
        onValueChange={() => toggleFeature("analytics")}
        label="Analytics"
        iconOn="analytics"
        iconOff="analytics-outline"
        variant="material"
      />

      <SonnySwitch
        value={features.pushNotifications}
        onValueChange={() => toggleFeature("pushNotifications")}
        label="Push Notifications"
        iconOn="notifications"
        iconOff="notifications-off"
        variant="ios"
      />
    </View>
  );
};
```

### Animated Theme Switcher

```tsx
const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <SonnySwitch
      value={isDark}
      onValueChange={setIsDark}
      iconOn="moon"
      iconOff="sunny"
      iconColorOn="#FFF"
      iconColorOff="#FFD700"
      trackColorOn="#1a1a1a"
      trackColorOff="#87CEEB"
      thumbColorOn="#333"
      thumbColorOff="#FFF"
      animationDuration={300}
      size="large"
      shadow
    />
  );
};
```

## Performance Optimization

The SonnySwitch uses the native animation driver for optimal performance:

```tsx
// Animation uses native driver
Animated.timing(animatedValue, {
  toValue: value ? 1 : 0,
  duration: animationDuration,
  easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  useNativeDriver: false, // Required for layout animations
}).start();
```

## Accessibility

The component includes built-in accessibility features:

```tsx
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Enable Feature"
  accessibilityLabel="Enable special feature"
  accessibilityHint="Toggles the special feature on or off"
/>
```

## Best Practices

1. **Consistent Variants**: Use the same variants throughout your app
2. **Meaningful Labels**: Provide clear labels for switch purpose
3. **Appropriate Icons**: Use intuitive icons that represent on/off states
4. **Performance**: Use reasonable animation durations (100-300ms)
5. **Accessibility**: Always provide accessibility labels
6. **Visual Feedback**: Ensure sufficient color contrast for all states

## Common Use Cases

### Settings Screen

```tsx
<SonnySwitch
  value={notificationsEnabled}
  onValueChange={setNotificationsEnabled}
  label="Push Notifications"
  labelPosition="left"
  variant="ios"
/>
```

### Feature Toggle

```tsx
<SonnySwitch
  value={isPremiumEnabled}
  onValueChange={setIsPremiumEnabled}
  label="Premium Features"
  iconOn="star"
  iconOff="star-outline"
  trackColorOn="#FFD700"
  thumbColorOn="#FFF"
/>
```

### Theme Toggle

```tsx
<SonnySwitch
  value={isDarkMode}
  onValueChange={setIsDarkMode}
  iconOn="moon"
  iconOff="sunny"
  variant="material"
/>
```

### Audio Control

```tsx
<SonnySwitch
  value={isMuted}
  onValueChange={setIsMuted}
  iconOn="volume-high"
  iconOff="volume-mute"
  size="small"
/>
```

## TypeScript Support

The component is fully typed with TypeScript:

```tsx
import { SonnySwitchProps } from "sonny-ui";

const MySwitch: React.FC<{ initialValue: boolean }> = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const switchProps: SonnySwitchProps = {
    value,
    onValueChange: setValue,
    variant: "ios",
    size: "large",
  };

  return <SonnySwitch {...switchProps} />;
};
```

## Migration from React Native Switch

If you're migrating from React Native's built-in Switch:

```tsx
// React Native Switch
<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  trackColor={{ false: '#767577', true: '#81b0ff' }}
  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
/>

// SonnySwitch equivalent
<SonnySwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  trackColorOff="#767577"
  trackColorOn="#81b0ff"
  thumbColorOn="#f5dd4b"
  thumbColorOff="#f4f3f4"
  variant="ios"
/>
```

The SonnySwitch provides much more customization options while maintaining compatibility with the standard Switch API.
