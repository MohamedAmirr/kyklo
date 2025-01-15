import { Static, Type } from '@sinclair/typebox'
import { EmailType, PasswordType, UserTypes } from '../../user/user'
import { PuId } from '../../common/id-generator'

export const SignUpRequest = Type.Object({
    email: EmailType,
    password: PasswordType,
    firstName: Type.String(),
    lastName: Type.String(),
    type: Type.Enum(UserTypes),
    schoolId: PuId,
})

export type SignUpRequest = Static<typeof SignUpRequest>
