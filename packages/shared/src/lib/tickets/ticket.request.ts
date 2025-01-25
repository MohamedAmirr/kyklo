import { Static, Type } from '@sinclair/typebox'
import { TicketStatus } from './ticket'

export const ListTicketsRequestQuery = Type.Object({
    limit: Type.Optional(Type.Number()),
    cursor: Type.Optional(Type.String()),
})
export type ListTicketsRequestQuery = Static<typeof ListTicketsRequestQuery>

export const CreateTicketRequestBody = Type.Object({
    title: Type.String(),
    categoryId: Type.String(),
    description: Type.String(),
})
export type CreateTicketRequestBody = Static<typeof CreateTicketRequestBody>

export const UpdateTicketRequestBody = Type.Object({
    categoryId: Type.Optional(Type.String()),
    status: Type.Optional(Type.Enum(TicketStatus)),
})
export type UpdateTicketRequestBody = Static<typeof UpdateTicketRequestBody>
