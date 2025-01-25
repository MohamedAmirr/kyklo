import {
    Cursor,
    spreadIfDefined,
    puId,
    SchoolId,
    SeekPage,
    Ticket,
    TicketCategoryId,
    TicketStatus,
    TicketId,
} from '@pickup/shared'
import { repoFactory } from '../core/db/repo-factory'
import { TicketsEntity } from './tickets.entity'
import { paginationHelper } from '../helper/pagination/pagination-utils'
import { buildPaginator } from '../helper/pagination/build-paginator'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Order } from '../helper/pagination/paginator'

dayjs.extend(duration)

export const ticketsRepo = repoFactory(TicketsEntity)

export const ticketsService = {
    async create({
        title,
        description,
        categoryId,
        schoolId,
    }: CreateParams): Promise<Ticket> {
        const number = (await ticketsRepo().count()) + 1
        const ticket = ticketsRepo().create({
            id: puId(),
            title,
            description,
            number,
            categoryId,
            schoolId,
            status: TicketStatus.OPEN,
            created: dayjs().toISOString(),
            updated: dayjs().toISOString(),
        })
        return ticketsRepo().save(ticket)
    },
    async list({
        schoolId,
        cursor,
        limit,
    }: ListParams): Promise<SeekPage<Ticket>> {
        const decodedCursor = paginationHelper.decodeCursor(cursor)
        const paginator = buildPaginator<Ticket>({
            entity: TicketsEntity,
            query: {
                limit: limit,
                order: Order.ASC,
                afterCursor: decodedCursor.nextCursor,
                beforeCursor: decodedCursor.previousCursor,
            },
        })

        let query = ticketsRepo()
            .createQueryBuilder('ticket')
            .where({ schoolId })

        const { data, cursor: newCursor } = await paginator.paginate(query)
        return paginationHelper.createPage<Ticket>(data, newCursor)
    },
    async update({
        id,
        schoolId,
        status,
        categoryId,
    }: UpdateParams): Promise<Ticket> {
        await ticketsRepo().update(
            { id, schoolId },
            {
                ...spreadIfDefined('status', status),
                ...spreadIfDefined('categoryId', categoryId),
            }
        )
        return ticketsRepo().findOneByOrFail({ id, schoolId })
    },
}

type ListParams = {
    schoolId: SchoolId
    cursor: Cursor | null
    limit: number
}

type CreateParams = {
    title: string
    description: string
    categoryId: TicketCategoryId
    schoolId: SchoolId
}

type UpdateParams = {
    id: TicketId
    schoolId: SchoolId
    status?: TicketStatus
    categoryId?: TicketCategoryId
}
