import { Static, Type } from '@sinclair/typebox'
import { EmailType, PasswordType } from '../../user'
import { PuId } from '../../common/id-generator'

export const SignInRequest = Type.Object({
    email: EmailType,
    password: PasswordType,
})

export type SignInRequest = Static<typeof SignInRequest>

export const SwitchClassroomRequest = Type.Object({
    classroomId: PuId,
})

export type SwitchClassroomRequest = Static<typeof SwitchClassroomRequest>
