# SonnyModal

A customizable modal component with a clean design, gradient background, and optional close button.

## Installation

```bash
npm install sonny-ui
```

## Usage

```tsx
import { SonnyModal } from "sonny-ui";

const MyComponent = () => {
  const [visible, setVisible] = useState(false);

  return (
    <SonnyModal
      visible={visible}
      onClose={() => setVisible(false)}
      widthPercentage={90}
    >
      <Text>Your content here</Text>
    </SonnyModal>
  );
};
```

## Props

| Prop                  | Type       | Default                | Description                                      |
| --------------------- | ---------- | ---------------------- | ------------------------------------------------ |
| visible               | boolean    | required               | Controls the visibility of the modal             |
| onClose               | () => void | required               | Callback when the modal is closed                |
| children              | ReactNode  | required               | Content to render inside the modal               |
| showCloseButton       | boolean    | true                   | Whether to show the close button                 |
| gradientColors        | string[]   | ['#1a1a1a', '#121212'] | Custom background gradient colors                |
| contentContainerStyle | ViewStyle  | undefined              | Custom styles for the modal content              |
| widthPercentage       | number     | 90                     | Width of the modal as percentage of screen width |

## Example

See the [ModalExample.tsx](../examples/ModalExample.tsx) for a complete example.
