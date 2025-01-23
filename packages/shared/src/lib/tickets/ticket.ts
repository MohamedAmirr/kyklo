import {BaseModelSchema, PuId} from "@pickup/shared";
import {Static, Type} from "@sinclair/typebox";


export type TicketId = PuId
export type TicketCategoryId = PuId

export enum TicketStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}

export const TicketCategory = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
})

export type TicketCategory = Static<typeof TicketCategory>


export const Ticket = Type.Object({
    ...BaseModelSchema,
    title: Type.String(),
    status: Type.Enum(TicketStatus),
    number: Type.Number(),
    categoryId: Type.String(),
    reporterId: Type.String(),
    description: Type.String(),
    schoolId: Type.String(),
})
export type Ticket = Static<typeof Ticket>
