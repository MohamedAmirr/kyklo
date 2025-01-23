import {
    AuthenticationResponse,
    ErrorCode,
    isNil,
    PickUpError,
    User,
    UserStatus,
    SignInRequest,
} from '@pickup/shared'
import {passwordHasher} from '../lib/password-hasher'
import {authenticationServiceHooks as hooks} from './hooks'
import {userService} from '../../user/user.service'
import { authenticationUtils } from '../authentication.utils'

export const authenticationService = {
    async signIn(request: SignInRequest): Promise<AuthenticationResponse> {
        const user = await userService.getSingleUserByEmail({
            email: request.email,
        })
        assertUserIsAllowedToSignIn(user)

        await assertPasswordMatches({
            requestPassword: request.password,
            userPassword: user.password,
        })

        return this.signInResponse({
            user,
        })
    },
    async signInResponse({
                             user,
                         }: SignInResponseParams): Promise<AuthenticationResponse> {
        const authnResponse = await hooks.get(user.type).signIn({
            user,
        })

        const userWithoutPassword = removePasswordPropFromUser(authnResponse.user)

        return {
            ...userWithoutPassword,
            token: authnResponse.token,
            classroomId: authnResponse.classroomId,
        }
    },
    async switchClassroom(params: SwitchClassroomParams): Promise<AuthenticationResponse> {
        return authenticationUtils.getClassroomAndToken({
            userId: params.userId,
            schoolId: params.schoolId,
            classroomId: params.classroomId,
        })
    },
}

const assertUserIsAllowedToSignIn: (
    user: User | null
) => asserts user is User = (user): void => {
    if (isNil(user)) {
        throw new PickUpError({
            code: ErrorCode.INVALID_CREDENTIALS,
            params: null,
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
}

const assertPasswordMatches = async ({
                                         requestPassword,
                                         userPassword,
                                     }: AssertPasswordsMatchParams): Promise<void> => {
    const passwordMatches = await passwordHasher.compare(
        requestPassword,
        userPassword,
    )

    if (!passwordMatches) {
        throw new PickUpError({
            code: ErrorCode.INVALID_CREDENTIALS,
            params: null,
        })
    }
}

const removePasswordPropFromUser = (user: User): Omit<User, 'password'> => {
    const {password: _, ...filteredUser} = user
    return filteredUser
}

type AssertPasswordsMatchParams = {
    requestPassword: string
    userPassword: string
}

type SignInResponseParams = {
    user: User
}

type SwitchClassroomParams = {
    userId: string
    schoolId: string
    classroomId: string
}