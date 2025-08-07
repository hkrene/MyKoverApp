// Google OAuth Configuration
// Replace these with your actual Google OAuth credentials
// You can get these from the Google Cloud Console: https://console.cloud.google.com/

export const GOOGLE_AUTH_CONFIG = {
  // Web Client ID (for OAuth flow)
  CLIENT_ID: '842967950797-eajhai79t2ga70l5niu2lfd37v1f48ju.apps.googleusercontent.com', // Replace with your actual Client ID
  
  // Client Secret (for token exchange)
  CLIENT_SECRET: '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', // Replace with your actual Client Secret
  
  // Redirect URI for your app
  REDIRECT_URI: 'mykover://auth',
  
  // Scopes for the OAuth request
  SCOPES: ['openid', 'profile', 'email'],
}

// Instructions to set up Google OAuth:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select an existing one
// 3. Enable the Google+ API and Google Identity API
// 4. Go to Credentials
// 5. Create OAuth 2.0 Client ID
// 6. Add your redirect URI: mykover://auth
// 7. Copy the Client ID and Client Secret
// 8. Update the values above with your actual credentials 