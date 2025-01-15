import { PickUpError, ErrorCode, isNil, PrincipalType, User, Classroom } from '@pickup/shared'
import { accessTokenManager } from '../../lib/access-token-manager'
import { AuthenticationServiceHooks } from './authentication-service-hooks'
import { userService } from '../../../user/user.service'
import { classroomService } from '../../../classroom/classroom.service'

export const communityAuthenticationServiceHooks: AuthenticationServiceHooks = {
    async signIn({ user }) {
        return getSchoolAndToken(user)
    },
}

async function getSchoolAndToken(user: User): Promise<{ user: User, schoolId: string, token: string}> {
    const updatedUser = await userService.getOneOrFail({ id: user.id })
    const token = await accessTokenManager.generateToken({
        id: user.id,
        type: PrincipalType.USER,
        schoolId: updatedUser.schoolId,
    })
    return {
        user: updatedUser,
        token,
        schoolId: updatedUser.schoolId,
    }
}
