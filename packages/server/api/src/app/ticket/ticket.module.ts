import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { ticketController } from './ticket.controller'

export const ticketModule: FastifyPluginAsyncTypebox = async (app) => {
    await app.register(ticketController, { prefix: '/api/v1/ticket' })
}

