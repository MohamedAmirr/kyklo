import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common/base-model'
import { PuId } from '../common/id-generator'
import { SchoolGrades, SchoolSemesters } from '../school'

export type StudentId = PuId

export const Student = Type.Object({
    ...BaseModelSchema,
    grade: Type.Enum(SchoolGrades),
    semester: Type.Enum(SchoolSemesters),
    classroomId: Type.String(),
    userId: Type.String(),
})

export type Student = Static<typeof Student>
