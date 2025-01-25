import {
    AuthenticationResponse,
    ErrorCode,
    isNil,
    PickUpError,
    PrincipalType,
    UserStatus,
} from '@pickup/shared'
import { accessTokenManager } from './lib/access-token-manager'
import { classroomService } from '../classroom/classroom.service'
import { userService } from '../user/user.service'

export const authenticationUtils = {
    async getClassroomAndToken(
        params: GetClassroomAndTokenParams
    ): Promise<AuthenticationResponse> {
        const user = await userService.getOneOrFail({ id: params.userId })
        const classrooms = await classroomService.getAllForUser({
            schoolId: params.schoolId,
            userId: params.userId,
        })
        const classroom = classrooms.find(
            classroom => classroom.id === params.classroomId
        )
        if (isNil(classroom)) {
            throw new PickUpError({
                code: ErrorCode.INVITATION_ONLY_SIGN_UP,
                params: {
                    message: 'No project found for user',
                },
            })
        }
        if (user.status === UserStatus.INACTIVE) {
            throw new PickUpError({
                code: ErrorCode.USER_IS_INACTIVE,
                params: {
                    email: user.email,
                },
            })
        }

        const token = await accessTokenManager.generateToken({
            id: user.id,
            type: PrincipalType.USER,
            classroomId: classroom.id,
            school: {
                id: params.schoolId,
            },
            tokenVersion: user.tokenVersion,
        })
        return {
            ...user,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token,
            classroomId: classroom.id,
        }
    },
}

type GetClassroomAndTokenParams = {
    userId: string
    schoolId: string
    classroomId: string
}
