import { puId, isNil, Principal, PrincipalType } from '@pickup/shared'
import { FastifyRequest } from 'fastify'
import { BaseSecurityHandler } from '../security-handler'

export class AnonymousAuthnHandler extends BaseSecurityHandler {
    protected canHandle(_request: FastifyRequest): Promise<boolean> {
        return Promise.resolve(true)
    }

    protected doHandle(request: FastifyRequest): Promise<void> {
        const principal = request.principal as Principal | undefined

        if (isNil(principal)) {
            request.principal = {
                id: `ANONYMOUS_${puId()}`,
                type: PrincipalType.UNKNOWN,
                classroomId: `ANONYMOUS_${puId()}`,
                school: {
                    id: `ANONYMOUS_${puId()}`,
                },
            }
        }

        return Promise.resolve()
    }
}
