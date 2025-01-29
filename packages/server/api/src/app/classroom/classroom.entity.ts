import { Classroom, School, SchoolGrade, Student, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart, PuIdSchema } from '../database/database-common'

export type ClassroomSchema = Classroom & {
    school: School
    teacher: User
    schoolGrade: SchoolGrade
}

export const ClassroomEntity = new EntitySchema<ClassroomSchema>({
    name: 'classroom',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
        },
        schoolId: {
            ...PuIdSchema,
        },
        teacherId: {
            ...PuIdSchema,
        },
        schoolGradeId: {
            ...PuIdSchema,
        },
    },
    indices: [
        {
            name: 'idx_classroom_teacher_id',
            columns: ['teacherId'],
            unique: false,
        },
    ],
    relations: {
        teacher: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: {
                name: 'teacher_id',
                foreignKeyConstraintName: 'fk_classroom_teacher_id',
            },
        },
        school: {
            type: 'many-to-one',
            target: 'school',
            cascade: true,
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
            joinColumn: {
                name: 'school_id',
                foreignKeyConstraintName: 'fk_classroom_school_id',
            },
        },
        schoolGrade: {
            type: 'many-to-one',
            target: 'school_grade',
            joinColumn: {
                name: 'school_grade_id',
                referencedColumnName: 'id',
            },
        },
    },
})
