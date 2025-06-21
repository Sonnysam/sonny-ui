# MainContainer

A container component that handles safe area insets and scrolling behavior, automatically adapting to iOS and Android platforms.

## Installation

```bash
npm install sonny-ui
```

## Usage

```tsx
import { MainContainer } from "sonny-ui";

const MyScreen = () => {
  return (
    <MainContainer>
      <Text>Your content here</Text>
    </MainContainer>
  );
};
```

## Props

| Prop                  | Type      | Default   | Description                               |
| --------------------- | --------- | --------- | ----------------------------------------- |
| children              | ReactNode | required  | Content to render inside the container    |
| style                 | ViewStyle | undefined | Custom styles for the container           |
| contentContainerStyle | ViewStyle | undefined | Custom styles for the scroll view content |
| disableScroll         | boolean   | false     | Whether to disable scrolling              |
| showScrollIndicator   | boolean   | false     | Whether to show scroll indicator          |

## Features

- Safe area handling for notched devices
- Automatic scrolling behavior
- Platform-specific padding
- String content auto-wrapping in Text component
- Keyboard-aware scrolling
- Customizable styles

## Example

See the [MainContainerExample.tsx](../examples/MainContainerExample.tsx) for a complete example.

## Common Use Cases

1. Screen Wrapper

```tsx
<MainContainer>
  <YourScreenContent />
</MainContainer>
```

2. Fixed Content (No Scroll)

```tsx
<MainContainer disableScroll>
  <YourFixedContent />
</MainContainer>
```

3. Custom Styling

```tsx
<MainContainer
  style={{ backgroundColor: "white" }}
  contentContainerStyle={{ padding: 20 }}
>
  <YourContent />
</MainContainer>
```
