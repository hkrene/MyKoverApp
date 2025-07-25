import vine from '@vinejs/vine'


export const signupValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique(async (db, value) => {
      const user = await db.from('users').where('email', value).first()
      return !user
    }),
    password: vine.string().minLength(6),
    name: vine.string().optional(),
  })
)


export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)
