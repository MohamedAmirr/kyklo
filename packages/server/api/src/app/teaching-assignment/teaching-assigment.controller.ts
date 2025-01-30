import {
    TeachingAssignmentWithUser,
    ListTeachingAssignmentRequestQuery,
    Permission,
    PrincipalType,
    SeekPage,
} from '@pickup/shared'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { StatusCodes } from 'http-status-codes'
import { teachingAssignmentService } from './teaching-assignment.service'

export const teachingAssigmentController: FastifyPluginAsyncTypebox =
    async app => {
        app.get(
            '/',
            ListTeachingAssignmentsRequestQueryOptions,
            async request => {
                return teachingAssignmentService.list(
                    request.principal.classroomId
                )
            }
        )
    }

const ListTeachingAssignmentsRequestQueryOptions = {
    config: {
        allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
        permission: Permission.READ_CLASSROOM_MEMBER,
    },
    schema: {
        tags: ['teaching-assignment'],
        querystring: ListTeachingAssignmentRequestQuery,
        response: {
            [StatusCodes.OK]: SeekPage(TeachingAssignmentWithUser),
        },
    },
}
