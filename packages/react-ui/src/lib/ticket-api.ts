import { NewTicket } from '@pickup/shared';

import { api } from '@/lib/api';

export const ticketApi = {
  get(request: { ticketId: string }) {
    return api.get(`/v1/ticket`, request);
  },
  list() {
    return api.get(`/v1/ticket`);
  },
  create(request: NewTicket) {
    return api.post('/v1/ticket', request);
  },
  close(request: { id: string }) {
    return api.patch(`/v1/ticket/${request.id}/close`);
  },
  open(request: { id: string }) {
    return api.patch(`/v1/ticket/${request.id}/open`);
  },
};
