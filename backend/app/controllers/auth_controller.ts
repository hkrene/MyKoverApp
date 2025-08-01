import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, signupValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'



export default class AuthController {
    async signup({ request, response }: HttpContext) {
        const data = await request.validateUsing(signupValidator)
        console.log(data);
        const user = await User.create({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email:data.email,
        password: await hash.make(data.password),
        })

        const token = await User.accessTokens.create(user)

        return response.created({
        user: user.serialize(),
        token,
        })
    }

    
    async login({ request, response }: HttpContext) {
        const {phoneNumber, password }= await request.validateUsing(loginValidator)
        const user = await User.findByOrFail('phoneNumber', phoneNumber)
        if (!user) return response.unauthorized({ message: 'Numéro incorrect' })

        const passwordValid = await user.verifyPassword(password)
        if (!passwordValid)
        return response.unauthorized({ message: 'Mot de passe incorrect' })

        const token = await User.accessTokens.create(user)
        return response.ok({ user: user.serialize(), token })
    }

    async logout({ auth, response }: HttpContext) {
        await auth.use('api').invalidateToken()
        return response.ok({ message: 'Déconnecté avec succès' })
    }

}