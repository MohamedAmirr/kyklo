import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common'
import { PuId } from '../common/id-generator'

export type ClassroomId = PuId

export const Classroom = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
    schoolId: PuId,
    teacherId: Type.String(),
    schoolGradeId: PuId,
})

export type Classroom = Static<typeof Classroom>
