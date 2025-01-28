import { Static, Type } from '@sinclair/typebox'

export const SchoolGrade = Type.Object({
    name: Type.String(),
    schoolStageId: Type.String(),
    schoolId: Type.String(),
})

export type SchoolGrade = Static<typeof SchoolGrade>
