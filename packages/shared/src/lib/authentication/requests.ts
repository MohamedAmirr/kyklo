import { Static, Type } from '@sinclair/typebox'
import { PuId } from '../common/id-generator'

export const VerifyEmailRequestBody = Type.Object({
    userId: PuId,
    otp: Type.String(),
})
export type VerifyEmailRequestBody = Static<typeof VerifyEmailRequestBody>

export const ResetPasswordRequestBody = Type.Object({
    userId: PuId,
    otp: Type.String(),
    newPassword: Type.String(),
})
export type ResetPasswordRequestBody = Static<typeof ResetPasswordRequestBody>
