import { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

export const ListTeachingAssignmentRequestQuery = Type.Object({
    classroomId: Type.String(),
    cursor: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Number()),
})

export type ListTeachingAssignmentRequestQuery = Static<
    typeof ListTeachingAssignmentRequestQuery
>
