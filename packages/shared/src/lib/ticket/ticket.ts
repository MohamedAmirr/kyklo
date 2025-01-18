import {BaseModelSchema, PuId, SchoolGrades, SchoolSemesters} from "@pickup/shared";
import {Static, Type} from "@sinclair/typebox";

export type TicketCategoryId = PuId

export const TicketCategory = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
})

export type TicketCategory = Static<typeof TicketCategory>

export type TicketId = PuId

export const Ticket = Type.Object({
    ...BaseModelSchema,
    title: Type.String(),
    status: Type.Enum({ open: 'open', closed: 'closed' }),
    categoryId: Type.String(),
    raisedById: Type.String(),
    description: Type.String(),
    schoolId: Type.String(),
})

export type Ticket = Static<typeof Ticket>
