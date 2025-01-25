import { Classroom, ClassroomMember, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart, PuIdSchema } from '../database/database-common'

export type ClassroomMemberSchema = ClassroomMember & {
    user: User
    classroom: Classroom
}

export const ClassroomMemberEntity = new EntitySchema<ClassroomMemberSchema>({
    name: 'classroom_member',
    columns: {
        ...BaseColumnSchemaPart,
        classroomId: PuIdSchema,
        schoolId: PuIdSchema,
        userId: PuIdSchema,
    },
    indices: [
        {
            name: 'idx_classroom_member_classroom_id_user_id_school_id',
            columns: ['classroomId', 'userId', 'schoolId'],
            unique: true,
        },
    ],
    relations: {
        classroom: {
            type: 'many-to-one',
            target: 'classroom',
            cascade: true,
            onDelete: 'CASCADE',
            joinColumn: {
                name: 'classroomId',
                foreignKeyConstraintName: 'fk_classroom_member_classroom_id',
            },
        },
        user: {
            type: 'many-to-one',
            target: 'user',
            cascade: true,
            onDelete: 'CASCADE',
            joinColumn: {
                name: 'userId',
                foreignKeyConstraintName: 'fk_classroom_member_user_id',
            },
        },
    },
})
