import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { EventService } from './event.service'
import {
    CreateEventRequestBody,
    GetEventRequestBody,
    PaymentMethod,
} from '@pickup/shared'
import { FastifyRequest } from 'fastify'
import { User, Event } from '@pickup/shared'

const eventService = new EventService()

export const EventController: FastifyPluginAsyncTypebox = async app => {
    // Create a new event
    app.post(
        '/create',
        async (request: FastifyRequest<{ Body: CreateEventRequestBody }>) => {
            const eventData = request.body

            if (!eventData.title || !eventData.supervisorsIds) {
                throw new Error('Title and supervisors are required')
            }

            return await eventService.create(eventData)
        }
    )

    app.get(
        '/list/:page',
        async (request: FastifyRequest<{ Params: { page: number } }>) => {
            const page = request.params.page

            const events = await eventService.list(page)
            return events
        }
    )

    //   Get event by ID
    app.get(
        '/:id',
        async (request: FastifyRequest<{ Params: { id: string } }>) => {
            const eventId = request.params.id
            if (!eventId) {
                throw new Error('Event ID is required')
            }

            const event = await eventService.get(eventId!)
            if (!event) {
                throw new Error('Event not found')
            }

            return event
        }
    )
}

// // Update an event
// app.put(
//     '/:id',
//     {
//         schema: {
//             params: eventParamsSchema,
//         },
//     },
//     async (request) => {
//         const eventId = request.principal.id;
//         const eventData = request.principal;
//
//         if (!eventId) {
//             throw new Error('Event ID is required');
//         }
//
//         const updatedEvent = await eventService.update(eventId, eventData);
//         return updatedEvent;
//     }
// );
//
// // Delete an event
// app.delete(
//     '/:id',
//     {
//         schema: {
//             params: eventParamsSchema,
//         },
//     },
//     async (request: FastifyRequest) => {
//         const eventId = request.principal.id;
//
//         if (!eventId) {
//             throw new Error('Event ID is required');
//         }
//
//         await eventService.delete(eventId);
//         return {message: 'Event deleted successfully'};
//     }
// );
//
// };
