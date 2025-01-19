import {AppSystemProp, system} from '@pickup/server-shared'
import {
    AuthenticationResponse,
    SignInRequest,
    SuccessCodes,
} from "@pickup/shared";
import {RateLimitOptions} from '@fastify/rate-limit'
import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox'
import {authenticationService} from './authentication-service'
import { FastifyReply, FastifyRequest } from "fastify";

export const authenticationController: FastifyPluginAsyncTypebox = async (
    app,
) => {
    app.post('/sign-in',  SignInRequestOptions, async (request:FastifyRequest<{ Body: SignInRequest }>,reply: FastifyReply):Promise<AuthenticationResponse> => {
        reply.responseCode = SuccessCodes.USER_LOGGED_IN
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
        rateLimit: rateLimitOptions,
    },
    schema: {
        body: SignInRequest,
    },
}
