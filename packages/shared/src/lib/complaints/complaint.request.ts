import { Static, Type } from '@sinclair/typebox'
import { ComplaintStatus } from './complaint'

export const ListComplaintsRequestQuery = Type.Object({
    limit: Type.Optional(Type.Number()),
    cursor: Type.Optional(Type.String()),
    status: Type.Optional(Type.Array(Type.Enum(ComplaintStatus))),
    title: Type.Optional(Type.String()),
})
export type ListComplaintsRequestQuery = Static<
    typeof ListComplaintsRequestQuery
>

export const CreateComplaintRequestBody = Type.Object({
    title: Type.String(),
    categoryId: Type.String(),
    description: Type.String(),
})
export type CreateComplaintRequestBody = Static<
    typeof CreateComplaintRequestBody
>

export const UpdateComplaintRequestBody = Type.Object({
    categoryId: Type.Optional(Type.String()),
    status: Type.Optional(Type.Enum(ComplaintStatus)),
})
export type UpdateComplaintRequestBody = Static<
    typeof UpdateComplaintRequestBody
>
