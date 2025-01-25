import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'
import {
    School,
    Complaint,
    ComplaintCategory,
    ComplaintStatus,
    User,
} from '@pickup/shared'

export type ComplaintCategorySchema = ComplaintCategory & {
    complaints: Complaint[]
}

export const ComplaintCategoriesEntity = new EntitySchema<ComplaintCategorySchema>({
    name: 'complaint_categories',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
            unique: true,
        },
    },
    relations: {
        complaints: {
            type: 'one-to-many',
            target: 'complaint',
            inverseSide: 'category',
        },
    },
})

export type ComplaintSchema = Complaint & {
    category: ComplaintCategory
    reporter: User
    school: School
}

export const ComplaintsEntity = new EntitySchema<ComplaintSchema>({
    name: 'complaint',
    columns: {
        ...BaseColumnSchemaPart,
        title: {
            type: String,
            nullable: false,
        },
        status: {
            type: 'enum',
            enum: ComplaintStatus,
            default: ComplaintStatus.OPEN,
            nullable: false,
        },
        number: {
            type: Number,
            nullable: false,
        },
        categoryId: {
            type: String,
            nullable: false,
        },
        reporterId: {
            type: String,
            nullable: false,
        },
        description: {
            type: String,
            nullable: true,
        },
        schoolId: {
            type: String,
            nullable: false,
        },
    },
    relations: {
        category: {
            type: 'many-to-one',
            target: 'complaint_categories',
            inverseSide: 'complaints',
            joinColumn: {
                name: 'categoryId',
                foreignKeyConstraintName: 'fk_complaint_category_id',
            },
        },
        reporter: {
            type: 'many-to-one',
            target: 'user',
            inverseSide: 'complaints',
            joinColumn: {
                name: 'reporterId',
                foreignKeyConstraintName: 'fk_complaint_reporter_id',
            },
        },
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'complaints',
            joinColumn: {
                name: 'schoolId',
                foreignKeyConstraintName: 'fk_complaint_school_id',
            },
        },
    },
})
