import { EntitySchema } from 'typeorm'
import { Department, School, SchoolGrade, Subject } from '@pickup/shared'
import { BaseColumnSchemaPart, PuIdSchema } from '../database/database-common'

export type SubjectSchema = Subject & {
    department: Department
    school: School
    schoolGrade: SchoolGrade
}

export const SubjectEntity = new EntitySchema<SubjectSchema>({
    name: 'subject',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
            nullable: false,
        },
        departmentId: {
            ...PuIdSchema,
        },
        schoolId: {
            ...PuIdSchema,
        },
        schoolGradeId: {
            ...PuIdSchema,
        },
        creditHours: {
            type: Number,
        },
    },
    relations: {
        department: {
            type: 'many-to-one',
            target: 'department',
            inverseSide: 'subjects',
            joinColumn: {
                name: 'department_id',
                referencedColumnName: 'id',
            },
        },
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'subjects',
            joinColumn: {
                name: 'school_id',
                referencedColumnName: 'id',
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
