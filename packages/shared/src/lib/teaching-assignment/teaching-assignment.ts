import { Static, Type } from '@sinclair/typebox'
import { PuId, BaseModelSchema, UserMeta } from '@pickup/shared'

export type TeachingAssignmentId = string

export const TeachingAssignment = Type.Object(
    {
        ...BaseModelSchema,
        schoolId: PuId,
        userId: PuId,
        classroomId: PuId,
        subjectId: PuId,
    },
    {
        description:
            'Represents the assignment of a teacher (user) with specific subject to a specific classroom within a school.',
    }
)

export type TeachingAssignment = Static<typeof TeachingAssignment>

export const TeachingAssignmentWithUser = Type.Composite([
    TeachingAssignment,
    Type.Object({
        user: UserMeta,
    }),
])

export type TeachingAssignmentWithUser = Static<
    typeof TeachingAssignmentWithUser
>
