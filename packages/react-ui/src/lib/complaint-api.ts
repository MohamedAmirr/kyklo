import {
    ApiResponse,
    CreateComplaintRequestBody,
    ListComplaintsRequestQuery,
    SeekPage,
    Complaint,
    ComplaintId,
    UpdateComplaintRequestBody,
    ComplaintEnriched,
} from '@pickup/shared'

import { api } from '@/lib/api'

export const complaintApi = {
    get(request: { complaintId: string }): Promise<ApiResponse<Complaint>> {
        return api.get(`/v1/complaints`, request)
    },
    list(request: ListComplaintsRequestQuery): Promise<ApiResponse<SeekPage<ComplaintEnriched>>> {
        return api.get(`/v1/complaints`, request)
    },
    create(data: CreateComplaintRequestBody): Promise<ApiResponse<Complaint>> {
        return api.post('/v1/complaints', data)
    },
    update(
        id: ComplaintId,
        data: UpdateComplaintRequestBody
    ): Promise<ApiResponse<Complaint>> {
        return api.post(`/v1/complaints/${id}`, data)
    },
}
