import {Static, Type} from "@sinclair/typebox";
import {PaymentMethod} from "@pickup/shared";

export const CreateEventRequestBody = Type.Object({
    title: Type.String(),
    startDate: Type.Date(),
    imageUrls: Type.Array(Type.String()),
    description: Type.String(),
    price: Type.Union([Type.Number(), Type.Null()]),
    paymentMethod: Type.Optional(Type.Enum(PaymentMethod)),
    details: Type.Any(),
    grades: Type.Array(Type.String()),
    supervisorsIds: Type.Array(Type.String()),
});

export type CreateEventRequestBody = Static<typeof CreateEventRequestBody>
