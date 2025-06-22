# sonny-ui

[![npm version](https://badge.fury.io/js/sonny-ui.svg)](https://badge.fury.io/js/sonny-ui)
[![npm package](https://img.shields.io/npm/v/sonny-ui.svg)](https://www.npmjs.com/package/sonny-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern collection of reusable React Native components and utilities optimized for Expo SDK 50+.

## Features

- 🎨 **Modern UI Components** - Beautiful, customizable components with smooth animations
- 🏗️ **New Architecture Ready** - Full compatibility with React Native's New Architecture
- 📱 **Cross-Platform** - Works seamlessly on iOS, Android, and Web
- 🔧 **TypeScript First** - Complete type safety and IntelliSense support
- ⚡ **Performance Optimized** - Efficient caching, lazy loading, and memory management
- 🛠️ **Developer Experience** - Easy setup with automated backend configuration

## Requirements

- **Expo SDK 50+** (recommended: SDK 52+ for New Architecture support)
- **React Native 0.73+**
- **React 18+**
- **TypeScript** (optional but recommended)

## Installation

Choose your preferred package manager:

```bash
# npm
npm install sonny-ui

# yarn
yarn add sonny-ui

# pnpm
pnpm add sonny-ui

# bun
bun add sonny-ui

# expo
npx expo install sonny-ui
```

### Backend Setup (Optional)

**Important**: Backend setup is done using the CLI tool after installation, not during `npm install`.

## Installation

First install the library:

```bash
npm install sonny-ui
```

**Note**: sonny-ui requires `react-native-safe-area-context` as a peer dependency. If you're using Expo SDK 50+, this is usually already included. If not, install it separately:

```bash
npm install react-native-safe-area-context
```

Then configure your backend(s) using the CLI:

```bash
# Firebase setup
npx sonny-ui setup --firebase

# Supabase setup
npx sonny-ui setup --supabase

# Both backends
npx sonny-ui setup -f -s
```

This will:

- Install the necessary backend dependencies
- Create configuration files in your `config/` directory
- Generate `.env.example` files with the required environment variables

> **Note**: The backend configurations are optional and separate from the UI components. You can use sonny-ui components without any backend setup.

## Quick Start

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  MainContainer,
  SonnyButton,
  SonnyInput,
  SonnyModal,
  showToast,
  SonnyToastProvider,
} from "sonny-ui";

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleShowToast = () => {
    showToast({
      type: "success",
      title: "Welcome!",
      message: "sonny-ui is ready to use",
      duration: 3000,
    });
  };

  return (
    <SonnyToastProvider>
      <MainContainer style={styles.container}>
        <SonnyInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          leftIcon="person"
          style={styles.input}
        />

        <SonnyButton
          title="Open Modal"
          onPress={() => setModalVisible(true)}
          variant="primary"
          icon="modal"
          style={styles.button}
        />

        <SonnyModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          showCloseButton
        >
          <SonnyButton
            title="Show Toast"
            onPress={handleShowToast}
            variant="success"
            icon="checkmark-circle"
          />
        </SonnyModal>
      </MainContainer>
    </SonnyToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});
```

## What's Included

### 🎨 UI Components

- **[SonnyButton](./docs/SonnyButton.md)** - Customizable button with 7 variants, loading states, and icon support
- **[SonnyInput](./docs/SonnyInput.md)** - Advanced text input with validation, icons, and error states
- **[SonnyBackButton](./docs/SonnyBackButton.md)** - Navigation back button with multiple styles and positioning
- **[SonnySwitch](./docs/SonnySwitch.md)** - Toggle switch with 6 variants and smooth animations
- **[SonnyModal](./docs/SonnyModal.md)** - Customizable modal with gradient background and animations
- **[SonnySheetModal](./docs/SonnySheetModal.md)** - Bottom sheet modal with drag gestures
- **[SonnyToast](./docs/SonnyToast.md)** - Toast notifications with multiple types and positioning
- **[SonnyCountriesSearch](./docs/SonnyCountriesSearch.md)** - Searchable country dropdown with flags
- **[SonnyCountryCodePicker](./docs/SonnyCountryCodePicker.md)** - Modal country code picker
- **[CachedImage](./docs/CachedImage.md)** - High-performance image caching component
- **[Text](./docs/Text.md)** - Enhanced text component with utility features

### 🏗️ Layout Components

- **[MainContainer](./docs/MainContainer.md)** - Safe area container with scroll management

### 🛠️ Utilities & Hooks

- **[String Utils](./docs/StringUtils.md)** - Comprehensive text formatting and validation functions
- **[Image Cache Hook](./docs/CachedImage.md#cache-management)** - Efficient image caching system
- **[Toast Provider](./docs/SonnyToast.md#setup)** - Global toast notification management

### ⚙️ Backend Integration

- **Firebase Setup** - Automated Firebase configuration with auth, firestore, and storage
- **Supabase Setup** - Automated Supabase configuration with auth and database

## Documentation

- 📖 **[Complete Documentation](./docs/)** - Detailed guides for each component
- 🎯 **[API Reference](./docs/)** - Full API documentation with examples
- 🚀 **[Setup Guide](./docs/Setup.md)** - Installation and configuration
- 💡 **[Examples](./examples/)** - Interactive examples for all components
- 🔮 **[Roadmap](./docs/ROADMAP.md)** - Future components and features

## Compatibility

| Expo SDK | React Native | Support Status     |
| -------- | ------------ | ------------------ |
| 53       | 0.79         | ✅ Fully Supported |
| 52       | 0.76         | ✅ Fully Supported |
| 51       | 0.74         | ✅ Fully Supported |
| 50       | 0.73         | ✅ Fully Supported |
| < 50     | < 0.73       | ❌ Not Supported   |

## Contributing

We welcome contributions! Here's how you can help:

### 🐛 **Report Issues**

- Found a bug? [Open an issue](https://github.com/sonnysam/sonny-ui/issues)
- Include steps to reproduce, expected vs actual behavior
- Add screenshots or code snippets when helpful

### 💡 **Suggest Features**

- Have an idea? [Start a discussion](https://github.com/sonnysam/sonny-ui/discussions)
- Check our [Roadmap](./docs/ROADMAP.md) first
- Explain your use case and why it would benefit others

### 🔧 **Development Setup**

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/Sonnysam/sonny-ui
   cd sonny-ui
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the project**

   ```bash
   npm run build
   ```

4. **Test your changes**
   ```bash
   npm test
   ```

### 📝 **Pull Request Guidelines**

- **Fork** the repository and create your branch from `main`
- **Follow** the existing code style and conventions
- **Add tests** for new features or bug fixes
- **Update documentation** if you change APIs
- **Write clear commit messages** following conventional commits
- **Keep PRs focused** - one feature/fix per PR

### 🎯 **What We're Looking For**

- **Bug fixes** and performance improvements
- **New components** from our [roadmap](./docs/ROADMAP.md)
- **Documentation** improvements and examples
- **Tests** to improve coverage
- **Accessibility** enhancements

### 📋 **Code Style**

- Use **TypeScript** for all new code
- Follow **React Native** best practices
- Add **JSDoc comments** for public APIs
- Use **meaningful variable names**
- Keep components **focused and reusable**

### 🏆 **Recognition**

Contributors will be:

- Added to our contributors list
- Credited in release notes
- Given collaborator access after consistent contributions

For detailed guidelines, see our [Contributing Guide](CONTRIBUTING.md).

## License

MIT © [sonnysam](https://github.com/sonnysam)

---

**Want to suggest a component or utility?** [Open an issue](https://github.com/sonnysam/sonny-ui/issues) or start a [discussion](https://github.com/sonnysam/sonny-ui/discussions)!

Made with ❤️ in Ghana 🇬🇭 by Samuel Agbenyo ([@AgbenyoOfficial](https://x.com/AgbenyoOfficial) on X)
