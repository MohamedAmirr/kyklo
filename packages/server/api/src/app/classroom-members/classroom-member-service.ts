import {
    puId,
    SchoolId,
    SeekPage,
    UserId,
} from '@pickup/shared'
import dayjs from 'dayjs'
import { FastifyBaseLogger } from 'fastify'
import { Equal } from 'typeorm'
import { ClassroomId, ClassroomMember, ClassroomMemberWithUser } from '@pickup/shared'
import { ClassroomMemberEntity } from './classroom-member.entity'
import { repoFactory } from '../core/db/repo-factory'
import { classroomService } from '../classroom/classroom.service'
import { userService } from '../user/user.service'

const repo = repoFactory(ClassroomMemberEntity)

export const classroomMemberService = ({
    async upsert({
        userId,
        classroomId,
    }: UpsertParams): Promise<ClassroomMember> {
        const { schoolId } = await classroomService.getOneOrThrow(classroomId)
        const existingClassroomMember = await repo().findOneBy({
            classroomId,
            userId,
        })
        const classroomMemberId = existingClassroomMember?.id ?? puId()

        const classroomMember: NewClassroomMember = {
            id: classroomMemberId,
            updated: dayjs().toISOString(),
            userId,
            classroomId,
            schoolId
        }

        await repo().upsert(classroomMember, [
            'classroomId',
            'userId',
        ])

        return repo().findOneOrFail({
            where: {
                id: classroomMemberId,
            },
        })
    },
    async list(
        classroomId: ClassroomId,
    ): Promise<ClassroomMemberWithUser[]> {
        const queryBuilder = repo()
            .createQueryBuilder('classroom_member')
            .where({ classroomId })

        const data = await queryBuilder.getMany()

        const enrichedData = await Promise.all(
            data.map(async (member) => await enrichClassroomMemberWithUser(member)),
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
        return members.map((member) => member.classroomId)
    },
})

type GetIdsOfClassroomsParams = {
    userId: UserId
    schoolId: SchoolId
}

type UpsertParams = {
    userId: string
    classroomId: ClassroomId
}

type NewClassroomMember = Omit<ClassroomMember, 'created'>


async function enrichClassroomMemberWithUser(
    classroomMember: ClassroomMember,
): Promise<ClassroomMemberWithUser> {
    const user = await userService.getOneOrFail({
        id: classroomMember.userId,
    })
    return {
        ...classroomMember,
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