import * as WebBrowser from 'expo-web-browser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from './api'
import { GOOGLE_AUTH_CONFIG } from '@/config/googleAuth'

// For Expo Go, use a simple web-based OAuth flow
const REDIRECT_URI = 'https://auth.expo.io'

// Google OAuth endpoints
const GOOGLE_AUTH_ENDPOINTS = {
  authorization: 'https://accounts.google.com/o/oauth2/v2/auth',
  token: 'https://oauth2.googleapis.com/token',
}

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture?: string
}

export class GoogleAuthService {
  private static instance: GoogleAuthService
  private authRequest: any = null

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService()
    }
    return GoogleAuthService.instance
  }

  async signIn(): Promise<GoogleUser | null> {
    try {
      console.log('Starting Google Sign-In...')
      console.log('Client ID:', GOOGLE_AUTH_CONFIG.CLIENT_ID)
      console.log('Redirect URI:', REDIRECT_URI)

      // Validate client ID is configured
      if (!GOOGLE_AUTH_CONFIG.CLIENT_ID || GOOGLE_AUTH_CONFIG.CLIENT_ID.includes('YOUR_GOOGLE_CLIENT_ID')) {
        throw new Error('Google Client ID not configured. Please update config/googleAuth.ts')
      }

      // Create the Google OAuth URL directly
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_AUTH_CONFIG.CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
        `response_type=code&` +
        `scope=${GOOGLE_AUTH_CONFIG.SCOPES.join('%20')}&` +
        `access_type=offline`
      console.log('Auth URL:', authUrl)

      // Present the auth session with useProxy: false
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        REDIRECT_URI
      )

      console.log('Auth result:', result)

      if (result.type === 'success' && result.url) {
        // Extract the authorization code from the URL
        const url = new URL(result.url)
        const code = url.searchParams.get('code')
        
        if (code) {
          // Exchange the code for tokens
          const tokenResponse = await this.exchangeCodeForTokens(code)
          
          if (tokenResponse.idToken) {
            // Verify the token with our backend
            const user = await this.verifyTokenWithBackend(tokenResponse.idToken)
            return user
          }
        }
      } else if (result.type === 'cancel') {
        console.log('User cancelled authentication')
        return null
      }

      return null
    } catch (error) {
      console.error('Google Sign-In error:', error)
      throw error
    }
  }

  private async exchangeCodeForTokens(code: string) {
    try {
      console.log('Exchanging code for tokens...')
      
      // Exchange code for tokens using fetch
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: GOOGLE_AUTH_CONFIG.CLIENT_ID,
          client_secret: GOOGLE_AUTH_CONFIG.CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
      }).then(res => res.json())

      console.log('Token response received')
      return tokenResponse
    } catch (error) {
      console.error('Token exchange error:', error)
      throw error
    }
  }

  private async verifyTokenWithBackend(idToken: string): Promise<GoogleUser> {
    try {
      console.log('Verifying token with backend...')
      
      const response = await api.post('/auth/google', {
        idToken,
      })

      console.log('Backend response:', response.data)

      if (response.data.user) {
        // Store the authentication token
        const token = response.data.token?.token
        if (token) {
          await AsyncStorage.setItem('authToken', token)
          console.log('Google auth token stored successfully')
        }

        return {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.fullName,
          picture: response.data.user.picture,
        }
      }

      throw new Error('Invalid response from backend')
    } catch (error) {
      console.error('Backend verification error:', error)
      throw error
    }
  }

  async signOut(): Promise<void> {
    try {
      // Clear stored tokens
      await AsyncStorage.removeItem('authToken')
      console.log('Google auth tokens cleared')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }
}

export default GoogleAuthService.getInstance() 