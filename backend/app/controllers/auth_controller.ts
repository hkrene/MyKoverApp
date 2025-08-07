import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, signupValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'
import GoogleAuthService from '#services/google_auth_service'

export default class AuthController {
    async signup({ request, response }: HttpContext) {
        try {
          const data = await request.validateUsing(signupValidator)
          console.log('VALIDATION PASSED', data)
      
          const hashedPassword = await hash.make(data.password)
          console.log('PASSWORD HASHED', hashedPassword)
      
          const user = await User.create({
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: hashedPassword,
          })
      console.log('USER CREATED', user);
      
          const token = await User.accessTokens.create(user)
      
          return response.created({
            user: user.serialize(),
            token,
          })
        } catch (error: any) {
          console.error('SIGNUP ERROR', error)
      
          return response.badRequest({
            message: error.messages || error.message || 'Une erreur est survenue',
          })
        }
      }
      
    
    async login({ request, response }: HttpContext) {
        try {
            const {phoneNumber, password }= await request.validateUsing(loginValidator)
            console.log('LOGIN ATTEMPT', { phoneNumber, password })
            
            const user = await User.findByOrFail('phoneNumber', phoneNumber)
            console.log('USER FOUND', user.id, user.fullName)

            const passwordValid = await hash.verify(user.password, password)
            console.log('PASSWORD VERIFICATION', passwordValid)
            
            if (!passwordValid) {
                return response.unauthorized({ message: 'Mot de passe incorrect' })
            }

            const token = await User.accessTokens.create(user)
            return response.ok({ user: user.serialize(), token })
        } catch (error: any) {
            console.error('LOGIN ERROR', error)
            return response.unauthorized({ message: 'Numéro de téléphone ou mot de passe incorrect' })
        }
    }

    async googleAuth({ request, response }: HttpContext) {
        try {
            const { idToken } = request.only(['idToken'])
            
            if (!idToken) {
                return response.badRequest({ message: 'Google token is required' })
            }

            const googleAuthService = new GoogleAuthService()
            
            // Verify Google token
            const googleData = await googleAuthService.verifyGoogleToken(idToken)
            console.log('GOOGLE DATA VERIFIED', googleData)

            // Find or create user
            const user = await googleAuthService.findOrCreateUser(googleData)
            console.log('USER FOUND/CREATED', user.id, user.fullName)

            // Create access token
            const token = await User.accessTokens.create(user)

            return response.ok({
                user: user.serialize(),
                token,
                message: 'Google authentication successful'
            })
        } catch (error: any) {
            console.error('GOOGLE AUTH ERROR', error)
            return response.unauthorized({ 
                message: error.message || 'Google authentication failed' 
            })
        }
    }

    async logout({ auth, response }: HttpContext) {
        await auth.use('api').invalidateToken()
        return response.ok({ message: 'Déconnecté avec succès' })
    }

    async testUser({ params, response }: HttpContext) {
        try {
            const user = await User.findByOrFail('phoneNumber', params.phone)
            return response.ok({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                passwordHash: user.password,
                createdAt: user.createdAt
            })
        } catch (error: any) {
            return response.notFound({ message: 'User not found' })
        }
    }
}


