# Google Authentication Setup Guide

This guide will help you set up Google authentication for your MyKover app.

## Prerequisites

1. A Google Cloud Console account
2. Your app running on Expo
3. Backend server running

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google+ API
   - Google Identity API

### 1.2 Create OAuth 2.0 Credentials

1. Go to "Credentials" in the left sidebar
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Configure the OAuth consent screen if prompted
4. Choose "Web application" as the application type
5. Add the following redirect URIs:
   - `mykover://auth` (for your app)
   - `exp://localhost:19000/--/auth` (for Expo development)
6. Copy the Client ID and Client Secret

## Step 2: Backend Configuration

### 2.1 Environment Variables

Add the following to your backend `.env` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 2.2 Database Migration

Run the migration to add Google auth fields:

```bash
cd backend
node ace migration:run
```

## Step 3: Frontend Configuration

### 3.1 Update Google Auth Config

Edit `Myfront/config/googleAuth.ts` and replace the placeholder values:

```typescript
export const GOOGLE_AUTH_CONFIG = {
  CLIENT_ID: 'your_actual_google_client_id',
  CLIENT_SECRET: 'your_actual_google_client_secret',
  REDIRECT_URI: 'mykover://auth',
  SCOPES: ['openid', 'profile', 'email'],
}
```

### 3.2 App Configuration

Update your `app.json` to include the scheme:

```json
{
  "expo": {
    "scheme": "mykover",
    "android": {
      "package": "com.yourcompany.mykover"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.mykover"
    }
  }
}
```

## Step 4: Testing

### 4.1 Test the Implementation

1. Start your backend server
2. Start your Expo app
3. Try the Google Sign-In button on the login screen
4. Check the console logs for any errors

### 4.2 Common Issues

1. **Redirect URI mismatch**: Make sure the redirect URI in Google Console matches your app's scheme
2. **CORS issues**: Ensure your backend allows requests from your frontend
3. **Token verification**: Check that the Google Client ID is correctly set in your backend

## Step 5: Production Deployment

### 5.1 Update Redirect URIs

For production, update the redirect URIs in Google Console to include your production domain.

### 5.2 Environment Variables

Make sure to set the `GOOGLE_CLIENT_ID` environment variable in your production backend.

## API Endpoints

### Google Authentication

- **POST** `/auth/google`
  - Body: `{ "idToken": "google_id_token" }`
  - Response: `{ "user": {...}, "token": {...} }`

## Security Considerations

1. Never expose your Google Client Secret in client-side code
2. Always verify Google tokens on the backend
3. Use HTTPS in production
4. Implement proper error handling

## Troubleshooting

### Common Errors

1. **"Invalid Google token"**: Check that your Google Client ID is correct
2. **"Redirect URI mismatch"**: Verify the redirect URI in Google Console
3. **"Network error"**: Check your backend server is running and accessible

### Debug Tips

1. Check browser console for OAuth errors
2. Check backend logs for token verification errors
3. Verify environment variables are set correctly
4. Test with a simple Google account first

## Files Modified

### Backend
- `app/models/user.ts` - Added Google auth fields
- `app/services/google_auth_service.ts` - Google auth service
- `app/controllers/auth_controller.ts` - Added Google auth endpoint
- `start/routes.ts` - Added Google auth route
- `start/env.ts` - Added Google Client ID environment variable
- `database/migrations/1754590726925_create_add_google_auth_fields_to_users_table.ts` - Database migration

### Frontend
- `services/googleAuth.ts` - Google auth service
- `config/googleAuth.ts` - Google auth configuration
- `app/login.tsx` - Added Google Sign-In button

## Next Steps

1. Test the implementation thoroughly
2. Add error handling for edge cases
3. Implement user profile management for Google users
4. Add logout functionality
5. Consider adding other OAuth providers (Facebook, Apple, etc.) 