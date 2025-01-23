import { User, School } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'

export type SchoolSchema = School & {
    users: User[]
}

export const SchoolEntity = new EntitySchema<SchoolSchema>({
    name: 'school',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
        },
    },
    relations: {
        users: {
            type: 'one-to-many',
            target: 'user',
            inverseSide: 'school',
        },
    },
})
