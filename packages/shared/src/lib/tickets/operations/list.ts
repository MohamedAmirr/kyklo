import { Static, Type } from "@sinclair/typebox";

export const ListTicketsRequest = Type.Object({
    limit: Type.Optional(Type.Number()),
    cursor: Type.Optional(Type.String()),
})
export type ListTicketsRequest = Static<typeof ListTicketsRequest>