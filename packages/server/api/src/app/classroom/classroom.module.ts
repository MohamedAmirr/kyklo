import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { classroomController } from './classroom.controller'

export const classroomModule: FastifyPluginAsyncTypebox = async app => {
    await app.register(classroomController, { prefix: '/api/v1/classroom' })
}
