import {Static, Type} from "@sinclair/typebox";
import { BaseModelSchema } from "../common/base-model";

export enum PaymentMethod {
    CARD = 'Card',
    WALLET = 'Wallet',
    Cash = 'Cash',
}

export const Event = Type.Object({
    ...BaseModelSchema,
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

export type Event = Static<typeof Event>
