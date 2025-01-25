import {
    assertNotNullOrUndefined,
    ErrorCode,
    PickUpError,
    Principal,
    PrincipalType,
    UserStatus,
} from '@pickup/shared'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { jwtUtils } from '../../helper/jwt-utils'
import { userService } from '../../user/user.service'

dayjs.extend(duration)

export const accessTokenManager = {
    async generateToken(
        principal: Principal,
        expiresInSeconds: number = dayjs.duration(7, 'day').asSeconds()
    ): Promise<string> {
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
        } catch (e) {
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

    const user = await userService.getOneOrFail({ id: decoded.id })
    const isExpired =
        (user.tokenVersion ?? null) !== (decoded.tokenVersion ?? null)

    if (isExpired || user.status === UserStatus.INACTIVE) {
        throw new PickUpError({
            code: ErrorCode.SESSION_EXPIRED,
            params: {
                message: 'The session has expired or the user is not verified.',
            },
        })
    }
}
