import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'
import { School, Ticket, TicketCategory, User } from '@pickup/shared'

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
    raisedBy: User
    school: School
}


export const TicketsEntity = new EntitySchema<TicketSchema>({
    name: 'ticket',
    columns: {
        ...BaseColumnSchemaPart,
        title: {
            type: String,
        },
        status: {
            type: 'enum',
            enum: ['open', 'closed'],
            default: 'open',
        },
        categoryId: {
            type: String,
        },
        raisedById: {
            type: String,
        },
        description: {
            type: String,
        },
        schoolId: {
            type: String,
        },
    },
    relations: {
        category: {
            type: 'many-to-one',
            target: 'ticket_categories',
            inverseSide: 'tickets',
            joinColumn: {
                name: 'category_id',
            },
        },
        raisedBy: {
            type: 'many-to-one',
            target: 'user',
            inverseSide: 'tickets',
            joinColumn: {
                name: 'raised_by_id',
            },
        },
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'tickets',
            joinColumn: {
                name: 'school_id',
            },
        },
    },
})
