import { Classroom, School, Student, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart, PuIdSchema } from '../database/database-common'

export type ClassroomSchema = Classroom & {
    school: School
    teacher: User
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
                name: 'teacherId',
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
                name: 'schoolId',
                foreignKeyConstraintName: 'fk_classroom_school_id',
            },
        },
    },
})
