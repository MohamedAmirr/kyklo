import { NewTicket } from '@pickup/shared';

import { api } from '@/lib/api';

export const ticketApi = {
  get(request: { ticketId: string }) {
    return api.get(`/v1/tickets`, request);
  },
  list() {
    return api.get(`/v1/tickets`);
  },
  create(request: NewTicket) {
    return api.post('/v1/tickets', request);
  },
  close(request: { id: string }) {
    return api.patch(`/v1/tickets/${request.id}/close`);
  },
  open(request: { id: string }) {
    return api.patch(`/v1/tickets/${request.id}/open`);
  },
};
