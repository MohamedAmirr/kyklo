import {
    EntityTarget,
    ObjectLiteral,
    Repository,
    SelectQueryBuilder,
} from 'typeorm'
import { databaseConnection } from '../database/database-connection'

/**
 * Convert camelCase object keys to snake_case.
 * @param obj The object with camelCase keys.
 * @returns A new object with snake_case keys.
 */
export function camelToSnakeCase<T extends ObjectLiteral>(obj: T): T {
    const newObj: Record<string, any> = {}
    for (const [key, value] of Object.entries(obj)) {
        const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
        newObj[snakeCaseKey] = value
    }
    return newObj as T
}

/**
 * Get a random entity from a TypeORM repository with optional filtering.
 * @param entity
 * @param entityName A friendly name for error messages (e.g., "School for category seeding").
 * @param where Optional filtering conditions (e.g., `{ schoolId: 'some-id' }`).
 * @returns A random entity or throws an error if no records match.
 */
export async function getRandomEntity<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    entityName: string,
    where?: Partial<T>
): Promise<T> {
    const repo = databaseConnection().getRepository(entity)
    let query: SelectQueryBuilder<T> = repo.createQueryBuilder()

    if (where) {
        const snakeCaseWhere = camelToSnakeCase(where)

        Object.entries(snakeCaseWhere).forEach(([key, value], index) => {
            const paramKey = `param${index}`
            query = query.andWhere(`${key} = :${paramKey}`, {
                [paramKey]: value,
            })
        })
    }

    const count = await query.getCount()
    if (count === 0) {
        throw new Error(
            `🚨 No records found in ${repo.metadata.name} (Needed for ${entityName})`
        )
    }

    const randomOffset = Math.floor(Math.random() * count)
    return query.skip(randomOffset).take(1).getOneOrFail()
}
