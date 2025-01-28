import { Static, Type } from '@sinclair/typebox'
import { PuId } from '../common/id-generator'

export const SchoolGrade = Type.Object({
    name: Type.String(),
    schoolStageId: PuId,
    schoolId: PuId,
})

export type SchoolGrade = Static<typeof SchoolGrade>
