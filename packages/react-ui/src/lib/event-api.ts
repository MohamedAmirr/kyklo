import {api} from '@/lib/api';
import {
    Event
} from '@pickup/shared';

export const eventApi = {
    signIn(request: string) {
        return api.post<Event>(
            `/v1/events/${request}`,
            request
        );
    },
}
