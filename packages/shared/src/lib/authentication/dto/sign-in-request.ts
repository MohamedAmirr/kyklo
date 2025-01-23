import { Static, Type } from '@sinclair/typebox'
import { EmailType, PasswordType } from '../../user'

export const SignInRequest = Type.Object({
    email: EmailType,
    password: PasswordType,
})

export type SignInRequest = Static<typeof SignInRequest>
