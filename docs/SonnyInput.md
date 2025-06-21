# SonnyInput

A fully customizable text input component with icon support, validation states, and password toggle functionality.

## Features

- 🎨 **Icon Support** - Left and right icons with customizable colors
- 🔒 **Password Toggle** - Built-in show/hide password functionality
- ✅ **Validation States** - Error states with custom styling
- 📝 **Helper Text** - Support for helper text and error messages
- 🎛️ **Highly Customizable** - Extensive styling options
- ♿ **Accessible** - Built with accessibility in mind
- 📱 **Cross-Platform** - Works on iOS, Android, and Web

## Basic Usage

```tsx
import React, { useState } from "react";
import { SonnyInput } from "sonny-ui";

export default function BasicExample() {
  const [email, setEmail] = useState("");

  return (
    <SonnyInput
      label="Email"
      placeholder="Enter your email"
      value={email}
      onChangeText={setEmail}
      leftIcon="mail"
      keyboardType="email-address"
    />
  );
}
```

## Props

### Required Props

| Prop           | Type                     | Description                |
| -------------- | ------------------------ | -------------------------- |
| `value`        | `string`                 | Current value of the input |
| `onChangeText` | `(text: string) => void` | Callback when text changes |

### Optional Props

| Prop               | Type                      | Default | Description                                     |
| ------------------ | ------------------------- | ------- | ----------------------------------------------- |
| `label`            | `string`                  | -       | Label text displayed above the input            |
| `placeholder`      | `string`                  | -       | Placeholder text for the input                  |
| `isPassword`       | `boolean`                 | `false` | Whether this is a password input                |
| `required`         | `string`                  | -       | Required field indicator text                   |
| `error`            | `string`                  | -       | Error message to display                        |
| `helperText`       | `string`                  | -       | Helper text displayed below the input           |
| `disabled`         | `boolean`                 | `false` | Whether the input is disabled                   |
| `leftIcon`         | `keyof Ionicons.glyphMap` | -       | Icon name from Ionicons to display on the left  |
| `rightIcon`        | `keyof Ionicons.glyphMap` | -       | Icon name from Ionicons to display on the right |
| `onRightIconPress` | `() => void`              | -       | Callback when right icon is pressed             |
| `leftIconColor`    | `string`                  | -       | Custom color for the left icon                  |
| `rightIconColor`   | `string`                  | -       | Custom color for the right icon                 |
| `iconSize`         | `number`                  | `20`    | Size for the icons                              |
| `borderRadius`     | `number`                  | `8`     | Border radius for the input container           |
| `height`           | `number`                  | `50`    | Height of the input container                   |

### Styling Props

| Prop                  | Type        | Description                               |
| --------------------- | ----------- | ----------------------------------------- |
| `containerStyle`      | `ViewStyle` | Custom styles for the container           |
| `labelStyle`          | `TextStyle` | Custom styles for the label               |
| `inputStyle`          | `TextStyle` | Custom styles for the input field         |
| `inputContainerStyle` | `ViewStyle` | Custom styles for the input container     |
| `errorStyle`          | `TextStyle` | Custom styles for error text              |
| `helperTextStyle`     | `TextStyle` | Custom styles for helper text             |
| `borderColor`         | `string`    | Custom border color                       |
| `focusedBorderColor`  | `string`    | Custom border color when focused          |
| `errorBorderColor`    | `string`    | Custom border color when there's an error |
| `backgroundColor`     | `string`    | Custom background color                   |

### React Native TextInput Props

SonnyInput also accepts all standard React Native TextInput props:

- `keyboardType`
- `autoCapitalize`
- `autoCorrect`
- `multiline`
- `numberOfLines`
- `secureTextEntry`
- And many more...

## Examples

### Email Input with Validation

