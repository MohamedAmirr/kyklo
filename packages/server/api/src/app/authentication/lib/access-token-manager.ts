import { assertNotNullOrUndefined, ErrorCode, PickUpError, SchoolId, Principal, PrincipalType } from '@pickup/shared'
import dayjs from 'dayjs'
import { jwtUtils } from '../../helper/jwt-utils'

export const accessTokenManager = {
    async generateToken(principal: Principal, expiresInSeconds: number = dayjs.duration(7, 'day').asSeconds()): Promise<string> {
        const secret = await jwtUtils.getJwtSecret()
        return jwtUtils.sign({
            payload: principal,
            key: secret,
            expiresInSeconds,
        })
    },

    async verifyPrincipal(token: string): Promise<Principal> {
        const secret = await jwtUtils.getJwtSecret()

        try {
            const decoded = await jwtUtils.decodeAndVerify<Principal>({
                jwt: token,
                key: secret,
            })
            assertNotNullOrUndefined(decoded.type, 'decoded.type')
            await assertUserSession(decoded)
            return decoded
        }
        catch (e) {
            if (e instanceof PickUpError) {
                throw e
            }
            throw new PickUpError({
                code: ErrorCode.INVALID_BEARER_TOKEN,
                params: {
                    message: 'invalid access token or session expired',
                },
            })
        }
    },
}

async function assertUserSession(decoded: Principal): Promise<void> {
    if (decoded.type !== PrincipalType.USER) return
    
    // const user = await userService.getOneOrFail({ id: decoded.id })
    // const identity = await userIdentityService(system.globalLogger()).getOneOrFail({ id: user.identityId })
    // const isExpired = (identity.tokenVersion ?? null) !== (decoded.tokenVersion ?? null)
    // if (isExpired || user.status === UserStatus.INACTIVE || !identity.verified) {
    //     throw new ActivepiecesError({
    //         code: ErrorCode.SESSION_EXPIRED,
    //         params: {
    //             message: 'The session has expired or the user is not verified.',
    //         },
    //     })
    // }
}

// type GenerateEngineTokenParams = {
//     projectId: ProjectId
//     queueToken?: string
//     jobId?: string
//     platformId: PlatformId
// }
