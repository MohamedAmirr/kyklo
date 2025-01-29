import { Event, PaymentMethod, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'

export type EventSchema = Event & {
    supervisors: User[]
}

export const EventEntity = new EntitySchema<EventSchema>({
    name: 'event',
    columns: {
        ...BaseColumnSchemaPart,
        title: {
            type: String,
        },
        startDate: {
            type: 'timestamp',
        },
        imageUrls: {
            type: 'simple-array',
        },
        description: {
            type: String,
        },
        price: {
            type: 'float',
            nullable: true,
        },
        paymentMethod: {
            type: String,
            enum: PaymentMethod,
            nullable: true,
        },
        details: {
            type: 'json',
        },
        grades: {
            type: 'simple-array',
        },
    },
    relations: {
        supervisors: {
            type: 'many-to-many',
            target: 'user',
            inverseSide: 'supervisedEvents',
            joinTable: {
                name: 'event_supervisors',
                joinColumn: {
                    name: 'event_id',
                    referencedColumnName: 'id',
                },
                inverseJoinColumn: {
                    name: 'user_id',
                    referencedColumnName: 'id',
                },
            },
            cascade: true,
        },
    },
})
