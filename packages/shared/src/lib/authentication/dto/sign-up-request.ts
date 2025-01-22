import { Static, Type } from '@sinclair/typebox'
import { EmailType, PasswordType, UserType } from '../../user/user'
import { PuId } from '../../common/id-generator'

export const SignUpRequest = Type.Object({
    email: EmailType,
    password: PasswordType,
    firstName: Type.String(),
    lastName: Type.String(),
    type: Type.Enum(UserType),
    schoolId: PuId,
    tokenVersion: PuId,
})

export type SignUpRequest = Static<typeof SignUpRequest>
