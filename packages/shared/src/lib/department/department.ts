import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema, PuId } from '@pickup/shared'

export const Department = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
    schoolId: PuId,
})

export type Department = Static<typeof Department>
