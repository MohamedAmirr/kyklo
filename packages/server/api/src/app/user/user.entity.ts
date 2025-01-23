import { School, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'

export type UserSchema = User & {
    school: School,
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
        status: {
            type: String,
        },
        type: {
            type: String,
        },
        schoolId: {
            type: String,
        },
    },
    indices: [
        {
            name: 'idx_user_email',
            columns: ['email'],
            unique: true,
        },
    ],
    relations: {
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'users',
            joinColumn: {
                name: 'schoolId',
            },
        },
    },
})
