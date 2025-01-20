import {Static, Type } from "@sinclair/typebox";

export const NewTicket = Type.Object({
    id: Type.String(),
    title: Type.String(),
    categoryId: Type.String(),
    raisedById: Type.String(),
    description: Type.String(),
})
export type NewTicket = Static<typeof NewTicket>