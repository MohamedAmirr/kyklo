import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { FastifyRequest } from 'fastify'
import { ticketService } from './ticket.service'
import { newTicket } from '@pickup/shared'

export const ticketController: FastifyPluginAsyncTypebox = async (app) => {
    app.get('', async (request: FastifyRequest) => {
        // const tickets = await ticketService.list()
        // return tickets
    })
    app.post(
        '',
        {
            schema: {
                body: newTicket,
            },
        },
        async (request: FastifyRequest<{ Body: newTicket }>) => {
            await ticketService.create(request.body)
            return { message: 'Ticket created' }
        }
    )
    app.patch<{ Params: { id: string } }>(
        '/:id/close',
        async (request: FastifyRequest<{ Params: { id: string } }>) => {
            await ticketService.closeTicket(request.params.id)
            return { message: 'Ticket closed' }
        }
    )
    app.patch<{ Params: { id: string } }>(
        '/:id/open',
        async (request: FastifyRequest<{ Params: { id: string } }>) => {
            await ticketService.openTicket(request.params.id)
            return { message: 'Ticket opened' }
        }
    )
}
