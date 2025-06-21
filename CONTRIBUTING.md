# Contributing to sonny-ui

Thank you for your interest in contributing to sonny-ui! This guide will help you get started with contributing to our React Native component library.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git**
- **React Native development environment** (if testing on devices)

### Development Setup

1. **Fork the repository**

   - Click the "Fork" button on the [sonny-ui GitHub page](https://github.com/sonnysam/sonny-ui)

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/sonny-ui.git
   cd sonny-ui
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/sonnysam/sonny-ui.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Build the project**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
sonny-ui/
├── src/
│   ├── components/          # React Native components
│   │   └── ui/             # UI components
│   ├── layouts/            # Layout components
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions
│   ├── constants/          # Constants and theme
│   ├── data/               # Static data
│   └── types/              # TypeScript types
├── docs/                   # Documentation
├── examples/               # Usage examples
├── scripts/                # Build and setup scripts
└── bin/                    # CLI tools
```

## 🔧 Development Workflow

### Making Changes

1. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**

   - Follow our [coding standards](#coding-standards)
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**

   ```bash
   npm run build
   npm test
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new component"
   ```

### Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**

```
feat: add SonnyButton component with loading states
fix: resolve modal animation issue on Android
docs: update CachedImage documentation
style: format code with prettier
refactor: simplify string utility functions
test: add unit tests for SonnyToast
chore: update dependencies to latest versions
```

## 📝 Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- **Export interfaces** for component props
- **Add JSDoc comments** for public APIs
- **Use strict type checking**

```tsx
/**
 * A customizable button component with loading states
 */
export interface SonnyButtonProps {
  /**
   * The button text or content
   */
  children: React.ReactNode;
  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "outline";
  /**
   * Callback when button is pressed
   */
  onPress: () => void;
}
```

### React Native Best Practices

- **Use functional components** with hooks
- **Implement proper prop validation**
- **Follow React Native performance guidelines**
- **Support both iOS and Android**
- **Consider accessibility**

```tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const SonnyButton: React.FC<SonnyButtonProps> = ({
  children,
  loading = false,
  variant = "primary",
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: loading }}
      {...props}
    >
      <Text style={styles.text}>{loading ? "Loading..." : children}</Text>
    </TouchableOpacity>
  );
};
```

### File Organization

- **One component per file**
- **Export from index files**
- **Use descriptive file names**
- **Group related files together**

```
src/components/ui/
├── SonnyButton/
│   ├── SonnyButton.tsx
│   ├── SonnyButton.types.ts
│   └── index.ts
└── index.ts
```

## 🧪 Testing

### Writing Tests

- **Test component behavior**, not implementation
- **Use React Native Testing Library**
- **Cover edge cases and error scenarios**
- **Test accessibility features**

```tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SonnyButton } from "../SonnyButton";

describe("SonnyButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <SonnyButton onPress={() => {}}>Click me</SonnyButton>
    );

    expect(getByText("Click me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <SonnyButton onPress={onPress}>Click me</SonnyButton>
    );

    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📚 Documentation

### Component Documentation

Each component should have:

1. **README in docs/ folder**
2. **JSDoc comments** in code
3. **Usage examples** in examples/ folder
4. **TypeScript interfaces** exported

### Documentation Template

```markdown
# ComponentName

Brief description of the component.

## Props

| Prop     | Type      | Default   | Description          |
| -------- | --------- | --------- | -------------------- |
| children | ReactNode | -         | Component content    |
| variant  | string    | 'primary' | Button style variant |

## Usage

\`\`\`tsx
import { ComponentName } from 'sonny-ui';

export default function Example() {
return (
<ComponentName variant="primary">
Hello World
</ComponentName>
);
}
\`\`\`

## Examples

See [ComponentExample.tsx](../examples/ComponentExample.tsx) for more examples.
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (OS, React Native version, etc.)
- **Code examples** or screenshots
- **Error messages** if any

### Feature Requests

For feature requests:

- **Check existing issues** and discussions first
- **Explain the use case** and why it's needed
- **Provide examples** of how it would be used
- **Consider if it fits** the library's scope

## 🎯 Component Guidelines

### New Components

Before adding a new component:

1. **Check the roadmap** - Is it already planned?
2. **Consider reusability** - Will others find it useful?
3. **Follow naming convention** - Use "Sonny" prefix
4. **Ensure cross-platform** compatibility
5. **Add proper documentation** and examples

### Component Checklist

- [ ] TypeScript interfaces exported
- [ ] JSDoc comments added
- [ ] Cross-platform tested (iOS/Android)
- [ ] Accessibility support
- [ ] Documentation written
- [ ] Examples created
- [ ] Tests added
- [ ] Follows design system

## 🏆 Recognition

### Contributors

All contributors are recognized in:

- **README.md** contributors section
- **Release notes** for their contributions
- **Package.json** contributors field

### Becoming a Maintainer

Regular contributors may be invited to become maintainers with:

- **Commit access** to the repository
- **npm publish** permissions
- **Issue triage** responsibilities
- **PR review** privileges

## 📞 Getting Help

- **GitHub Discussions** - For questions and ideas
- **GitHub Issues** - For bugs and feature requests
- **X (Twitter)** - Follow [@AgbenyoOfficial](https://x.com/AgbenyoOfficial)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to sonny-ui! 🙏
