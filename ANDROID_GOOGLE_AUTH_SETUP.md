# Android Google Authentication Setup Guide

This guide will help you complete the Google authentication setup for Android by configuring the SHA-1 fingerprint and Android manifest.

## Prerequisites

- Android Studio installed
- Java Development Kit (JDK) installed
- Your app running on Expo

## Step 1: Get SHA-1 Fingerprint

### Method 1: Using the provided script (Recommended)

```bash
cd Myfront
yarn get-sha1
```

This will automatically generate your debug SHA-1 fingerprint.

### Method 2: Manual generation

```bash
# For debug keystore (development)
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# For release keystore (production)
keytool -list -v -keystore your-release-key.keystore -alias your-key-alias -storepass your-store-password -keypass your-key-password
```

### Step 2: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your project
3. Go to **APIs & Services** > **Credentials**
4. Edit your OAuth 2.0 Client ID
5. In the **Android** section, add:
   - **Package name**: `com.mykover.app`
   - **SHA-1 certificate fingerprint**: (Your SHA-1 from step 1)

## Step 3: Android Manifest Configuration

The Android manifest has been configured in `app.json`. Here's what was added:

```json
{
  "android": {
    "package": "com.mykover.app",
    "permissions": [
      "android.permission.INTERNET"
    ],
    "intentFilters": [
      {
        "action": "VIEW",
        "autoVerify": true,
        "data": [
          {
            "scheme": "mykover"
          }
        ],
        "category": [
          "BROWSABLE",
          "DEFAULT"
        ]
      }
    ]
  }
}
```

## Step 4: Build Configuration

### For Development (Debug)

1. **Debug SHA-1**: Use the SHA-1 from your debug keystore
2. **Package name**: `com.mykover.app`
3. **Redirect URI**: `mykover://auth`

### For Production (Release)

1. **Release SHA-1**: Use the SHA-1 from your release keystore
2. **Package name**: `com.mykover.app`
3. **Redirect URI**: `mykover://auth`

## Step 5: Testing

### Test on Physical Device

1. Connect your Android device
2. Enable USB debugging
3. Run the app:
   ```bash
   yarn android
   ```

### Test on Emulator

1. Start Android emulator
2. Run the app:
   ```bash
   yarn android
   ```

## Step 6: Common Issues and Solutions

### Issue 1: "SHA-1 fingerprint not found"

**Solution**: Make sure you've added the correct SHA-1 to Google Cloud Console

### Issue 2: "Redirect URI mismatch"

**Solution**: Verify the redirect URI in Google Console matches your app scheme

### Issue 3: "Package name not found"

**Solution**: Ensure the package name in Google Console matches `com.mykover.app`

### Issue 4: "Network error"

**Solution**: Check that your device/emulator has internet access

## Step 7: Production Deployment

### Generate Release Keystore

```bash
keytool -genkey -v -keystore mykover-release-key.keystore -alias mykover-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Get Release SHA-1

```bash
keytool -list -v -keystore mykover-release-key.keystore -alias mykover-key-alias
```

### Update Google Cloud Console

1. Add the release SHA-1 to your OAuth 2.0 Client ID
2. Keep both debug and release SHA-1 fingerprints

## Step 8: Verification

### Check Configuration

1. **Google Cloud Console**: Verify SHA-1 and package name
2. **App Configuration**: Verify scheme and package name in `app.json`
3. **Testing**: Test Google Sign-In on both debug and release builds

### Debug Information

Add this to your Google auth service for debugging:

```typescript
console.log('Package name:', 'com.mykover.app');
console.log('Scheme:', 'mykover');
console.log('Redirect URI:', 'mykover://auth');
```

## Files Modified

### Configuration Files
- `app.json` - Added Android manifest configuration
- `package.json` - Added SHA-1 generation script
- `scripts/get-sha1.js` - SHA-1 generation utility

### Google Auth Files
- `services/googleAuth.ts` - Google authentication service
- `config/googleAuth.ts` - Google OAuth configuration

## Security Best Practices

1. **Never commit keystores**: Add `*.keystore` to `.gitignore`
2. **Use different keystores**: Separate debug and release keystores
3. **Secure storage**: Store keystore passwords securely
4. **Regular updates**: Update SHA-1 fingerprints when keystores change

## Troubleshooting Commands

```bash
# Check if debug keystore exists
ls ~/.android/debug.keystore

# Generate debug SHA-1
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Check app configuration
cat app.json | grep -A 10 "android"

# Test Google auth
yarn android
```

## Next Steps

1. ✅ Get SHA-1 fingerprint
2. ✅ Configure Google Cloud Console
3. ✅ Test on device/emulator
4. ✅ Generate release keystore
5. ✅ Deploy to production

Your Google authentication should now work properly on Android! 🎉 