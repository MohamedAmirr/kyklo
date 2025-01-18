import {Static, Type } from "@sinclair/typebox";

export const newTicket = Type.Object({
    title: Type.String(),
    categoryId: Type.String(),
    raisedById: Type.String(),
    description: Type.String(),
})
export type newTicket = Static<typeof newTicket>