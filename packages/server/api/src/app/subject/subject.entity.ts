import { EntitySchema } from 'typeorm'
import { Department, School, Subject } from '@pickup/shared'
import { BaseColumnSchemaPart } from '../database/database-common'

export type SubjectSchema = Subject & {
    department: Department
    school: School
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
            type: String,
            nullable: false,
        },
        schoolId: {
            type: String,
            nullable: false,
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
                name: 'departmentId',
                referencedColumnName: 'id',
            },
        },
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'subjects',
            joinColumn: {
                name: 'schoolId',
                referencedColumnName: 'id',
            },
        },
    },
})
