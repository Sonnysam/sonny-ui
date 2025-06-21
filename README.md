# sonny-ui

[![npm version](https://badge.fury.io/js/sonny-ui.svg)](https://badge.fury.io/js/sonny-ui)
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

```bash
npm install sonny-ui
```

### Backend Setup (Optional)

Automatically configure Firebase and/or Supabase:

```bash
# Firebase setup
npm install sonny-ui -f

# Supabase setup
npm install sonny-ui -s

# Both backends
npm install sonny-ui -f -s
```

Or use the CLI after installation:

```bash
# Firebase setup
npx sonny-ui setup --firebase

# Supabase setup
npx sonny-ui setup --supabase

# Both backends
npx sonny-ui setup -f -s
```

## Quick Start

```tsx
import React from "react";
import { View, Text } from "react-native";
import {
  MainContainer,
  SonnyModal,
  showToast,
  SonnyToastProvider,
} from "sonny-ui";

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);

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
      <MainContainer>
        <Text onPress={() => setModalVisible(true)}>Open Modal</Text>

        <SonnyModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          showCloseButton
        >
          <Text>Hello from sonny-ui!</Text>
          <Text onPress={handleShowToast}>Show Toast</Text>
        </SonnyModal>
      </MainContainer>
    </SonnyToastProvider>
  );
}
```

## What's Included

- **UI Components** - Modals, toasts, cached images, country pickers, and more
- **Layout Components** - Safe area containers with scroll management
- **Utilities** - String formatters, validation helpers, and data manipulation
- **Hooks** - Image caching, performance optimization utilities
- **Backend Integration** - Automated Firebase and Supabase setup

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

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [sonnysam](https://github.com/sonnysam)

---

**Want to suggest a component or utility?** [Open an issue](https://github.com/sonnysam/sonny-ui/issues) or start a [discussion](https://github.com/sonnysam/sonny-ui/discussions)!

Made with ❤️ in Ghana 🇬🇭 by Samuel Agbenyo (@AgbenyoOfficial on X)
