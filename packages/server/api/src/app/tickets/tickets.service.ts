import { ErrorCode, NewTicket, PickUpError, puId, SeekPage, Ticket } from '@pickup/shared'
import { repoFactory } from '../core/db/repo-factory'
import { TicketsEntity } from './tickets.entity'

export const ticketsRepo = repoFactory(TicketsEntity)

export const ticketsService = {
    async create(params: CreateParams): Promise<Ticket> {
        const id = puId()
        const ticket: NewTicket = {
            ...params,
            id,
        }

        return ticketsRepo().save(ticket)
    },
    async closeTicket(id: string): Promise<Ticket> {
        const updateResult = await ticketsRepo().update({
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
        return ticketsRepo().findOneByOrFail({
            id,
        })
    },
    async openTicket(id: string): Promise<Ticket> {
        const updateResult = await ticketsRepo().update({
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
        return ticketsRepo().findOneByOrFail({
            id,
        })
    },
    async list(schoolId: string): Promise<SeekPage<Ticket>> {
        const tickets = await ticketsRepo().findBy({
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