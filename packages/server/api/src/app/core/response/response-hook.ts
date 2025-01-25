import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorCode, SuccessCode } from '@pickup/shared'
import { StatusCodes } from 'http-status-codes'

export default function addGlobalResponseFormat(fastify: FastifyInstance) {
    fastify.addHook(
        'preSerialization',
        async (_request: FastifyRequest, reply: FastifyReply, payload) => {
            if (reply.statusCode < 300) {
                return {
                    success: true,
                    code: reply.responseCode || SuccessCode.SUCCESS,
                    data: payload,
                }
            } else {
                return {
                    success: false,
                    code: reply.responseCode || ErrorCode.SYSTEM_PROP_INVALID,
                    data: payload,
                }
            }
        }
    )
}
