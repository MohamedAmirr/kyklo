import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '@pickup/shared'

export const Department = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
    schoolId: Type.String(),
})

export type Department = Static<typeof Department>
