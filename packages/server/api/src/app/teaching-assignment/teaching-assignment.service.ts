import { puId, SchoolId, SeekPage, SubjectId, UserId } from '@pickup/shared'
import dayjs from 'dayjs'
import { FastifyBaseLogger } from 'fastify'
import { Equal } from 'typeorm'
import {
    ClassroomId,
    TeachingAssignment,
    TeachingAssignmentWithUser,
} from '@pickup/shared'
import { TeachingAssignmentEntity } from './teaching-assignment.entity'
import { repoFactory } from '../core/db/repo-factory'
import { classroomService } from '../classroom/classroom.service'
import { userService } from '../user/user.service'

const repo = repoFactory(TeachingAssignmentEntity)

export const teachingAssignmentService = {
    async upsert({
        userId,
        classroomId,
        subjectId,
    }: UpsertParams): Promise<TeachingAssignment> {
        const { schoolId } = await classroomService.getOneOrThrow(classroomId)
        const existingTeachingAssignment = await repo().findOneBy({
            classroomId,
            subjectId,
            userId,
        })
        const teachingAssignmentId = existingTeachingAssignment?.id ?? puId()

        const teachingAssignment: NewTeachingAssignment = {
            id: teachingAssignmentId,
            updated: dayjs().toISOString(),
            userId,
            classroomId,
            subjectId,
            schoolId,
        }

        await repo().upsert(teachingAssignment, ['classroomId', 'userId'])

        return repo().findOneOrFail({
            where: {
                id: teachingAssignmentId,
            },
        })
    },
    async list(
        classroomId: ClassroomId
    ): Promise<TeachingAssignmentWithUser[]> {
        const queryBuilder = repo()
            .createQueryBuilder('teaching_assignment')
            .where({ classroomId })

        const data = await queryBuilder.getMany()

        const enrichedData = await Promise.all(
            data.map(
                async member => await enrichTeachingAssignmentWithUser(member)
            )
        )

        return enrichedData
    },

    async getIdsOfClassrooms({
        userId,
        schoolId,
    }: GetIdsOfClassroomsParams): Promise<string[] | undefined> {
        const members = await repo().findBy({
            userId,
            schoolId: Equal(schoolId),
        })
        return members.map(member => member.classroomId)
    },
}

type GetIdsOfClassroomsParams = {
    userId: UserId
    schoolId: SchoolId
}

type UpsertParams = {
    userId: string
    classroomId: ClassroomId
    subjectId: SubjectId
}

type NewTeachingAssignment = Omit<TeachingAssignment, 'created'>

async function enrichTeachingAssignmentWithUser(
    teachingAssignment: TeachingAssignment
): Promise<TeachingAssignmentWithUser> {
    const user = await userService.getOneOrFail({
        id: teachingAssignment.userId,
    })
    return {
        ...teachingAssignment,
        user: {
            schoolId: user.schoolId,
            status: user.status,
            email: user.email,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            created: user.created,
            updated: user.updated,
            type: user.type,
        },
    }
}
