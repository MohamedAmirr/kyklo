import { PickUpError, ErrorCode, isNil, PrincipalType, User, Classroom, ClassroomMemberRole } from '@pickup/shared'
import { platformService } from '../../../platform/platform.service'
import { userService } from '../../../user/user-service'
import { accessTokenManager } from '../../lib/access-token-manager'
import { AuthenticationServiceHooks } from './authentication-service-hooks'
import { classroomService } from '../../../classroom/classroom-service'

export const communityAuthenticationServiceHooks: AuthenticationServiceHooks = {
    async signIn({ user }) {
        return getClassroomAndToken(user)
    },
}

async function getClassroomAndToken(user: User): Promise<{ user: User, classroom: Classroom, token: string, classroomRole: ClassroomMemberRole }> {
    const updatedUser = await userService.getOneOrFail({ id: user.id })

    const classroom = await classroomService.getUserClassroomOrThrow(updatedUser.id)
    if (isNil(classroom)) {
        throw new PickUpError({
            code: ErrorCode.NO_CLASSROOM_FOUND,
            params: {
                email: user.email,
                message: 'No classroom found for user',
            },
        })
    }
    const platform = await platformService.getOneOrThrow(classroom.platformId)
    const token = await accessTokenManager.generateToken({
        id: user.id,
        type: PrincipalType.USER,
        classroomId: classroom.id,
        platform: {
            id: platform.id,
        },
        tokenVersion: user.tokenVersion,
    })
    return {
        user: updatedUser,
        token,
        classroom,
        // TODO: WE NEED TO CHECK IF THE ROLE OF THE USER
        classroomRole: ClassroomMemberRole.STUDENT,
    }
}
