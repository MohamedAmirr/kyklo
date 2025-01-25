import { BaseModelSchema, Category, PuId, UserMeta } from '@pickup/shared'
import { Static, Type } from '@sinclair/typebox'

export type ComplaintId = PuId
export enum ComplaintStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}

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

export const ComplaintEnriched = Type.Composite([Complaint, Type.Object({
    user: UserMeta,
    category: Category,
})])

export type ComplaintEnriched = Static<typeof ComplaintEnriched>
