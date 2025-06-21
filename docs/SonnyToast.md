# SonnyToast

A modern, customizable toast notification component with smooth animations and flexible positioning.

## Installation

```bash
npm install sonny-ui
```

## Setup

First, wrap your app (or screen) with the `SonnyToastProvider`:

```tsx
import { SonnyToastProvider } from "sonny-ui";

export default function App() {
  return (
    <SonnyToastProvider>
      <YourAppContent />
    </SonnyToastProvider>
  );
}
```

## Usage

```tsx
import { showToast } from "sonny-ui";

// Basic usage
showToast({
  message: "Hello World!",
  type: "success",
});

// Advanced usage
showToast({
  title: "Success",
  message: "Operation completed successfully!",
  type: "success",
  position: "top",
  duration: 3000,
  onHide: () => console.log("Toast hidden"),
});
```

## Props (ToastConfig)

| Prop            | Type                                        | Default   | Description                               |
| --------------- | ------------------------------------------- | --------- | ----------------------------------------- |
| message         | string                                      | required  | The main message to display               |
| title           | string                                      | undefined | Optional title for the toast              |
| type            | 'success' \| 'error' \| 'warning' \| 'info' | 'info'    | Type of toast (determines color and icon) |
| duration        | number                                      | 3000      | Duration in milliseconds                  |
| position        | 'top' \| 'bottom'                           | 'bottom'  | Position of the toast                     |
| icon            | string                                      | auto      | Custom icon name from AntDesign icons     |
| backgroundColor | string                                      | auto      | Custom background color                   |
| textColor       | string                                      | white     | Custom text color                         |
| onHide          | () => void                                  | undefined | Callback when toast is hidden             |

## Toast Types

Each type has a default color and icon:

- **success**: Green background with check-circle icon
- **error**: Red background with close-circle icon
- **warning**: Orange background with warning icon
- **info**: Blue background with info-circle icon

## Examples

### Basic Toast Types

```tsx
// Success toast
showToast({
  message: "Data saved successfully!",
  type: "success",
});

// Error toast
showToast({
  message: "Something went wrong",
  type: "error",
});

// Warning toast
showToast({
  message: "Please check your connection",
  type: "warning",
});

// Info toast
showToast({
  message: "New update available",
  type: "info",
});
```

### Custom Styling

```tsx
showToast({
  title: "Custom Toast",
  message: "This is a custom styled toast!",
  backgroundColor: "#8B5CF6",
  textColor: "#FFFFFF",
  icon: "star",
  position: "top",
  duration: 4000,
});
```

### Position Control

```tsx
// Top toast
showToast({
  message: "Top notification",
  position: "top",
});

// Bottom toast
showToast({
  message: "Bottom notification",
  position: "bottom",
});
```

## Features

- Smooth fade and slide animations
- Top and bottom positioning
- Platform-specific safe area handling
- Automatic type-based styling
- Custom colors and icons
- Configurable duration
- TypeScript support
- No root setup required (just wrap with provider)

## Example

See the [ToastExample.tsx](../examples/ToastExample.tsx) for a complete example.
