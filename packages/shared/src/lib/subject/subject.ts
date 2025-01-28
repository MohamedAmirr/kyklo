import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common'

export const Subject = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
    departmentId: Type.String(),
    schoolId: Type.String(),
    creditHours: Type.Optional(Type.Number()),
})

export type Subject = Static<typeof Subject>
