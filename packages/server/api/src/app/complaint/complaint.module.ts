import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { complaintsController } from './complaint.controller'

export const complaintsModule: FastifyPluginAsyncTypebox = async app => {
    await app.register(complaintsController, { prefix: '/api/v1/complaints' })
}
