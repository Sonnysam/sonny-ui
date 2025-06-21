# Setup Guide

## Requirements

sonny-ui requires **Expo SDK 50 or higher** for full compatibility and feature support.

### Minimum Requirements

- **Expo SDK**: 50.0.0 or higher
- **React Native**: 0.73.0 or higher
- **React**: 18.0.0 or higher
- **Node.js**: 18.0.0 or higher

### Recommended Setup

- **Expo SDK**: 52+ (for New Architecture support)
- **React Native**: 0.76+
- **TypeScript**: 5.0+ (optional but recommended)

## Compatibility Check

Before installing sonny-ui, verify your project's Expo SDK version:

```bash
# Check your current Expo SDK version
npx expo --version

# Check your project's Expo version
cat package.json | grep expo
```

### Upgrading from Older Expo Versions

If your project uses Expo SDK < 50, upgrade first:

```bash
# Upgrade to latest Expo SDK
npx expo install expo@latest --fix

# Update all dependencies
npx expo install --fix

# Clean and rebuild (if using development builds)
npx expo prebuild --clean
```

## Installation

### Basic Installation

```bash
npm install sonny-ui
```

### With Backend Setup

sonny-ui provides automated setup for popular backends:

#### Firebase Setup

```bash
npm install sonny-ui -f
# or
npm install sonny-ui --firebase
```

This will:

- Install `firebase` dependency
- Create `config/firebase.ts` with authentication, firestore, and storage setup
- Generate `.env.example` with Firebase configuration template

#### Supabase Setup

```bash
npm install sonny-ui -s
# or
npm install sonny-ui --supabase
```

This will:

- Install `@supabase/supabase-js`, `@react-native-async-storage/async-storage`, and `react-native-url-polyfill`
- Create `config/supabase.ts` with authentication and database setup
- Generate `.env.example` with Supabase configuration template

#### Both Firebase and Supabase

```bash
npm install sonny-ui -f -s
```

## New Architecture Support

sonny-ui fully supports React Native's New Architecture, which provides:

- Improved performance
- Better type safety
- Enhanced developer experience

### Enabling New Architecture

For **Expo SDK 52+**, New Architecture is enabled by default for new projects.

For **Expo SDK 50-51**, enable it manually:

```json
// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "newArchEnabled": true
          },
          "ios": {
            "newArchEnabled": true
          }
        }
      ]
    ]
  }
}
```

### Testing New Architecture Compatibility

```bash
# Check for incompatible dependencies
npx expo-doctor@latest

# Test your app with New Architecture
npx expo run:ios
npx expo run:android
```

## Configuration Files

After running setup with backend options, you'll find:

### Firebase Configuration

```
config/
  └── firebase.ts     # Firebase initialization and services
.env.example          # Environment variables template
```

Update `config/firebase.ts` with your Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

### Supabase Configuration

```
config/
  └── supabase.ts     # Supabase client configuration
.env.example          # Environment variables template
```

Create `.env` file with your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Usage

### Basic Setup

```tsx
import React from "react";
import { MainContainer, SonnyToast } from "sonny-ui";

export default function App() {
  return (
    <MainContainer>
      <SonnyToast />
      {/* Your app content */}
    </MainContainer>
  );
}
```

### With Firebase

```tsx
import React from "react";
import { auth, db } from "./config/firebase";
import { MainContainer } from "sonny-ui";

export default function App() {
  // Use Firebase services
  return <MainContainer>{/* Your app content */}</MainContainer>;
}
```

### With Supabase

```tsx
import React from "react";
import { supabase } from "./config/supabase";
import { MainContainer } from "sonny-ui";

export default function App() {
  // Use Supabase client
  return <MainContainer>{/* Your app content */}</MainContainer>;
}
```

## Troubleshooting

### Version Compatibility Issues

If you see warnings about incompatible versions:

1. **Check Expo SDK version**:

   ```bash
   npx expo --version
   ```

2. **Upgrade if necessary**:

   ```bash
   npx expo install expo@latest --fix
   ```

3. **Clear cache and reinstall**:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### New Architecture Issues

If you encounter issues with New Architecture:

1. **Check dependency compatibility**:

   ```bash
   npx expo-doctor@latest
   ```

2. **Update incompatible libraries**:

   ```bash
   npx expo install --fix
   ```

3. **Temporarily disable New Architecture**:
   ```json
   // app.json
   {
     "expo": {
       "plugins": [
         [
           "expo-build-properties",
           {
             "android": { "newArchEnabled": false },
             "ios": { "newArchEnabled": false }
           }
         ]
       ]
     }
   }
   ```

### Metro Configuration

For monorepos or complex setups, you may need to configure Metro:

```javascript
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add any custom configuration here

module.exports = config;
```

## Migration Guide

### From Expo SDK 45-49

1. **Backup your project**
2. **Upgrade Expo SDK**:
   ```bash
   npx expo install expo@latest --fix
   ```
3. **Update sonny-ui**:
   ```bash
   npm install sonny-ui@latest
   ```
4. **Test thoroughly** - most components should work without changes
5. **Consider enabling New Architecture** for better performance

### Breaking Changes

sonny-ui maintains backward compatibility within major versions, but some breaking changes may occur when upgrading Expo SDK versions:

- **Expo SDK 50**: Minimum React Native 0.73
- **Expo SDK 51**: New Camera and SQLite APIs
- **Expo SDK 52**: New Architecture enabled by default
- **Expo SDK 53**: Latest features and optimizations

## Support

For issues related to:

- **Expo SDK compatibility**: Check [Expo documentation](https://docs.expo.dev)
- **sonny-ui components**: Open an issue on GitHub
- **Backend setup**: Refer to Firebase/Supabase documentation

---

**Note**: Always test your app thoroughly after upgrading Expo SDK versions or enabling New Architecture.
