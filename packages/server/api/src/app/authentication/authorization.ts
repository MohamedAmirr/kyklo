import { ErrorCode, isObject, PickUpError } from '@pickup/shared'
import { preSerializationHookHandler } from 'fastify'

export function extractResourceName(url: string): string | undefined {
    const urlPath = url.split('?')[0]
    const resourceRegex = /\/v1\/(.+?)(\/|$)/
    const resourceMatch = urlPath.match(resourceRegex)
    const resource = resourceMatch ? resourceMatch[1] : undefined
    return resource
}

/**
 * Throws an authz error if response entities contain a `classroomId` property and
 * the `classroomId` property value does not match the principal's `classroomId`.
 * Otherwise, does nothing.
 */
export const entitiesMustBeOwnedByCurrentClassroom: preSerializationHookHandler<
    Payload | null
> = (request, _response, payload, done) => {
    request.log.trace(
        { payload, principal: request.principal, route: request.routeConfig },
        'entitiesMustBeOwnedByCurrentClassroom'
    )

    if (isObject(payload)) {
        const principalClassroomId = request.principal.classroomId
        let verdict: AuthzVerdict = 'ALLOW'

        if ('classroomId' in payload) {
            if (payload.classroomId !== principalClassroomId) {
                verdict = 'DENY'
            }
        } else if ('data' in payload && Array.isArray(payload.data)) {
            const someEntityNotOwnedByCurrentClassroom = payload.data.some(
                entity => {
                    return (
                        'classroomId' in entity &&
                        entity.classroomId !== principalClassroomId
                    )
                }
            )

            if (someEntityNotOwnedByCurrentClassroom) {
                verdict = 'DENY'
            }
        }

        if (verdict === 'DENY') {
            throw new PickUpError({
                code: ErrorCode.AUTHORIZATION,
                params: {
                    message: 'not owned by current classroom',
                },
            })
        }
    }

    done()
}

type SingleEntity = {
    classroomId?: string
}

type MultipleEntities = {
    data: SingleEntity[]
}

type Payload = SingleEntity | MultipleEntities

type AuthzVerdict = 'ALLOW' | 'DENY'
