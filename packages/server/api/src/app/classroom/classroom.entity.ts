import { Classroom, Student } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'

export type ClassroomSchema = Classroom & {
    students: Student[]
}

export const ClassroomEntity = new EntitySchema<ClassroomSchema>({
    name: 'classroom',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
        },
    },
    relations: {
        students: {
            type: 'one-to-many',
            target: 'student',
            inverseSide: 'classroom',
        },
    },
})
