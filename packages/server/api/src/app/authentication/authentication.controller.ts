import { AppSystemProp, system } from '@pickup/server-shared'
import {
    AuthenticationResponse,
    SignInRequest,
    SuccessCode,
    SwitchClassroomRequest,
} from '@pickup/shared'
import { RateLimitOptions } from '@fastify/rate-limit'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { authenticationService } from './authentication-service'

export const authenticationController: FastifyPluginAsyncTypebox =
    async app => {
        app.post(
            '/sign-in',
            SignInRequestOptions,
            async (request, reply): Promise<AuthenticationResponse> => {
                reply.responseCode = SuccessCode.USER_LOGGED_IN
                return await authenticationService.signIn({
                    email: request.body.email,
                    password: request.body.password,
                })
            }
        )

        app.post(
            '/switch-classroom',
            SwitchClassroomRequestOptions,
            async request => {
                return authenticationService.switchClassroom({
                    userId: request.principal.id,
                    schoolId: request.principal.school.id,
                    classroomId: request.body.classroomId,
                })
            }
        )
    }

const rateLimitOptions: RateLimitOptions = {
    max: Number.parseInt(
        system.getOrThrow(AppSystemProp.API_RATE_LIMIT_AUTHN_MAX),
        10
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

const SwitchClassroomRequestOptions = {
    config: {
        rateLimit: rateLimitOptions,
    },
    schema: {
        body: SwitchClassroomRequest,
    },
}
