import { Classroom, Student, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'

export type StudentSchema = Student & {
    classroom: Classroom,
    user: User
}

export const StudentEntity = new EntitySchema<StudentSchema>({
    name: 'student',
    columns: {
        ...BaseColumnSchemaPart,
        grade: {
            type: String,
        },
        semester: {
            type: String,
        },
        classroomId: {
            type: String,
        },
        userId: {
            type: String,
        },
    },
    relations: {
        classroom: {
            type: 'many-to-one',
            target: 'classroom',
            inverseSide: 'students',
            joinColumn: {
                name: 'classroomId',
            },
        },
        user: {
            type: 'one-to-one',
            target: 'user',
            inverseSide: 'student',
            joinColumn: {
                name: 'userId',
            },
        },
    },
})
