import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { complaintsService } from './complaint.service'
import {
    CreateComplaintRequestBody,
    PrincipalType,
    ListComplaintsRequestQuery,
    UpdateComplaintRequestBody,
} from '@pickup/shared'

const DEFAULT_PAGING_LIMIT = 10

export const complaintsController: FastifyPluginAsyncTypebox = async app => {
    app.get('/', ListComplaintsParams, async request => {
        const schoolId = request.principal.school.id
        const complaints = await complaintsService.list({
            schoolId,
            cursor: request.query.cursor ?? null,
            limit: request.query.limit ?? DEFAULT_PAGING_LIMIT,
            status: request.query.status ?? null,
            title: request.query.title ?? null,
        })
        return complaints
    })

    app.post('/', CreateComplaintParams, async request => {
        await complaintsService.create({
            title: request.body.title,
            description: request.body.description,
            categoryId: request.body.categoryId,
            schoolId: request.principal.school.id,
            reporterId: request.principal.id,
        })
        return { message: 'Complaint created' }
    })

    app.post('/:id', UpdateComplaintParams, async request => {
        await complaintsService.update({
            id: request.params.id,
            schoolId: request.principal.school.id,
            status: request.body.status,
            categoryId: request.body.categoryId,
        })

        return { message: 'Complaint updated' }
    })
}

const ListComplaintsParams = {
    config: {
        allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
    },
    schema: {
        querystring: ListComplaintsRequestQuery,
    },
}

const CreateComplaintParams = {
    config: {
        allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
    },
    schema: {
        body: CreateComplaintRequestBody,
    },
}

const UpdateComplaintParams = {
    config: {
        allowedPrincipals: [PrincipalType.USER, PrincipalType.SERVICE],
    },
    schema: {
        params: Type.Object({
            id: Type.String(),
        }),
        body: UpdateComplaintRequestBody,
    },
}
