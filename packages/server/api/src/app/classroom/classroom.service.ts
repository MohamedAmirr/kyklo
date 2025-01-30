import { In, IsNull } from 'typeorm'
import {
    assertNotNullOrUndefined,
    Classroom,
    ClassroomId,
    ErrorCode,
    isNil,
    PickUpError,
} from '@pickup/shared'
import { repoFactory } from '../core/db/repo-factory'
import { ClassroomEntity } from './classroom.entity'
import { FindOptionsWhere } from 'typeorm'
import { userService } from '../user/user.service'
import { teachingAssignmentService } from '../teaching-assignment/teaching-assignment.service'

export const classroomRepo = repoFactory(ClassroomEntity)

export const classroomService = {
    async getOne(
        classroomId: ClassroomId | undefined
    ): Promise<Classroom | null> {
        if (isNil(classroomId)) {
            return null
        }

        return classroomRepo().findOneBy({
            id: classroomId,
        })
    },

    async getOneOrThrow(classroomId: ClassroomId): Promise<Classroom> {
        const classroom = await this.getOne(classroomId)

        if (isNil(classroom)) {
            throw new PickUpError({
                code: ErrorCode.ENTITY_NOT_FOUND,
                params: {
                    entityId: classroomId,
                    entityType: 'classroom',
                },
            })
        }

        return classroom
    },
    async getAllForUser(params: GetAllForUserParams): Promise<Classroom[]> {
        assertNotNullOrUndefined(params.schoolId, 'schoolId is undefined')
        const filters: FindOptionsWhere<Classroom>[] = []
        const classroomIds = await teachingAssignmentService.getIdsOfClassrooms(
            {
                schoolId: params.schoolId,
                userId: params.userId,
            }
        )
        filters.push({
            teacherId: params.userId,
            schoolId: params.schoolId,
        })
        if (!isNil(classroomIds)) {
            filters.push({
                id: In(classroomIds),
            })
        }
        return classroomRepo().findBy(filters)
    },
}

type GetAllForUserParams = {
    schoolId: string
    userId: string
}
