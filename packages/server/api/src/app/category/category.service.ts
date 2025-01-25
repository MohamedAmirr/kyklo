import {
    spreadIfDefined,
    puId,
    SchoolId,
    Category,
    CategoryType,
    CategoryId,
} from '@pickup/shared'
import { repoFactory } from '../core/db/repo-factory'
import { CategoriesEntity } from './category.entity'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Equal } from 'typeorm'

dayjs.extend(duration)

export const categoriesRepo = repoFactory(CategoriesEntity)

export const categoryService = {
    async getOneOrThrow({ id }: { id: CategoryId }): Promise<Category> {
        return categoriesRepo().findOneByOrFail({ id })
    },
    async create({
        name,
        type,
        schoolId,
    }: CreateParams): Promise<Category> {
        const category = categoriesRepo().create({
            id: puId(),
            name,
            type,
            schoolId,
            created: dayjs().toISOString(),
            updated: dayjs().toISOString(),
        })
        return categoriesRepo().save(category)
    },
    async list({ schoolId }: ListParams): Promise<Category[]> {
        const categories = await categoriesRepo().find({
            where: {
                schoolId: Equal(schoolId),
            },
            order: {
                created: 'ASC',
            },
        })

        return categories
    },
    async update({
        id,
        schoolId,
        name,
    }: UpdateParams): Promise<Category> {
        await categoriesRepo().update(
            { id, schoolId },
            {
                ...spreadIfDefined('name', name),
            }
        )
        return categoriesRepo().findOneByOrFail({ id, schoolId })
    },
}

type ListParams = {
    schoolId: SchoolId
    type: CategoryType | null
}

type CreateParams = {
    name: string
    type: CategoryType
    schoolId: SchoolId
}

type UpdateParams = {
    id: CategoryId
    schoolId: SchoolId
    name?: string
}
