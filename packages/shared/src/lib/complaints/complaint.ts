import { BaseModelSchema, PuId } from '@pickup/shared'
import { Static, Type } from '@sinclair/typebox'

export type ComplaintId = PuId
export type ComplaintCategoryId = PuId

export enum ComplaintStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}

export const ComplaintCategory = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
})

export type ComplaintCategory = Static<typeof ComplaintCategory>

export const Complaint = Type.Object({
    ...BaseModelSchema,
    title: Type.String(),
    status: Type.Enum(ComplaintStatus),
    number: Type.Number(),
    categoryId: Type.String(),
    reporterId: Type.String(),
    description: Type.String(),
    schoolId: Type.String(),
})
export type Complaint = Static<typeof Complaint>
