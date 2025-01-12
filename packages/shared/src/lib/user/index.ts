import { Static, Type } from '@sinclair/typebox'
import { UserStatus } from './user'

export * from './user-dto'
export * from './user'

export const UpdateUserRequestBody = Type.Object({
    status: Type.Optional(Type.Enum(UserStatus)),
})

export type UpdateUserRequestBody = Static<typeof UpdateUserRequestBody>

