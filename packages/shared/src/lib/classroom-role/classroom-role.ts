import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common'

export const ClassroomRole = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
    permissions: Type.Array(Type.String()),
    platformId: Type.Optional(Type.String()),
    type: Type.String(),
})

export type ClassroomRole = Static<typeof ClassroomRole>