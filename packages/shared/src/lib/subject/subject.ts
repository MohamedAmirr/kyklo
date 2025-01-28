import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common'
import { PuId } from '../common/id-generator'

export const Subject = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
    departmentId: PuId,
    schoolId: PuId,
    schoolGradeId: PuId,
    creditHours: Type.Optional(Type.Number()),
})

export type Subject = Static<typeof Subject>
