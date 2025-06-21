#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get the project root (where the user installed sonny-ui)
const projectRoot = process.cwd();
const configDir = path.join(projectRoot, "config");

// Check for installation flags
const args = process.argv.slice(2);
const installFirebase = args.includes("-f") || args.includes("--firebase");
const installSupabase = args.includes("-s") || args.includes("--supabase");

console.log("🚀 Setting up sonny-ui...");

// Check Expo SDK version compatibility
function checkExpoCompatibility() {
  try {
    const packageJsonPath = path.join(projectRoot, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      const expoDep =
        packageJson.dependencies?.expo || packageJson.devDependencies?.expo;

      if (expoDep) {
        const version = expoDep.replace(/[\^~>=<]/, "").split(".")[0];
        if (parseInt(version) < 50) {
          console.log("⚠️  Warning: sonny-ui requires Expo SDK 50 or higher.");
          console.log(
            "   Your project appears to be using Expo SDK " + version
          );
          console.log(
            "   Please upgrade your Expo SDK for full compatibility."
          );
          console.log("   Run: npx expo install expo@latest --fix");
        }
      }
    }
  } catch (error) {
    // Silently continue if we can't determine the version
  }
}

checkExpoCompatibility();

// Create config directory if it doesn't exist
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
  console.log("📁 Created config directory");
}

// Firebase setup
if (installFirebase) {
  console.log("🔥 Setting up Firebase configuration...");

  // Install Firebase dependencies
  try {
    console.log("📦 Installing Firebase dependencies...");
    execSync("npm install firebase", { stdio: "inherit", cwd: projectRoot });

    // Create Firebase config file
    const firebaseConfig = `import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "***",
  authDomain: "***",
  projectId: "***",
  storageBucket: "***",
  messagingSenderId: "***",
  appId: "***",
  measurementId: "***", // Optional
};

let app;
if (!getApps().length) {
  try {
    console.log("Initializing Firebase...");
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    throw error;
  }
} else {
  app = getApp();
  console.log("Using existing Firebase app");
}

let auth: Auth, db: Firestore, storage: FirebaseStorage;
try {
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  console.log("Firebase services initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase services:", error);
  throw error;
}

export { auth, db, storage };
export default app;
`;

    fs.writeFileSync(path.join(configDir, "firebase.ts"), firebaseConfig);
    console.log("✅ Firebase configuration created at config/firebase.ts");
    console.log(
      "🔧 Please update your Firebase credentials in config/firebase.ts"
    );
  } catch (error) {
    console.error("❌ Error setting up Firebase:", error.message);
  }
}

// Supabase setup
if (installSupabase) {
  console.log("⚡ Setting up Supabase configuration...");

  try {
    console.log("📦 Installing Supabase dependencies...");
    // Use compatible versions for Expo 50+
    execSync(
      "npm install @supabase/supabase-js@latest @react-native-async-storage/async-storage@latest react-native-url-polyfill@latest",
      {
        stdio: "inherit",
        cwd: projectRoot,
      }
    );

    // Create Supabase config file
    const supabaseConfig = `import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "***";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "***";

if (!supabaseUrl || supabaseUrl === "***") {
  throw new Error("Missing EXPO_PUBLIC_SUPABASE_URL environment variable");
}

if (!supabaseAnonKey || supabaseAnonKey === "***") {
  throw new Error("Missing EXPO_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export default supabase;
`;

    fs.writeFileSync(path.join(configDir, "supabase.ts"), supabaseConfig);
    console.log("✅ Supabase configuration created at config/supabase.ts");
    console.log("🔧 Please set your Supabase credentials in your .env file:");
    console.log("   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url");
    console.log("   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key");
  } catch (error) {
    console.error("❌ Error setting up Supabase:", error.message);
  }
}

// Create example environment file
if (installFirebase || installSupabase) {
  const envExamplePath = path.join(projectRoot, ".env.example");
  let envContent = "";

  if (installSupabase) {
    envContent += `# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

`;
  }

  if (installFirebase) {
    envContent += `# Firebase Configuration (if using environment variables)
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

`;
  }

  if (envContent && !fs.existsSync(envExamplePath)) {
    fs.writeFileSync(envExamplePath, envContent);
    console.log("📝 Created .env.example file with configuration templates");
  }
}

if (!installFirebase && !installSupabase) {
  console.log("📚 sonny-ui installed successfully!");
  console.log("💡 To add backend configuration, reinstall with:");
  console.log("   npm install sonny-ui -f  (for Firebase)");
  console.log("   npm install sonny-ui -s  (for Supabase)");
}

console.log("🎉 Setup complete!");
console.log("");
console.log("📋 Compatibility Notes:");
console.log("   • Requires Expo SDK 50 or higher");
console.log("   • Supports React Native 0.73+");
console.log("   • Compatible with New Architecture (Expo SDK 52+)");
