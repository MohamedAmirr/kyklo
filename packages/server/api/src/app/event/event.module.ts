import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { EventController } from './event.controller';

export const eventModule: FastifyPluginAsyncTypebox = async (app) => {
    // Register the event controller with a prefix
    await app.register(EventController, { prefix: '/api/v1/events' });
};