import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common/base-model'
import { PuId } from '../common/id-generator'
import { ClassroomMemberRole } from '../classroom/classroom-member'

export type UserId = PuId

export enum UserStatus {
    /* user is active */
    ACTIVE = 'ACTIVE',
    /* user account deactivated */
    INACTIVE = 'INACTIVE',
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
    verified: Type.Boolean(),
    status: Type.Enum(UserStatus),
    schoolId: Type.Union([PuId, Type.Null()]),
    tokenVersion: Type.Optional(Type.String()),
})

export type User = Static<typeof User>

export const UserMeta = Type.Object({
    id: Type.String(),
    email: Type.String(),
    firstName: Type.String(),
    lastName: Type.String(),
    status: Type.Enum(UserStatus),
    schoolId: Type.Union([PuId, Type.Null()]),
    created: Type.String(),
    updated: Type.String(),
})

export type UserMeta = Static<typeof UserMeta>
