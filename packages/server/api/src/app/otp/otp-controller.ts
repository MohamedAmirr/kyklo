import { ALL_PRINCIPAL_TYPES, assertNotNullOrUndefined, CreateOtpRequestBody } from '@pickup/shared'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { StatusCodes } from 'http-status-codes'
import { otpService } from './otp-service'
import { schoolService } from '../school/school.service'

export const otpController: FastifyPluginAsyncTypebox = async (app) => {
    app.post('/', CreateOtpRequest, async (req, res) => {
        const schoolId = req.principal.school.id
        assertNotNullOrUndefined(schoolId, 'schoolId')
        await otpService.createAndSend({
            schoolId,
            email: req.body.email,
            type: req.body.type,
        })
        return res.code(StatusCodes.NO_CONTENT).send()
    })
}

const CreateOtpRequest = {
    config: {
        allowedPrincipals: ALL_PRINCIPAL_TYPES,
    },
    schema: {
        body: CreateOtpRequestBody,
    },
}
