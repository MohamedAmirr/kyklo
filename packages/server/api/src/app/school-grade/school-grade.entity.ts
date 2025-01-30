import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart, PuIdSchema } from '../database/database-common'
import {
    School,
    SchoolGrade,
    SchoolStage,
    SchoolStageType,
} from '@pickup/shared'

export type SchoolGradeSchema = SchoolGrade & {
    school: School
    schoolStage: SchoolStage
}

export const SchoolGradeEntity = new EntitySchema<SchoolGradeSchema>({
    name: 'school_grade',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
            nullable: false,
        },
        schoolStageId: {
            ...PuIdSchema,
        },
        schoolId: {
            ...PuIdSchema,
        },
    },
    relations: {
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'school_grades',
            joinColumn: {
                name: 'school_id',
            },
        },
        schoolStage: {
            type: 'many-to-one',
            target: 'school_stage',
            joinColumn: {
                name: 'school_stage_id',
            },
        },
    },
})

export type SchoolStageSchema = SchoolStage & {}

export const SchoolStageEntity = new EntitySchema<SchoolStageSchema>({
    name: 'school_stage',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
            nullable: false,
        },
        ageRange: {
            type: String,
            nullable: true,
        },
        levelType: {
            type: 'enum',
            enum: SchoolStageType,
            nullable: false,
        },
    },
})
