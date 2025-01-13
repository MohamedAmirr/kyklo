import { Classroom, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'

export type UserSchema = User & {
    classrooms: Classroom[]
}

export const UserEntity = new EntitySchema<UserSchema>({
    name: 'user',
    columns: {
        ...BaseColumnSchemaPart,
        email: {
            type: String,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        password: {
            type: String,
        },
        verified: {
            type: Boolean,
        },
        status: {
            type: String,
        },
        schoolId: {
            type: String,
            nullable: true,
        },
        tokenVersion: {
            type: String,
            nullable: true,
        },
    },
    indices: [
        {
            name: 'idx_user_school_id_email',
            columns: ['schoolId', 'email'],
            unique: true,
        },
    ],
    relations: {
        classrooms: {
            type: 'one-to-many',
            target: 'user',
            inverseSide: 'owner',
        },
    },
})
