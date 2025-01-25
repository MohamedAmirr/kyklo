import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { studentController } from './student.controller'

export const studentModule: FastifyPluginAsyncTypebox = async app => {
    await app.register(studentController, { prefix: '/api/v1/student' })
}
