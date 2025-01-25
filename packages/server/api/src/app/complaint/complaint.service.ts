import {
    Cursor,
    spreadIfDefined,
    puId,
    SchoolId,
    SeekPage,
    Complaint,
    ComplaintCategoryId,
    ComplaintStatus,
    ComplaintId,
} from '@pickup/shared'
import { repoFactory } from '../core/db/repo-factory'
import { ComplaintsEntity } from './complaint.entity'
import { paginationHelper } from '../helper/pagination/pagination-utils'
import { buildPaginator } from '../helper/pagination/build-paginator'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Order } from '../helper/pagination/paginator'

dayjs.extend(duration)

export const complaintsRepo = repoFactory(ComplaintsEntity)

export const complaintsService = {
    async create({
        title,
        description,
        categoryId,
        schoolId,
    }: CreateParams): Promise<Complaint> {
        const number = (await complaintsRepo().count()) + 1
        const complaint = complaintsRepo().create({
            id: puId(),
            title,
            description,
            number,
            categoryId,
            schoolId,
            status: ComplaintStatus.OPEN,
            created: dayjs().toISOString(),
            updated: dayjs().toISOString(),
        })
        return complaintsRepo().save(complaint)
    },
    async list({
        schoolId,
        cursor,
        limit,
        status,
        title,
    }: ListParams): Promise<SeekPage<Complaint>> {
        const decodedCursor = paginationHelper.decodeCursor(cursor)
        const paginator = buildPaginator<Complaint>({
            entity: ComplaintsEntity,
            query: {
                limit: limit,
                order: Order.ASC,
                afterCursor: decodedCursor.nextCursor,
                beforeCursor: decodedCursor.previousCursor,
            },
        })

        let query = complaintsRepo()
            .createQueryBuilder('complaint')
            .where({ schoolId })

        if (status) {
            query = query.andWhere('complaint.status IN (:...status)', { status })
        }

        if (title) {
            query = query.andWhere('complaint.title ILIKE :title', { title })
        }

        const { data, cursor: newCursor } = await paginator.paginate(query)
        return paginationHelper.createPage<Complaint>(data, newCursor)
    },
    async update({
        id,
        schoolId,
        status,
        categoryId,
    }: UpdateParams): Promise<Complaint> {
        await complaintsRepo().update(
            { id, schoolId },
            {
                ...spreadIfDefined('status', status),
                ...spreadIfDefined('categoryId', categoryId),
            }
        )
        return complaintsRepo().findOneByOrFail({ id, schoolId })
    },
}

type ListParams = {
    schoolId: SchoolId
    cursor: Cursor | null
    limit: number
    status: ComplaintStatus[] | null
    title: string | null
}

type CreateParams = {
    title: string
    description: string
    categoryId: ComplaintCategoryId
    schoolId: SchoolId
}

type UpdateParams = {
    id: ComplaintId
    schoolId: SchoolId
    status?: ComplaintStatus
    categoryId?: ComplaintCategoryId
}
