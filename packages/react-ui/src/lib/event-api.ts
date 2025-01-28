import { Event } from '@pickup/shared'

import { api } from '@/lib/api'

export const eventApi = {
    signIn(request: string) {
        return api.post<Event>(`/v1/events/${request}`, request)
    },
}
