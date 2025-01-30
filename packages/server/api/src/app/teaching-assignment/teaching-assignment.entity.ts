import { Classroom, Subject, TeachingAssignment, User } from '@pickup/shared'
import { EntitySchema } from 'typeorm'
import { BaseColumnSchemaPart, PuIdSchema } from '../database/database-common'

export type TeachingAssignmentSchema = TeachingAssignment & {
    user: User
    classroom: Classroom
    subject: Subject
}

export const TeachingAssignmentEntity =
    new EntitySchema<TeachingAssignmentSchema>({
        name: 'teaching_assignment',
        columns: {
            ...BaseColumnSchemaPart,
            classroomId: PuIdSchema,
            subjectId: PuIdSchema,
            userId: PuIdSchema,
            schoolId: PuIdSchema,
        },
        indices: [
            {
                name: 'idx_teaching_assignment_classroom_id_user_id_school_id',
                columns: ['classroomId', 'userId', 'subjectId', 'schoolId'],
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
                    name: 'classroom_id',
                    foreignKeyConstraintName:
                        'fk_teaching_assignment_classroom_id',
                },
            },
            subject: {
                type: 'many-to-one',
                target: 'subject',
                cascade: true,
                onDelete: 'CASCADE',
                joinColumn: {
                    name: 'subject_id',
                    foreignKeyConstraintName:
                        'fk_teaching_assignment_subject_id',
                },
            },
            user: {
                type: 'many-to-one',
                target: 'user',
                cascade: true,
                onDelete: 'CASCADE',
                joinColumn: {
                    name: 'user_id',
                    foreignKeyConstraintName: 'fk_teaching_assignment_user_id',
                },
            },
        },
    })
