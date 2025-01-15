import { User } from '@pickup/shared'

export type AuthenticationServiceHooks = {
    signIn(p: SignInParams): Promise<SignInResult>
}

type SignInParams = {
    user: User
}

type SignInResult = {
    user: User
    token: string
    schoolId: string
}
