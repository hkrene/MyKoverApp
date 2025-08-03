import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, signupValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'



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
        } catch (error) {
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
        } catch (error) {
            console.error('LOGIN ERROR', error)
            return response.unauthorized({ message: 'Numéro de téléphone ou mot de passe incorrect' })
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
        } catch (error) {
            return response.notFound({ message: 'User not found' })
        }
    }

}