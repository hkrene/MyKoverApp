import vine from '@vinejs/vine'


export const signupValidator = vine.compile(
    vine.object({
      fullName: vine.string().trim(),
      phoneNumber: vine
        .string()
        .regex(/^(?:\+?\d{1,4}|0)\d{8,14}$/)
        .unique(async (db, value) => {
          const exists = await db.from('users').where('phone', value).first()
          return !exists
        }),
       email:vine.string().email(),
      password: vine
        .string()
        .minLength(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/),
    })
  )
  


export const loginValidator = vine.compile(
  vine.object({
    phoneNumber: vine
        .string()
        .regex(/^(?:\+?\d{1,4}|0)\d{8,14}$/)
        .unique(async (db, value) => {
          const exists = await db.from('users').where('phone', value).first()
          return !exists
    }),
    email:vine.string().email(),
      password: vine
        .string()
        .minLength(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/),
  })
)
