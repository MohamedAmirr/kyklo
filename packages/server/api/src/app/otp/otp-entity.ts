import { OtpModel, OtpState, OtpType, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import {
    PuIdSchema,
    BaseColumnSchemaPart,
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
    // indices: [
    //     {
    //         name: 'idx_otp_user_id_type',
    //         columns: ['userId', 'type'],
    //         unique: true,
    //     },
    // ],
    // relations: {
    //     user: {
    //         type: 'many-to-one',
    //         target: 'user',
    //         cascade: true,
    //         onDelete: 'CASCADE',
    //         joinColumn: {
    //             name: 'userId',
    //             foreignKeyConstraintName: 'fk_otp_user_id',
    //         },
    //     },
    // },
})
