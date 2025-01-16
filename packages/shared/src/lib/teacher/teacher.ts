import {Static, Type} from "@sinclair/typebox";
import {BaseModelSchema} from "@pickup/shared";

export const Teacher = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
    age: Type.Number(),
    subjects: Type.Array(Type.String()),
});

export type Teacher = Static<typeof Teacher>
