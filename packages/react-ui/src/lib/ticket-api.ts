import { ApiResponse, NewTicket, SeekPage, Tickets } from '@pickup/shared';

import { api } from '@/lib/api';

export const ticketApi = {
  get(request: { ticketId: string }): Promise<ApiResponse<Tickets>> {
    return api.get(`/v1/tickets`, request);
  },
  list(request?: {
    cursor?: string;
    limit?: number;
  }): Promise<ApiResponse<SeekPage<Tickets>>> {
    return api.get(`/v1/tickets`, request);
  },
  create(data: NewTicket): Promise<ApiResponse<unknown>> {
    return api.post('/v1/tickets', data);
  },
  close(request: { id: string }) {
    return api.patch(`/v1/tickets/${request.id}/close`);
  },
  open(request: { id: string }) {
    return api.patch(`/v1/tickets/${request.id}/open`);
  },
};
