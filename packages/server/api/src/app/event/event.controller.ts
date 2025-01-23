import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox';
import {Type} from '@sinclair/typebox';
import {EventService} from './event.service';
import {CreateEventRequestBody, PaymentMethod} from "@pickup/shared";
import {FastifyRequest} from "fastify";
import {User, Event} from "@pickup/shared";

const eventService = new EventService();

const eventParamsSchema = {
    params: Type.Object({
        id: Type.String(),
    }),
};

const eventQuerySchema = {
    querystring: Type.Object({
        page: Type.Number({default: 1}),
        limit: Type.Number({default: 6}),
    }),
};

export const EventController: FastifyPluginAsyncTypebox = async (app) => {
    // Create a new event
    app.post('/create', async (request: FastifyRequest<{ Body: CreateEventRequestBody }>) => {

            const eventData = request.body;

            if (!eventData.title || !eventData.supervisorsIds) {
                throw new Error('Title and supervisors are required');
            }

            return await eventService.create(eventData);
        }
    );

    // // Get event by ID
    // app.get('/:id', async (request: FastifyRequest) => {
    //         const eventId = request.principal.id;
    //         if (!eventId) {
    //             throw new Error('Event ID is required');
    //         }
    //
    //         const event = await eventService.get(eventId);
    //         if (!event) {
    //             throw new Error('Event not found');
    //         }
    //
    //         return event;
    //     }
    // );
    //
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
    // // List all events with pagination
    // app.get<{ Querystring: { page: number; limit: number } }>(
    //     '/list',
    //     {
    //         schema: {
    //             querystring: eventQuerySchema,
    //         },
    //     },
    //     async (request: FastifyRequest<{ Querystring: { page: number; limit: number } }>) => {
    //         const {page, limit} = request.query;
    //         return await eventService.list(page, limit);
    //     }
    // );
};