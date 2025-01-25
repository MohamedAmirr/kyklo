import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { categoryController } from './category.controller'

export const categoryModule: FastifyPluginAsyncTypebox = async app => {
    await app.register(categoryController, { prefix: '/api/v1/categories' })
}

