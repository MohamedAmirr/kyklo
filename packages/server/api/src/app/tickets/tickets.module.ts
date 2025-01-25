import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { ticketsController } from './tickets.controller'

export const ticketsModule: FastifyPluginAsyncTypebox = async app => {
    await app.register(ticketsController, { prefix: '/api/v1/tickets' })
}
