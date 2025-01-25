import {
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
import { repoFactory } from '../core/db/repo-factory'
import { UserEntity } from './user.entity'
import { passwordHasher } from '../authentication/lib/password-hasher'
import { nanoid } from 'nanoid'

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
    async update({ id, status }: UpdateParams): Promise<User> {
        const updateResult = await userRepo().update(
            {
                id,
            },
            {
                ...spreadIfDefined('status', status),
            }
        )

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

    async get({ id }: IdParams): Promise<User | null> {
        return userRepo().findOneBy({ id })
    },
    async getOneOrFail({ id }: IdParams): Promise<User> {
        return userRepo().findOneByOrFail({ id })
    },

    async getMetaInfo({ id }: IdParams): Promise<UserMeta> {
        const user = await this.getOneOrFail({ id })

        return {
            id: user.id,
            email: user.email,
            schoolId: user.schoolId,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
            status: user.status,
            created: user.created,
            updated: user.updated,
        }
    },

    async delete({ id }: DeleteParams): Promise<void> {
        await userRepo().delete({
            id,
        })
    },
    async getBasicInformation(
        id: string
    ): Promise<Pick<User, 'email' | 'firstName' | 'lastName'>> {
        const user = await userRepo().findOneByOrFail({ id })
        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    },
    async getSingleUserByEmail({
        email,
    }: {
        email: string
    }): Promise<User | null> {
        return userRepo()
            .createQueryBuilder()
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
        })
    },

    async addUserToSchool({
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
}

type ListParams = {
    schoolId: SchoolId
}

type UpdateParams = {
    id: UserId
    status?: UserStatus
}

type CreateParams = SignUpRequest

type NewUser = Omit<User, 'created' | 'updated'>

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
