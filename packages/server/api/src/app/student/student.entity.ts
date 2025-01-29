import { Classroom, SchoolGrade, Student, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart, PuIdSchema } from '../database/database-common'

export type StudentSchema = Student & {
    classroom: Classroom
    user: User
    schoolGrade: SchoolGrade
}

export const StudentEntity = new EntitySchema<StudentSchema>({
    name: 'student',
    columns: {
        ...BaseColumnSchemaPart,
        semester: {
            type: String,
        },
        classroomId: {
            type: String,
        },
        userId: {
            type: String,
        },
        schoolGradeId: {
            ...PuIdSchema,
        },
    },
    relations: {
        classroom: {
            type: 'many-to-one',
            target: 'classroom',
            inverseSide: 'students',
            joinColumn: {
                name: 'classroom_id',
            },
        },
        user: {
            type: 'one-to-one',
            target: 'user',
            inverseSide: 'student',
            joinColumn: {
                name: 'user_id',
            },
        },
        schoolGrade: {
            type: 'many-to-one',
            target: 'school_grade',
            inverseSide: 'students',
            joinColumn: {
                name: 'school_grade_id',
            },
        },
    },
})
