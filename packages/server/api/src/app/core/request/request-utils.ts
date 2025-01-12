import { isObject } from '@pickup/shared'
import { FastifyRequest } from 'fastify'

export const requestUtils = {
    extractClassroomId(request: FastifyRequest): string | undefined {
        if (isObject(request.body) && 'classroomId' in request.body) {
            return request.body.classroomId as string
        }
        else if (isObject(request.query) && 'classroomId' in request.query) {
            return request.query.classroomId as string
        }

        return undefined
    },
}
