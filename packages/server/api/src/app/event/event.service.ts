import {
    ErrorCode,
    PickUpError,
    puId,
    SeekPage,
    Event,
    PaymentMethod,
    User, CreateEventRequestBody,
} from '@pickup/shared';
import dayjs from 'dayjs';
import { repoFactory } from '../core/db/repo-factory';
import { EventEntity } from './event.entity';

export const eventRepo = repoFactory(EventEntity);

export class EventService {
    async create(params: CreateEventRequestBody): Promise<Event> {
        const event: Event = {
            id: puId(),
            created: dayjs().toISOString(),
            updated: dayjs().toISOString(),
            ...params,
        };

        return eventRepo().save(event);
    }

    // async update(id: string, params: UpdateParams): Promise<Event> {
    //     const updateResult = await eventRepo().update(
    //         { id },
    //         {
    //             ...params,
    //             updated: dayjs().toISOString(),
    //         },
    //     );
    //
    //     if (updateResult.affected !== 1) {
    //         throw new PickUpError({
    //             code: ErrorCode.ENTITY_NOT_FOUND,
    //             params: {
    //                 entityType: 'event',
    //                 entityId: id,
    //             },
    //         });
    //     }
    //
    //     return eventRepo().findOneByOrFail({ id });
    // }
    
    async list(page: number = 1, limit: number = 8): Promise<SeekPage<Event>> {
        const skip = (page - 1) * limit;
    
        const [events, total] = await eventRepo().findAndCount({
            relations: ['supervisors'],
            skip,
            take: limit
        });
    
        return {
            data: events,
            next: total > page * limit ? (page + 1).toString() : null,
            previous: page > 1 ? (page - 1).toString() : null,
            total
        };
    }
    
    async get(id: string): Promise<Event | null> {
        return eventRepo().findOneBy({ id });
    }
    //
    // async getOneOrFail(id: string): Promise<Event> {
    //     const event = await eventRepo().findOneBy({ id });
    //     if (!event) {
    //         throw new PickUpError({
    //             code: ErrorCode.ENTITY_NOT_FOUND,
    //             params: {
    //                 entityType: 'event',
    //                 entityId: id,
    //             },
    //         });
    //     }
    //     return event;
    // }
    //
    // async delete(id: string): Promise<void> {
    //     const deleteResult = await eventRepo().delete({ id });
    //     if (deleteResult.affected !== 1) {
    //         throw new PickUpError({
    //             code: ErrorCode.ENTITY_NOT_FOUND,
    //             params: {
    //                 entityType: 'event',
    //                 entityId: id,
    //             },
    //         });
    //     }
    // }
}