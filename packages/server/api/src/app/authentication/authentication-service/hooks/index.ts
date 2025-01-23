import { AuthenticationServiceHooks, studentAuthenticationServiceHooks } from './authentication-service-hooks'
import { UserType } from '@pickup/shared'

export const authenticationServiceHooks = {
    get(userType: UserType): AuthenticationServiceHooks {
        switch (userType) {
            case UserType.STUDENT:
                return studentAuthenticationServiceHooks
            default:
                throw new Error(`Unsupported user type: ${userType}`)
        }
    },
}