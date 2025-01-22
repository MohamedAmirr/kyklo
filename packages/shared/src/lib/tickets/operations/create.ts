import {Static, Type } from "@sinclair/typebox";

export const NewTicket = Type.Object({
    title: Type.String(),
    categoryId: Type.String(),
    description: Type.String(),
})
export type NewTicket = Static<typeof NewTicket>