```tsx
const [email, setEmail] = useState("");
const emailError =
  email && !email.includes("@") ? "Please enter a valid email" : undefined;

<SonnyInput
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  leftIcon="mail"
  keyboardType="email-address"
  autoCapitalize="none"
  required="*"
  error={emailError}
  helperText="We'll never share your email with anyone else"
/>;
```

### Password Input

```tsx
const [password, setPassword] = useState("");

<SonnyInput
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChangeText={setPassword}
  isPassword
  leftIcon="lock-closed"
  required="*"
/>;
```

### Search Input with Action

```tsx
const [search, setSearch] = useState("");

const handleSearch = () => {
  console.log("Searching for:", search);
};

<SonnyInput
  label="Search"
  placeholder="Search anything..."
  value={search}
  onChangeText={setSearch}
  leftIcon="search"
  rightIcon="arrow-forward"
  onRightIconPress={handleSearch}
  rightIconColor="#007AFF"
/>;
```

### Custom Styled Input

```tsx
<SonnyInput
  label="Username"
  placeholder="Choose a username"
  value={username}
  onChangeText={setUsername}
  leftIcon="person"
  borderRadius={12}
  height={55}
  focusedBorderColor="#007AFF"
  leftIconColor="#007AFF"
  backgroundColor="#f8f9fa"
/>
```

### Multiline Text Area

```tsx
<SonnyInput
  label="Bio"
  placeholder="Tell us about yourself..."
  value={bio}
  onChangeText={setBio}
  multiline
  numberOfLines={4}
  height={100}
  leftIcon="document-text"
  helperText="Maximum 500 characters"
/>
```

### Disabled Input

```tsx
<SonnyInput
  label="Account Type"
  placeholder="Premium"
  value="Premium"
  onChangeText={() => {}}
  leftIcon="star"
  disabled
  helperText="This field cannot be edited"
/>
```

### Input with Error State

```tsx
<SonnyInput
  label="Required Field"
  placeholder="This field has an error"
  value=""
  onChangeText={() => {}}
  leftIcon="alert-circle"
  error="This field is required"
  required="*"
  errorBorderColor="#FF3B30"
/>
```

## Icon Names

SonnyInput uses Ionicons for icons. Here are some commonly used icon names:

### Common Icons

- `mail` - Email
- `lock-closed` - Password
- `person` - User/Profile
- `call` - Phone
- `search` - Search
- `card` - Payment/Money
- `document-text` - Text/Notes
- `star` - Favorites/Premium
- `alert-circle` - Warning/Error
- `arrow-forward` - Submit/Next
- `close` - Clear/Remove
- `eye` / `eye-off` - Show/Hide (automatic for passwords)

For a complete list, visit [Ionicons](https://ionic.io/ionicons).

## Accessibility

SonnyInput includes built-in accessibility features:

- Proper labeling for screen readers
- Focus management
- Error state announcements
- Keyboard navigation support

## Styling Tips

### Focus States

```tsx
<SonnyInput
  focusedBorderColor="#007AFF"
  leftIconColor="#007AFF" // Icon color when focused
/>
```

### Error States

```tsx
<SonnyInput
  error="This field is required"
  errorBorderColor="#FF3B30"
  errorStyle={{ fontWeight: "bold" }}
/>
```

### Custom Heights

```tsx
// Single line input
<SonnyInput height={50} />

// Multiline input
<SonnyInput
  multiline
  numberOfLines={4}
  height={100}
/>
```

## Best Practices

1. **Always provide labels** for better accessibility
2. **Use appropriate keyboard types** (email, numeric, phone-pad)
3. **Provide helpful error messages** that guide users
4. **Use consistent styling** across your app
5. **Choose meaningful icons** that match the input purpose
6. **Test with screen readers** to ensure accessibility

## Related Components

- [Text](./Text.md) - For displaying text
- [SonnyModal](./SonnyModal.md) - For modal dialogs
- [SonnyToast](./SonnyToast.md) - For notifications

## Examples

See [SonnyInputExample.tsx](../examples/SonnyInputExample.tsx) for comprehensive examples.
