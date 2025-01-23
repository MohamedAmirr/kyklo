import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common/base-model'
import { PuId } from '../common/id-generator'

export type UserId = PuId

export enum UserStatus {
    /* user is active */
    ACTIVE = 'ACTIVE',
    /* user account deactivated */
    INACTIVE = 'INACTIVE',
}

export enum UserType {
    STAFF = 'STAFF',
    STUDENT = 'STUDENT',
    PARENT = 'PARENT',
}

export const EmailType = Type.String({
    format: 'email',
})

export const PasswordType = Type.String({
    minLength: 8,
    maxLength: 64,
})

export const User = Type.Object({
    ...BaseModelSchema,
    email: Type.String(),
    firstName: Type.String(),
    lastName: Type.String(),
    password: Type.String(),
    type: Type.Enum(UserType),
    status: Type.Enum(UserStatus),
    schoolId: PuId,
})

export type User = Static<typeof User>

export const UserMeta = Type.Object({
    ...BaseModelSchema,
    email: Type.String(),
    firstName: Type.String(),
    lastName: Type.String(),
    type: Type.Enum(UserType),
    status: Type.Enum(UserStatus),
    schoolId: PuId,
})

export type UserMeta = Static<typeof UserMeta>
