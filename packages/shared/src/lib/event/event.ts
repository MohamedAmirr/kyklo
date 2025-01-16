import {Static, Type} from "@sinclair/typebox";
import {BaseModelSchema} from "@pickup/shared";
import {Teacher} from "../teacher";

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
    paymentMethod: Type.Union([Type.Enum(PaymentMethod), Type.Null()]),
    details: Type.Any(),
    grades: Type.Array(Type.String()),
    supervisor: Type.Array(Teacher),
});

export type Event = Static<typeof Event>
