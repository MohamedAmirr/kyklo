import { Static, Type } from '@sinclair/typebox'
import { PuId } from '../common/id-generator'
import { BaseModelSchema } from '../common'

export const SchoolGrade = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
    schoolStageId: PuId,
    schoolId: PuId,
})

export type SchoolGrade = Static<typeof SchoolGrade>
