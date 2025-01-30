import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { entitiesMustBeOwnedByCurrentClassroom } from '../authentication/authorization'
import { teachingAssigmentController } from './teaching-assigment.controller'

export const teachingAssignmentModule: FastifyPluginAsyncTypebox =
    async app => {
        app.addHook('preSerialization', entitiesMustBeOwnedByCurrentClassroom)
        await app.register(teachingAssigmentController, {
            prefix: '/v1/teaching-assignment',
        })
    }
