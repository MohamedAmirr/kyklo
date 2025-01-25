import { OtpModel, OtpState, OtpType, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import {
    BaseColumnSchemaPart,
    PuIdSchema,
} from '../database/database-common'

export type OtpSchema = OtpModel & {
    user: User
}

export const OtpEntity = new EntitySchema<OtpSchema>({
    name: 'otp',
    columns: {
        ...BaseColumnSchemaPart,
        type: {
            type: String,
            enum: OtpType,
            nullable: false,
        },
        userId: {
            ...PuIdSchema,
            nullable: false,
        },
        value: {
            type: String,
            nullable: false,
        },
        state: {
            type: String,
            enum: OtpState,
            nullable: false,
        },
    },
})
