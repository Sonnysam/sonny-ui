# SonnyButton

A fully customizable button component with multiple variants, loading states, icon support, and extensive styling options. Built to provide a consistent and flexible button interface throughout your React Native application.

## Features

- **7 Button Variants**: Primary, Secondary, Outline, Ghost, Danger, Success, Warning
- **3 Size Options**: Small, Medium, Large
- **Icon Support**: Left, Right, Top, Bottom positioning with Ionicons
- **Loading States**: Built-in loading indicators with customization
- **Full Customization**: Colors, borders, shadows, spacing, and more
- **Accessibility**: Screen reader support and proper focus management
- **TypeScript**: Full type safety with comprehensive prop types

## Installation

```bash
npm install sonny-ui
# or
yarn add sonny-ui
```

## Basic Usage

```tsx
import { SonnyButton } from "sonny-ui";

export default function App() {
  const handlePress = () => {
    console.log("Button pressed!");
  };

  return (
    <SonnyButton title="Click Me" onPress={handlePress} variant="primary" />
  );
}
```

## Props

| Prop               | Type                                                                                     | Default     | Description                                             |
| ------------------ | ---------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------- |
| `title`            | `string \| React.ReactNode`                                                              | -           | Button text or content                                  |
| `onPress`          | `() => void`                                                                             | -           | **Required** - Callback when button is pressed          |
| `variant`          | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'success' \| 'warning'` | `'primary'` | Button style variant                                    |
| `size`             | `'small' \| 'medium' \| 'large'`                                                         | `'medium'`  | Button size                                             |
| `loading`          | `boolean`                                                                                | `false`     | Whether the button is in loading state                  |
| `disabled`         | `boolean`                                                                                | `false`     | Whether the button is disabled                          |
| `icon`             | `keyof typeof Ionicons.glyphMap`                                                         | -           | Icon name from Ionicons                                 |
| `iconPosition`     | `'left' \| 'right' \| 'top' \| 'bottom'`                                                 | `'left'`    | Icon position relative to text                          |
| `iconComponent`    | `React.ReactNode`                                                                        | -           | Custom icon component                                   |
| `iconSize`         | `number`                                                                                 | -           | Size of the icon (auto-calculated based on button size) |
| `iconColor`        | `string`                                                                                 | -           | Color of the icon (auto-calculated based on variant)    |
| `iconOnly`         | `boolean`                                                                                | `false`     | Whether to show only icon (no text)                     |
| `loadingIndicator` | `React.ReactNode`                                                                        | -           | Custom loading indicator component                      |
| `loadingColor`     | `string`                                                                                 | -           | Color of the loading indicator                          |
| `containerStyle`   | `ViewStyle`                                                                              | -           | Custom styles for the button container                  |
| `textStyle`        | `TextStyle`                                                                              | -           | Custom styles for the button text                       |
| `backgroundColor`  | `string`                                                                                 | -           | Custom background color                                 |
| `textColor`        | `string`                                                                                 | -           | Custom text color                                       |
| `borderColor`      | `string`                                                                                 | -           | Custom border color                                     |
| `borderWidth`      | `number`                                                                                 | -           | Custom border width                                     |
| `borderRadius`     | `number`                                                                                 | -           | Custom border radius                                    |
| `padding`          | `number`                                                                                 | -           | Custom padding                                          |
| `margin`           | `number`                                                                                 | -           | Custom margin                                           |
| `fullWidth`        | `boolean`                                                                                | `false`     | Whether button should take full width                   |
| `minHeight`        | `number`                                                                                 | -           | Minimum height of the button                            |
| `shadow`           | `boolean`                                                                                | `false`     | Whether to apply shadow                                 |
| `shadowStyle`      | `ViewStyle`                                                                              | -           | Custom shadow style                                     |

## Variants

### Primary (Default)

```tsx
<SonnyButton title="Primary Button" onPress={handlePress} variant="primary" />
```

### Secondary

```tsx
<SonnyButton
  title="Secondary Button"
  onPress={handlePress}
  variant="secondary"
/>
```

### Outline

```tsx
<SonnyButton title="Outline Button" onPress={handlePress} variant="outline" />
```

### Ghost

```tsx
<SonnyButton title="Ghost Button" onPress={handlePress} variant="ghost" />
```

### Status Variants

```tsx
<SonnyButton
  title="Delete"
  onPress={handlePress}
  variant="danger"
/>

<SonnyButton
  title="Save"
  onPress={handlePress}
  variant="success"
/>

<SonnyButton
  title="Warning"
  onPress={handlePress}
  variant="warning"
