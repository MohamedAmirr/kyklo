import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'
import {
    School,
    Ticket,
    TicketCategory,
    TicketStatus,
    User,
} from '@pickup/shared'

export type TicketCategorySchema = TicketCategory & {
    tickets: Ticket[]
}

export const TicketCategoriesEntity = new EntitySchema<TicketCategorySchema>({
    name: 'ticket_categories',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
            unique: true,
        },
    },
    relations: {
        tickets: {
            type: 'one-to-many',
            target: 'ticket',
            inverseSide: 'category',
        },
    },
})

export type TicketSchema = Ticket & {
    category: TicketCategory
    reporter: User
    school: School
}

export const TicketsEntity = new EntitySchema<TicketSchema>({
    name: 'ticket',
    columns: {
        ...BaseColumnSchemaPart,
        title: {
            type: String,
            nullable: false,
        },
        status: {
            type: 'enum',
            enum: TicketStatus,
            default: TicketStatus.OPEN,
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
            target: 'ticket_categories',
            inverseSide: 'tickets',
            joinColumn: {
                name: 'categoryId',
                foreignKeyConstraintName: 'fk_ticket_category_id',
            },
        },
        reporter: {
            type: 'many-to-one',
            target: 'user',
            inverseSide: 'tickets',
            joinColumn: {
                name: 'reporterId',
                foreignKeyConstraintName: 'fk_ticket_reporter_id',
            },
        },
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'tickets',
            joinColumn: {
                name: 'schoolId',
                foreignKeyConstraintName: 'fk_ticket_school_id',
            },
        },
    },
})
