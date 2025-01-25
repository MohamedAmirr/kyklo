import {
    ApiResponse,
    UpdateCategoryRequestBody,
    ListCategoriesRequestBody,
    Category,
    CreateCategoryRequestBody,
} from '@pickup/shared'

import { api } from '@/lib/api'

export const categoryApi = {
    list(request: ListCategoriesRequestBody): Promise<ApiResponse<Category[]>> {
        return api.get(`/v1/categories`, request)
    },
    create(data: CreateCategoryRequestBody): Promise<ApiResponse<Category>> {
        return api.post('/v1/categories', data)
    },
    update(id: string, data: UpdateCategoryRequestBody): Promise<ApiResponse<Category>> {
        return api.post(`/v1/categories/${id}`, data)
    },
}
