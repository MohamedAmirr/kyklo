import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart } from '../database/database-common'
import { Department, DepartmentStaff, School, User } from '@pickup/shared'

export type DepartmentSchema = Department & {
    school: School
}

//TODO: maybe add a relation to school grades
export const DepartmentEntity = new EntitySchema<DepartmentSchema>({
    name: 'department',
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: String,
            nullable: false,
        },
        schoolId: {
            type: String,
            nullable: false,
        },
    },
    relations: {
        school: {
            type: 'many-to-one',
            target: 'school',
            inverseSide: 'departments',
            joinColumn: {
                name: 'schoolId',
            },
        },
    },
})

export type DepartmentStaffSchema = DepartmentStaff & {
    department: Department
    staff: User
}

export const DepartmentStaffEntity = new EntitySchema<DepartmentStaffSchema>({
    name: 'department_staff',
    columns: {
        ...BaseColumnSchemaPart,
        departmentId: {
            type: String,
            nullable: false,
        },
        staffId: {
            type: String,
            nullable: false,
        },
        isHead: {
            type: Boolean,
            nullable: false,
        },
    },
    indices: [
        {
            name: 'idx_department_staff_unique',
            columns: ['departmentId', 'staffId'],
            unique: true,
        },
    ],
    relations: {
        department: {
            type: 'many-to-one',
            target: 'department',
            inverseSide: 'staff',
            joinColumn: {
                name: 'departmentId',
                foreignKeyConstraintName: 'fk_department_staff_department_id',
            },
        },
        staff: {
            type: 'many-to-one',
            target: 'user',
            inverseSide: 'departments',
            joinColumn: {
                name: 'staffId',
                foreignKeyConstraintName: 'fk_department_staff_staff_id',
            },
        },
    },
})
