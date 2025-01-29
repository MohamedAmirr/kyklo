import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'
import {
    School,
    Complaint,
    ComplaintStatus,
    User,
    Category,
} from '@pickup/shared'

export type ComplaintSchema = Complaint & {
    category: Category
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
        referenceNumber: {
            type: String,
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
            target: 'category',
            inverseSide: 'complaints',
            joinColumn: {
                name: 'category_id',
                foreignKeyConstraintName: 'fk_complaint_category_id',
            },
        },
        reporter: {
            type: 'many-to-one',
            target: 'user',
            inverseSide: 'complaints',
            joinColumn: {
                name: 'reporter_id',
                foreignKeyConstraintName: 'fk_complaint_reporter_id',
            },
        },
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'complaints',
            joinColumn: {
                name: 'school_id',
                foreignKeyConstraintName: 'fk_complaint_school_id',
            },
        },
    },
})
