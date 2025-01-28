import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { subjectController } from './subject.controller'

export const subjectModule: FastifyPluginAsyncTypebox = async app => {
    app.register(subjectController, { prefix: '/api/v1/subject' })
}