/>
```

## Sizes

```tsx
<SonnyButton
  title="Small"
  onPress={handlePress}
  size="small"
/>

<SonnyButton
  title="Medium"
  onPress={handlePress}
  size="medium"
/>

<SonnyButton
  title="Large"
  onPress={handlePress}
  size="large"
/>
```

## Loading States

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleAsyncOperation = async () => {
  setIsLoading(true);
  try {
    await someAsyncOperation();
  } finally {
    setIsLoading(false);
  }
};

<SonnyButton
  title="Submit"
  onPress={handleAsyncOperation}
  loading={isLoading}
/>;
```

## Icons

### Basic Icon Usage

```tsx
<SonnyButton
  title="Save"
  onPress={handlePress}
  icon="save"
  iconPosition="left"
/>
```

### Icon Positions

```tsx
<SonnyButton
  title="Next"
  onPress={handlePress}
  icon="arrow-forward"
  iconPosition="right"
/>

<SonnyButton
  title="Upload"
  onPress={handlePress}
  icon="cloud-upload"
  iconPosition="top"
/>

<SonnyButton
  title="Download"
  onPress={handlePress}
  icon="download"
  iconPosition="bottom"
/>
```

### Icon-Only Buttons

```tsx
<SonnyButton onPress={handlePress} icon="heart" iconOnly variant="danger" />
```

### Custom Icon Component

```tsx
<SonnyButton
  title="Custom Icon"
  onPress={handlePress}
  iconComponent={<CustomIcon name="custom" size={20} />}
/>
```

## Customization

### Custom Colors

```tsx
<SonnyButton
  title="Custom Colors"
  onPress={handlePress}
  backgroundColor="#9C27B0"
  textColor="#FFFFFF"
/>
```

### Custom Styling

```tsx
<SonnyButton
  title="Custom Style"
  onPress={handlePress}
  borderRadius={20}
  borderWidth={2}
  borderColor="#FF5722"
  shadow
  containerStyle={{
    marginHorizontal: 20,
  }}
  textStyle={{
    fontWeight: "bold",
  }}
/>
```

### Full Width Buttons

```tsx
<SonnyButton title="Full Width" onPress={handlePress} fullWidth />
```

## Advanced Usage

### Complex Button with Multiple Features

```tsx
<SonnyButton
  title="Advanced Button"
  onPress={handleAdvancedAction}
  variant="primary"
  size="large"
  icon="rocket"
  iconPosition="left"
  loading={isProcessing}
  fullWidth
  shadow
  containerStyle={{
    margin: 20,
  }}
  textStyle={{
    fontSize: 18,
    fontWeight: "700",
  }}
/>
```

### Custom Loading Indicator

```tsx
<SonnyButton
  title="Custom Loading"
  onPress={handlePress}
  loading={isLoading}
  loadingIndicator={<CustomSpinner size="small" color="#ffffff" />}
/>
```

## Best Practices

1. **Consistent Variants**: Use the same variants throughout your app for consistency
2. **Proper Loading States**: Always show loading states for async operations
3. **Accessible Labels**: Use descriptive titles for screen readers
4. **Icon Consistency**: Use consistent icon styles and sizes
5. **Touch Targets**: Ensure buttons are large enough for touch (minimum 44x44 points)

## Accessibility

The SonnyButton component includes built-in accessibility features:

- Proper touch targets
- Screen reader support
- Focus management
- Disabled state handling

```tsx
<SonnyButton
  title="Accessible Button"
  onPress={handlePress}
  accessibilityLabel="Save your changes"
  accessibilityHint="Saves the form data to your account"
/>
```

## Common Use Cases

### Form Submission

```tsx
<SonnyButton
  title="Submit Form"
  onPress={handleSubmit}
  loading={isSubmitting}
  disabled={!isFormValid}
  fullWidth
  icon="checkmark"
/>
```

### Navigation

```tsx
<SonnyButton
  title="Go Back"
  onPress={goBack}
  variant="outline"
  icon="arrow-back"
  iconPosition="left"
/>
```

### Actions

```tsx
<SonnyButton
  title="Delete Item"
  onPress={handleDelete}
  variant="danger"
  icon="trash"
  size="small"
/>
```

## TypeScript Support

The component is fully typed with TypeScript:

```tsx
import { SonnyButtonProps } from "sonny-ui";

const MyButton: React.FC<{ customProp: string }> = ({ customProp }) => {
  const buttonProps: SonnyButtonProps = {
    title: customProp,
    onPress: () => console.log("Pressed"),
    variant: "primary",
  };

  return <SonnyButton {...buttonProps} />;
};
```
