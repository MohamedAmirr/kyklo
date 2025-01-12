import { ErrorCode, PickUpError, PrincipalType } from '@pickup/shared'
import { FastifyRequest } from 'fastify'
import { requestUtils } from '../../request/request-utils'
import { BaseSecurityHandler } from '../security-handler'

export class ProjectAuthzHandler extends BaseSecurityHandler {
    private static readonly IGNORED_ROUTES = [
        '/v1/users/classrooms/:classroomId/token',
        // This works for both platform and project, we have to check this manually
        '/v1/user-invitations',
    ]

    protected canHandle(request: FastifyRequest): Promise<boolean> {
        const requestMatches = !ProjectAuthzHandler.IGNORED_ROUTES.includes(
            request.routerPath,
        )
        return Promise.resolve(requestMatches)
    }

    protected doHandle(request: FastifyRequest): Promise<void> {
        const classroomId = requestUtils.extractClassroomId(request)

        if (classroomId && classroomId !== request.principal.classroomId) {
            throw new PickUpError({
                code: ErrorCode.AUTHORIZATION,
                params: {
                    message: 'invalid classroom id',
                },
            })
        }

        return Promise.resolve()
    }
}
