import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { categoryService } from './category.service'
import {
    PrincipalType,
    ListCategoriesRequestBody,
    CreateCategoryRequestBody,
    UpdateCategoryRequestBody,
} from '@pickup/shared'

export const categoryController: FastifyPluginAsyncTypebox = async app => {
    app.get('/', ListCategoriesParams, async request => {
        const schoolId = request.principal.school.id
        return await categoryService.list({
            type: request.query.type,
            schoolId,
        })
    })

    app.post('/', CreateCategoryParams, async request => {
        await categoryService.create({
            name: request.body.name,
            type: request.body.type,
            schoolId: request.principal.school.id,
        })
        return { message: 'Category created' }
    })

    app.post('/:id', UpdateCategoryParams, async request => {
        await categoryService.update({
            id: request.params.id,
            schoolId: request.principal.school.id,
        })

        return { message: 'Category updated' }
    })
}

const ListCategoriesParams = {
    config: {
        allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
    },
    schema: {
        querystring: ListCategoriesRequestBody,
    },
}

const CreateCategoryParams = {
    config: {
        allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
    },
    schema: {
        body: CreateCategoryRequestBody,
    },
}

const UpdateCategoryParams = {
    config: {
        allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
    },
    schema: {
        params: Type.Object({
            id: Type.String(),
        }),
        body: UpdateCategoryRequestBody,
    },
}
