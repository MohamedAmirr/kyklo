import { AuthenticationEvent, ClassroomRoleEvent } from '@pickup/shared'
import { Static, Type } from '@sinclair/typebox'
import { FastifyRequest } from 'fastify'

export const AuditEventParam = Type.Pick(Type.Union([
    AuthenticationEvent,
    ClassroomRoleEvent,
]), ['data', 'action'])
export type AuditEventParam = Static<typeof AuditEventParam>


let hooks: ApplicationEventHooks = {
    async sendUserEvent(_requestInformation, _params) {
        return
    },
    async sendUserEventFromRequest(_request, _params) {
        return
    },
}

export const eventsHooks = {
    set(newHooks: ApplicationEventHooks): void {
        hooks = newHooks
    },

    get(): ApplicationEventHooks {
        return hooks
    },
}

export type ApplicationEventHooks = {
    sendUserEvent(requestInformation: MetaInformation, params: AuditEventParam): void
    sendUserEventFromRequest(request: FastifyRequest, params: AuditEventParam): void
}

type MetaInformation = {
    platformId: string
    userId: string
    classroomId: string
    ip: string
}
