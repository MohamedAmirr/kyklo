import { BaseModelSchema, PuId } from '@pickup/shared'
import { Static, Type } from '@sinclair/typebox'

export type CategoryId = PuId
export enum CategoryType {
    COMPLAINT = 'COMPLAINT',
}

export const Category = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
    type: Type.Enum(CategoryType),
    schoolId: Type.String(),
})

export type Category = Static<typeof Category>
