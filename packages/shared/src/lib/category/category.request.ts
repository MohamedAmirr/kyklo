import { Static, Type } from '@sinclair/typebox'
import { CategoryType } from './category'

export const ListCategoriesRequestBody = Type.Object({
    type: Type.Enum(CategoryType),
})
export type ListCategoriesRequestBody = Static<typeof ListCategoriesRequestBody>

export const CreateCategoryRequestBody = Type.Object({
    name: Type.String(),
    type: Type.Enum(CategoryType),
})
export type CreateCategoryRequestBody = Static<typeof CreateCategoryRequestBody>

export const UpdateCategoryRequestBody = Type.Object({
    name: Type.Optional(Type.String()),
})
export type UpdateCategoryRequestBody = Static<typeof UpdateCategoryRequestBody>
