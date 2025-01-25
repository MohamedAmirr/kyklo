import { CategoryType, Complaint, School } from "@pickup/shared"

import { Category } from "@pickup/shared"
import { EntitySchema } from "typeorm"
import { BaseColumnSchemaPart } from "../database/database-common"

export type CategorySchema = Category & {
    complaints: Complaint[]
    school: School
}

export const CategoriesEntity = new EntitySchema<CategorySchema>({
    name: 'category',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
            unique: true,
        },
        schoolId: {
            type: String,
            nullable: false,
        },
        type: {
            type: 'enum',
            enum: CategoryType,
            nullable: false,
        },
    },
    relations: {
        complaints: {
            type: 'one-to-many',
            target: 'complaint',
            inverseSide: 'category',
        },
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'categories',
            joinColumn: {
                name: 'schoolId',
                foreignKeyConstraintName: 'fk_category_school_id',
            },
        },
    },
})
