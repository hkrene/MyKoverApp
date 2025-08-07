# Google SHA-1 Commands Guide

This guide provides the exact commands you need to get SHA-1 fingerprints for Google authentication.

## 🔧 Prerequisites

First, install Java Development Kit (JDK):

```bash
# Ubuntu/Debian
sudo apt-get install openjdk-11-jdk

# macOS
brew install openjdk@11

# Windows
# Download from https://adoptium.net/
```

## 📱 Debug Keystore (Development)

### Command
```bash
keytool -keystore ~/.android/debug.keystore -list -v
```

### Steps
1. Run the command above
2. Look for `SHA1:` in the output
3. Copy the SHA1 value (e.g., `AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD`)
4. Remove colons and convert to lowercase (e.g., `aabbccddeeff00112233445566778899aabbccdd`)
5. Add to Google Cloud Console

## 🏭 Production Keystore (Release)

### Command
```bash
keytool -keystore path-to-your-release-keystore -list -v
```

### Steps
1. Replace `path-to-your-release-keystore` with your actual keystore path
2. Run the command
3. Look for `SHA1:` in the output
4. Copy the SHA1 value and remove colons
5. Add to Google Cloud Console

## 🔗 Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your project
3. Go to **APIs & Services** > **Credentials**
4. Edit your OAuth 2.0 Client ID
5. Add Android configuration:
   - **Package name**: `com.mykover.app`
   - **SHA-1 certificate fingerprint**: (your SHA-1 from above)

## 📋 Quick Commands

### Using the provided script
```bash
cd Myfront
yarn google-sha1
```

### Manual commands
```bash
# Debug keystore
keytool -keystore ~/.android/debug.keystore -list -v

# Production keystore (replace with your path)
keytool -keystore /path/to/your/release.keystore -list -v
```

## 🔍 Example Output

When you run the keytool command, you'll see output like this:

```
Certificate fingerprints:
SHA1: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD
SHA256: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD
```

**Copy the SHA1 value**: `AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD`

**Remove colons**: `aabbccddeeff00112233445566778899aabbccdd`

## 🚀 Complete Setup Checklist

- [ ] Install Java JDK
- [ ] Get debug SHA-1 fingerprint
- [ ] Get production SHA-1 fingerprint (if needed)
- [ ] Add both SHA-1 fingerprints to Google Cloud Console
- [ ] Add package name `com.mykover.app` to Google Cloud Console
- [ ] Test Google authentication on Android device/emulator

## 🛠️ Troubleshooting

### "keytool not found"
- Install Java Development Kit (JDK)
- Make sure Java is in your PATH

### "Debug keystore not found"
- This is normal for new development environments
- The keystore will be created automatically when you build your first Android app

### "SHA-1 not found in output"
- Make sure you're looking at the correct certificate
- Check that the keystore file exists and is valid

## 📱 App Configuration

Your app is configured with:
- **Package name**: `com.mykover.app`
- **Scheme**: `mykover`
- **Redirect URI**: `mykover://auth`

## 🔒 Security Notes

- Never commit keystores to version control
- Use different keystores for debug and release
- Store keystore passwords securely
- Update SHA-1 fingerprints when keystores change

## 🎯 Next Steps

1. Run the debug SHA-1 command
2. Copy the SHA-1 fingerprint
3. Add it to Google Cloud Console
4. Test Google authentication
5. Repeat for production keystore when ready to deploy

Your Google authentication should work perfectly once you complete these steps! 🎉 