import { AppSystemProp, system } from '@pickup/server-shared'
import {
    ALL_PRINCIPAL_TYPES,
    SignInRequest,
    ApplicationEventName,
} from '@pickup/shared'
import { RateLimitOptions } from '@fastify/rate-limit'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { eventsHooks } from '../helper/application-events'
import { authenticationService } from './authentication-service'

export const authenticationController: FastifyPluginAsyncTypebox = async (
    app,
) => {
    app.post('/sign-in', SignInRequestOptions, async (request) => {
        const response = await authenticationService.signIn({
            email: request.body.email,
            password: request.body.password,
        });

        eventsHooks.get().sendUserEvent({
            userId: response.id,
            ip: request.ip,
        }, {
            action: ApplicationEventName.USER_SIGNED_IN,
            data: {},
        })

        return response
    })
}

const rateLimitOptions: RateLimitOptions = {
    max: Number.parseInt(
        system.getOrThrow(AppSystemProp.API_RATE_LIMIT_AUTHN_MAX),
        10,
    ),
    timeWindow: system.getOrThrow(AppSystemProp.API_RATE_LIMIT_AUTHN_WINDOW),
}

const SignInRequestOptions = {
    config: {
        allowedPrincipals: ALL_PRINCIPAL_TYPES,
        rateLimit: rateLimitOptions,
    },
    schema: {
        body: SignInRequest,
    },
}
