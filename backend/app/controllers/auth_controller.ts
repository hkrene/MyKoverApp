import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
    public async signup({request, response}:HttpContext){
        const { fullName, email, password } = request.only(['fullName', 'email', 'password'])

        const user = await User.create({
        fullName,
        email,
        password,
        })

        return response.created({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        })

    }

    public async login({request, response, auth}:HttpContext){
            const { email, password } = request.only(['email', 'password'])
            try {
              const token = await auth.use('api').attempt(email, password)
        
              return {
                type: token.type,
                token: token.token,
                expires_at: token.expiresAt,
                user: auth.user,
              }
            } catch {
              return response.unauthorized({ message: 'Email ou mot de passe invalide' })
            }
    }



}