import { Static, Type } from '@sinclair/typebox'
import { SAFE_STRING_PATTERN } from '../common'
import { RoleType } from '../roles'

export const CreateClassroomRoleRequestBody = Type.Object({
    name: Type.String({
        pattern: SAFE_STRING_PATTERN,
    }),
    permissions: Type.Array(Type.String()),
    type: Type.Enum(RoleType),
})

export type CreateClassroomRoleRequestBody = Static<typeof CreateClassroomRoleRequestBody>

export const UpdateClassroomRoleRequestBody = Type.Object({
    name: Type.Optional(Type.String({
        pattern: SAFE_STRING_PATTERN,
    })),
    permissions: Type.Optional(Type.Array(Type.String())),
})

export type UpdateClassroomRoleRequestBody = Static<typeof UpdateClassroomRoleRequestBody>
