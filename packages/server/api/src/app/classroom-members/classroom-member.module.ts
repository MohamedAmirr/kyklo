import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { entitiesMustBeOwnedByCurrentClassroom } from '../authentication/authorization'
import { classroomMemberController } from './classroom-member.controller'

export const classroomMemberModule: FastifyPluginAsyncTypebox = async app => {
    app.addHook('preSerialization', entitiesMustBeOwnedByCurrentClassroom)
    await app.register(classroomMemberController, {
        prefix: '/v1/classroom-members',
    })
}
