# ProGuard Configuration - DocScanner App

## ✅ Implemented Features

1. **ProGuard Enabled** - Code minification and obfuscation
2. **APK Splitting** - Separate APKs per CPU architecture (armeabi-v7a, arm64-v8a, x86, x86_64)
3. **Hermes Engine** - Already enabled for better performance
4. **Optimized JVM** - 2GB heap size for faster builds

## 📦 APK Size Reduction

**Without ProGuard:** 60-80 MB (universal APK)  
**With ProGuard + APK Splitting:** 15-25 MB per architecture  
**Expected Size:** ~19-25 MB ✅

## 🔧 Configuration Files

### 1. android/app/build.gradle
- `enableProguardInReleaseBuilds = true`
- `enableSeparateBuildPerCPUArchitecture = true`
- APK splitting enabled for all architectures

### 2. android/app/proguard-rules.pro
- Keep rules for React Native core
- Keep rules for all libraries (WebView, AsyncStorage, NetInfo, SVG)
- Keep native methods and crash reporting

### 3. android/gradle.properties
- `hermesEnabled=true` ✅
- `reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64` ✅
- `org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m` ✅

## 🚀 Build Commands

### Clean Build
```bash
cd android
./gradlew clean
```

### Build Release APK (All Architectures)
```bash
cd android
./gradlew assembleRelease
```

### Build for Specific Architecture
```bash
# ARM 64-bit (most modern phones)
cd android
./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a

# ARM 32-bit (older phones)
cd android
./gradlew assembleRelease -PreactNativeArchitectures=armeabi-v7a
```

## 📍 APK Location

After build, APKs will be in:
```
android/app/build/outputs/apk/release/
```

Files:
- `app-armeabi-v7a-release.apk` (ARM 32-bit)
- `app-arm64-v8a-release.apk` (ARM 64-bit) - Most common
- `app-x86-release.apk` (Intel 32-bit)
- `app-x86_64-release.apk` (Intel 64-bit)

## 📱 Install APK on Device

```bash
# Install specific architecture APK
adb install android/app/build/outputs/apk/release/app-arm64-v8a-release.apk
```

## 🔍 What ProGuard Does

1. **Code Shrinking** - Removes unused classes, methods, fields
2. **Code Obfuscation** - Renames classes/methods to short names (a, b, c)
3. **Code Optimization** - Optimizes bytecode, removes dead code
4. **Result** - 30-40% smaller APK size

## ⚠️ Troubleshooting

If app crashes after ProGuard build:
1. Check crash logs: `adb logcat`
2. Look for `ClassNotFoundException` or `MethodNotFoundException`
3. Add `-keep` rules in `proguard-rules.pro` for missing classes

Example:
```proguard
# If library XYZ causes crash
-keep class com.library.xyz.** { *; }
```

## 📊 Build Time

First build: 5-10 minutes  
Incremental builds: 2-3 minutes

## 🎯 Recommended for Production

For Play Store upload, use **arm64-v8a** and **armeabi-v7a** APKs:
```bash
cd android
./gradlew assembleRelease
```

Upload both APKs to Play Console - it will automatically serve the right one to users.

---

**Status:** ✅ ProGuard Fully Configured and Ready
