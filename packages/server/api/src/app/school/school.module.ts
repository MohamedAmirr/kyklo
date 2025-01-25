import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { schoolController } from './school.controller'

export const schoolModule: FastifyPluginAsyncTypebox = async app => {
    await app.register(schoolController, { prefix: '/api/v1/school' })
}
