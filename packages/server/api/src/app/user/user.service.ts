import {
    ClassroomMemberRole,
    ErrorCode,
    isNil,
    PickUpError,
    puId,
    SchoolId,
    SeekPage,
    SignUpRequest,
    spreadIfDefined,
    User,
    UserId,
    UserMeta,
    UserStatus,
} from '@pickup/shared'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import { IsNull } from 'typeorm'
import { repoFactory } from '../core/db/repo-factory'
import { UserEntity } from './user.entity'
import { passwordHasher } from '../authentication/lib/password-hasher'


export const userRepo = repoFactory(UserEntity)

export const userService = {
    async create(params: CreateParams): Promise<User> {
        const hashedPassword = await passwordHasher.hash(params.password)

        const user: NewUser = {
            id: puId(),
            ...params,
            email: params.email.toLowerCase().trim(),
            status: UserStatus.ACTIVE,
            password: hashedPassword,
            tokenVersion: nanoid(),
        }

        return userRepo().save(user)
    },
    async update({ id, status, schoolId }: UpdateParams): Promise<User> {

        const updateResult = await userRepo().update({
            id,
            schoolId,
        }, {
            ...spreadIfDefined('status', status),
        })

        if (updateResult.affected !== 1) {
            throw new PickUpError({
                code: ErrorCode.ENTITY_NOT_FOUND,
                params: {
                    entityType: 'user',
                    entityId: id,
                },
            })
        }
        return userRepo().findOneByOrFail({
            id,
            schoolId,
        })
    },
    async list({ schoolId }: ListParams): Promise<SeekPage<User>> {
        const users = await userRepo().findBy({
            schoolId,
        })

        return {
            data: users,
            next: null,
            previous: null,
        }
    },

    async verify({ id }: IdParams): Promise<User> {
        const user = await userRepo().findOneByOrFail({ id })
        if (user.verified) {
            throw new PickUpError({
                code: ErrorCode.AUTHORIZATION,
                params: {
                    message: 'User is already verified',
                },
            })
        }
        return userRepo().save({
            ...user,
            verified: true,
        })
    },

    async get({ id }: IdParams): Promise<User | null> {
        return userRepo().findOneBy({ id })
    },
    async getOneOrFail({ id }: IdParams): Promise<User> {
        return userRepo().findOneByOrFail({ id })
    },

    async getMetaInfo({ id }: IdParams): Promise<UserMeta | null> {
        const user = await this.get({ id })

        if (isNil(user)) {
            return null
        }

        return {
            id: user.id,
            email: user.email,
            schoolId: user.schoolId,
            firstName: user.firstName,
            lastName: user.lastName,
            status: user.status,
            created: user.created,
            updated: user.updated,
        }
    },

    async delete({ id, schoolId }: DeleteParams): Promise<void> {
        await userRepo().delete({
            id,
            schoolId,
        })
    },
    async getBasicInformation(id: string): Promise<Pick<User, 'email' | 'firstName' | 'lastName'>> {
        const user = await userRepo().findOneByOrFail({ id })
        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    },
    async getUsersByEmail({ email }: { email: string }): Promise<User[]> {
        return userRepo()
            .createQueryBuilder()
            .andWhere('LOWER(email) = LOWER(:email)', { email })
            .getMany()
    },
    async getBySchoolAndEmail({
        schoolId,
        email,
    }: GetBySchoolAndEmailParams): Promise<User | null> {
        const schoolWhereQuery = schoolId
            ? { schoolId }
            : { schoolId: IsNull() }

        return userRepo()
            .createQueryBuilder()
            .where(schoolWhereQuery)
            .andWhere('LOWER(email) = LOWER(:email)', { email })
            .getOne()
    },

    async updatePassword({
        id,
        newPassword,
    }: UpdatePasswordParams): Promise<void> {
        const hashedPassword = await passwordHasher.hash(newPassword)

        await userRepo().update(id, {
            updated: dayjs().toISOString(),
            password: hashedPassword,
            tokenVersion: nanoid(),
        })
    },

    async addOwnerToPlatform({
        id,
        schoolId,
    }: UpdateSchoolIdParams): Promise<void> {
        await userRepo().update(id, {
            updated: dayjs().toISOString(),
            schoolId,
        })
    },
}

type DeleteParams = {
    id: UserId
    schoolId: SchoolId
}


type ListParams = {
    schoolId: SchoolId
}


type UpdateParams = {
    id: UserId
    status?: UserStatus
    schoolId: SchoolId
}

type CreateParams = SignUpRequest & {
    verified: boolean
    schoolId: string | null
    classroomRole: ClassroomMemberRole
}

type NewUser = Omit<User, 'created' | 'updated'>

type GetBySchoolAndEmailParams = {
    schoolId: string | null
    email: string
}

type IdParams = {
    id: UserId
}

type UpdatePasswordParams = {
    id: UserId
    newPassword: string
}

type UpdateSchoolIdParams = {
    id: UserId
    schoolId: string
}
