import { PrincipalType, User, UserType } from '@pickup/shared'
import { accessTokenManager } from '../../lib/access-token-manager'
import { StudentEntity } from '../../../student/student.entity'
import { databaseConnection } from '../../../database/database-connection'

export type AuthenticationServiceHooks = {
    signIn(p: SignInParams): Promise<SignInResult>
}

export const studentAuthenticationServiceHooks: AuthenticationServiceHooks = {
    async signIn({ user }) {
        const studentRepository = databaseConnection().getRepository(StudentEntity)
        const student = await studentRepository.findOne({
            where: { userId: user.id },
            relations: ['classroom'],
        })

        if (!student) {
            throw new Error('Student record not found for the given user')
        }

        const token = await accessTokenManager.generateToken({
            id: user.id,
            type: PrincipalType.USER,
            role: UserType.STUDENT,
            schoolId: user.schoolId,
        })
        return {
            user,
            token,
            schoolId: user.schoolId,
            classroomId: student.classroom.id,
        }
    },
}

type SignInParams = {
    user: User
}

type SignInResult = {
    user: User
    token: string
    schoolId: string
}
