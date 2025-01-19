import { ErrorCode, NewTicket, PickUpError, puId, SeekPage, Ticket } from '@pickup/shared'
import { repoFactory } from '../core/db/repo-factory'
import { TicketEntity } from './ticket.entity'

export const ticketRepo = repoFactory(TicketEntity)

export const ticketService = {
    async create(params: CreateParams): Promise<Ticket> {
        const id = puId()
        const ticket: NewTicket = {
            ...params,
            id,
        }

        return ticketRepo().save(ticket)
    },
    async closeTicket(id: string): Promise<Ticket> {
        const updateResult = await ticketRepo().update({
            id,
        }, {
            status: 'closed',
        })

        if (updateResult.affected !== 1) {
            throw new PickUpError({
                code: ErrorCode.ENTITY_NOT_FOUND,
                params: {
                    entityType: 'ticket',
                    entityId: id,
                },
            })
        }
        return ticketRepo().findOneByOrFail({
            id,
        })
    },
    async openTicket(id: string): Promise<Ticket> {
        const updateResult = await ticketRepo().update({
            id,
        }, {
            status: 'open',
        })

        if (updateResult.affected !== 1) {
            throw new PickUpError({
                code: ErrorCode.ENTITY_NOT_FOUND,
                params: {
                    entityType: 'ticket',
                    entityId: id,
                },
            })
        }
        return ticketRepo().findOneByOrFail({
            id,
        })
    },
    async list(schoolId: string): Promise<SeekPage<Ticket>> {
        const tickets = await ticketRepo().findBy({
            schoolId,
        })

        return {
            data: tickets,
            next: null,
            previous: null,
        }
    },
}

type CreateParams = NewTicket