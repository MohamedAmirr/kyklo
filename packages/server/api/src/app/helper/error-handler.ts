import { exceptionHandler } from '@pickup/server-shared'
import { ErrorCode, PickUpError } from '@pickup/shared'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'


export const errorHandler = async (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
): Promise<void> => {
    if (error instanceof PickUpError) {
        const statusCodeMap: Partial<Record<ErrorCode, StatusCodes>> = {
            [ErrorCode.INVALID_BEARER_TOKEN]: StatusCodes.UNAUTHORIZED,
            [ErrorCode.FEATURE_DISABLED]: StatusCodes.PAYMENT_REQUIRED,
            [ErrorCode.PERMISSION_DENIED]: StatusCodes.FORBIDDEN,
            [ErrorCode.ENTITY_NOT_FOUND]: StatusCodes.NOT_FOUND,
            [ErrorCode.EXISTING_USER]: StatusCodes.CONFLICT,
            [ErrorCode.EXISTING_ALERT_CHANNEL]: StatusCodes.CONFLICT,
            [ErrorCode.AUTHORIZATION]: StatusCodes.FORBIDDEN,
            [ErrorCode.INVALID_CREDENTIALS]: StatusCodes.UNAUTHORIZED,
            [ErrorCode.SESSION_EXPIRED]: StatusCodes.FORBIDDEN,
            [ErrorCode.EMAIL_IS_NOT_VERIFIED]: StatusCodes.FORBIDDEN,
            [ErrorCode.USER_IS_INACTIVE]: StatusCodes.FORBIDDEN,
            [ErrorCode.EMAIL_AUTH_DISABLED]: StatusCodes.FORBIDDEN,
            [ErrorCode.INVALID_OTP]: StatusCodes.GONE,
            [ErrorCode.VALIDATION]: StatusCodes.CONFLICT,
            [ErrorCode.AUTHENTICATION]: StatusCodes.UNAUTHORIZED,
            [ErrorCode.INVALID_LICENSE_KEY]: StatusCodes.BAD_REQUEST,
            [ErrorCode.EMAIL_ALREADY_HAS_ACTIVATION_KEY]: StatusCodes.CONFLICT,
        }
        const statusCode =
      statusCodeMap[error.error.code] ?? StatusCodes.BAD_REQUEST

        await reply.status(statusCode).send({
            code: error.error.code,
            params: error.error.params,
        })
    }
    else {
        request.log.error('[errorHandler]: ' + JSON.stringify(error))
        if (
            !error.statusCode ||
      error.statusCode === StatusCodes.INTERNAL_SERVER_ERROR.valueOf()
        ) {
            exceptionHandler.handle(error)
        }
        await reply
            .status(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
            .send(error)
    }
}
