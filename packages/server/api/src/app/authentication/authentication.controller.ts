import {AppSystemProp, system} from '@pickup/server-shared'
import {ALL_PRINCIPAL_TYPES, AuthenticationResponse, SignInRequest,} from '@pickup/shared'
import {RateLimitOptions} from '@fastify/rate-limit'
import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox'
import {authenticationService} from './authentication-service'

export const authenticationController: FastifyPluginAsyncTypebox = async (
    app,
):Promise<void> => {
    app.post('/sign-in', SignInRequestOptions, async (request):Promise<AuthenticationResponse> => {
        return await authenticationService.signIn({
            email: request.body.email,
            password: request.body.password,
        })
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
