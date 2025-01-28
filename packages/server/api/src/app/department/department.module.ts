import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { departmentController } from './department.controller'

export const departmentModule: FastifyPluginAsyncTypebox = async app => {
    await app.register(departmentController, { prefix: '/api/v1/department' })
}
