# SonnySheetModal

A bottom sheet modal component with smooth animations, gradient background, and optional close button.

## Installation

```bash
npm install sonny-ui
```

## Usage

```tsx
import { SonnySheetModal } from "sonny-ui";

const MyComponent = () => {
  const [visible, setVisible] = useState(false);

  return (
    <SonnySheetModal
      visible={visible}
      onClose={() => setVisible(false)}
      height={400}
    >
      <Text>Your content here</Text>
    </SonnySheetModal>
  );
};
```

## Props

| Prop                  | Type           | Default                | Description                                                           |
| --------------------- | -------------- | ---------------------- | --------------------------------------------------------------------- |
| visible               | boolean        | required               | Controls the visibility of the modal                                  |
| onClose               | () => void     | required               | Callback when the modal is closed                                     |
| children              | ReactNode      | required               | Content to render inside the modal                                    |
| showCloseButton       | boolean        | true                   | Whether to show the close button                                      |
| gradientColors        | string[]       | ['#1a1a1a', '#121212'] | Custom background gradient colors                                     |
| contentContainerStyle | ViewStyle      | undefined              | Custom styles for the modal content                                   |
| minHeight             | number         | 300                    | Minimum height of the modal                                           |
| height                | DimensionValue | undefined              | Custom height for the modal. Can be number (pixels) or string ('50%') |

## Height Control

You can control the modal height in several ways:

1. **Default behavior** - Uses `minHeight` (300px)

```tsx
<SonnySheetModal visible={visible} onClose={onClose}>
  <Content />
</SonnySheetModal>
```

2. **Fixed height in pixels**

```tsx
<SonnySheetModal visible={visible} onClose={onClose} height={500}>
  <Content />
</SonnySheetModal>
```

3. **Percentage height**

```tsx
<SonnySheetModal visible={visible} onClose={onClose} height="60%">
  <Content />
</SonnySheetModal>
```

4. **Custom minimum height**

```tsx
<SonnySheetModal visible={visible} onClose={onClose} minHeight={400}>
  <Content />
</SonnySheetModal>
```

## Features

- Smooth slide-up animation
- Backdrop press to close
- Safe area handling
- Customizable gradient background
- Optional close button
- Flexible content area
- Dynamic height control

## Example

See the [SheetModalExample.tsx](../examples/SheetModalExample.tsx) for a complete example.
