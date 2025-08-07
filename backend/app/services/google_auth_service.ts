import { OAuth2Client } from 'google-auth-library'
import User from '#models/user'
import env from '#start/env'

export default class GoogleAuthService {
  private client: OAuth2Client

  constructor() {
    this.client = new OAuth2Client(env.get('GOOGLE_CLIENT_ID'))
  }

  async verifyGoogleToken(idToken: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: env.get('GOOGLE_CLIENT_ID'),
      })

      const payload = ticket.getPayload()
      if (!payload) {
        throw new Error('Invalid Google token')
      }

      if (!payload.sub || !payload.email || !payload.name) {
        throw new Error('Invalid Google token payload')
      }

      return {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      }
    } catch (error) {
      console.error('Google token verification error:', error)
      throw new Error('Invalid Google token')
    }
  }

  async findOrCreateUser(googleData: {
    googleId: string
    email: string
    name: string
    picture?: string
  }) {
    // First, try to find user by Google ID
    let user = await User.findBy('googleId', googleData.googleId)

    if (!user) {
      // If not found by Google ID, try to find by email
      user = await User.findBy('email', googleData.email)

      if (user) {
        // If user exists with email but no Google ID, update with Google ID
        user.googleId = googleData.googleId
        user.googleEmail = googleData.email
        await user.save()
      } else {
        // Create new user
        user = await User.create({
          fullName: googleData.name,
          email: googleData.email,
          googleId: googleData.googleId,
          googleEmail: googleData.email,
          phoneNumber: undefined, // Google auth users don't need phone
          password: undefined, // Google auth users don't need password
        })
      }
    }

    return user
  }
} 