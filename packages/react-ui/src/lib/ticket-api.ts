import { ApiResponse, CreateTicketRequestBody, SeekPage, Ticket, TicketId, UpdateTicketRequestBody } from '@pickup/shared';

import { api } from '@/lib/api';

export const ticketApi = {
  get(request: { ticketId: string }): Promise<ApiResponse<Ticket>> {
    return api.get(`/v1/tickets`, request);
  },
  list(request?: {
    cursor?: string;
    limit?: number;
  }): Promise<ApiResponse<SeekPage<Ticket>>> {
    return api.get(`/v1/tickets`, request);
  },
  create(data: CreateTicketRequestBody): Promise<ApiResponse<Ticket>> {
    return api.post('/v1/tickets', data);
  },
  update(id: TicketId, data: UpdateTicketRequestBody): Promise<ApiResponse<Ticket>> {
    return api.post(`/v1/tickets/${id}`, data);
  },

};
