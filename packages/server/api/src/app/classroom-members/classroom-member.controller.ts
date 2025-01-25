import {
    ClassroomMemberWithUser,
    ListClassroomMembersRequestQuery,
    Permission,
    PrincipalType,
    SeekPage,
} from '@pickup/shared'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { StatusCodes } from 'http-status-codes'
import { classroomMemberService } from './classroom-member-service'

export const classroomMemberController: FastifyPluginAsyncTypebox =
    async app => {
        app.get('/', ListClassroomMembersRequestQueryOptions, async request => {
            return classroomMemberService.list(request.principal.classroomId)
        })
    }

const ListClassroomMembersRequestQueryOptions = {
    config: {
        allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
        permission: Permission.READ_CLASSROOM_MEMBER,
    },
    schema: {
        tags: ['classroom-members'],
        querystring: ListClassroomMembersRequestQuery,
        response: {
            [StatusCodes.OK]: SeekPage(ClassroomMemberWithUser),
        },
    },
}
