# Google Auth Error 400: invalid_request - Troubleshooting Guide

## 🔍 Error Analysis

The "Error 400: invalid_request" error typically occurs due to:

1. **Incorrect Client ID configuration**
2. **Wrong redirect URI**
3. **Missing or incorrect OAuth setup**
4. **Expo configuration issues**

## 🛠️ Step-by-Step Fix

### Step 1: Configure Google Cloud Console

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Navigate to your project**
3. **Go to APIs & Services > Credentials**
4. **Edit your OAuth 2.0 Client ID**
5. **Add these redirect URIs**:
   ```
   mykover://auth
   exp://localhost:19000/--/auth
   exp://192.168.1.100:19000/--/auth
   ```

### Step 2: Update Your Config

Edit `Myfront/config/googleAuth.ts`:

```typescript
export const GOOGLE_AUTH_CONFIG = {
  CLIENT_ID: 'your-actual-google-client-id.apps.googleusercontent.com',
  CLIENT_SECRET: 'your-actual-google-client-secret',
  REDIRECT_URI: 'mykover://auth',
  SCOPES: ['openid', 'profile', 'email'],
}
```

### Step 3: Check Your SHA-1 Configuration

Make sure you've added your SHA-1 to Google Cloud Console:
- **Package name**: `com.mykover.app`
- **SHA-1**: `2449772dc8379ad50f659f7df8bd3463d6d174c0`

### Step 4: Verify App Configuration

Check `app.json` has correct scheme:

```json
{
  "expo": {
    "scheme": "mykover",
    "android": {
      "package": "com.mykover.app"
    }
  }
}
```

## 🔧 Common Issues & Solutions

### Issue 1: "Client ID not configured"
**Solution**: Update `config/googleAuth.ts` with your actual Google Client ID

### Issue 2: "Redirect URI mismatch"
**Solution**: Add all redirect URIs to Google Cloud Console

### Issue 3: "Invalid OAuth flow"
**Solution**: Use Expo AuthSession instead of WebBrowser

### Issue 4: "SHA-1 not found"
**Solution**: Add your SHA-1 fingerprint to Google Cloud Console

## 🧪 Testing Steps

### 1. Test Configuration
```bash
cd Myfront
yarn start
```

### 2. Check Console Logs
Look for these logs:
- `Client ID: your-client-id`
- `Redirect URI: mykover://auth`
- `Auth URL: https://accounts.google.com/...`

### 3. Test on Device
- Use Expo Go or development build
- Try Google Sign-In
- Check for error messages

## 📋 Debug Checklist

- [ ] Google Client ID configured in `config/googleAuth.ts`
- [ ] Redirect URIs added to Google Cloud Console
- [ ] SHA-1 fingerprint added to Google Cloud Console
- [ ] Package name matches in Google Cloud Console
- [ ] App scheme configured in `app.json`
- [ ] Testing on physical device (not emulator)

## 🚀 Quick Fix Commands

```bash
# Check current config
cat Myfront/config/googleAuth.ts

# Test the app
cd Myfront && yarn start

# Check logs for errors
# Look for "Google Sign-In error" in console
```

## 📞 Next Steps

1. **Update your Google Client ID** in the config file
2. **Add all redirect URIs** to Google Cloud Console
3. **Test on a physical device**
4. **Check console logs** for specific error messages

The most common cause is using placeholder values in the config file. Make sure to replace `'YOUR_GOOGLE_CLIENT_ID'` with your actual Google Client ID! 