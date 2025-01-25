import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema, PuId } from '@pickup/shared'
import { OtpType } from './otp-type'

export enum OtpState {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
}

export const OtpModel = Type.Object({
    ...BaseModelSchema,
    type: Type.Enum(OtpType),
    userId: PuId,
    value: Type.String(),
    state: Type.Enum(OtpState),
})

export type OtpModel = Static<typeof OtpModel>
