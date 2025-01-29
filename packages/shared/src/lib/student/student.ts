import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common'
import { PuId } from '../common/id-generator'
import { SchoolSemesters } from '../school'

export type StudentId = PuId

export const Student = Type.Object({
    ...BaseModelSchema,
    schoolGradeId: PuId,
    semester: Type.Enum(SchoolSemesters),
    classroomId: Type.String(),
    userId: Type.String(),
})

export type Student = Static<typeof Student>
