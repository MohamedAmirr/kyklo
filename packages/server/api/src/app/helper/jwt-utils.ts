import { AppSystemProp, system } from '@pickup/server-shared'
import {
    ErrorCode,
    isNil,
    PickUpError,
    spreadIfDefined,
} from '@pickup/shared'
import jwtLibrary, {
    DecodeOptions,
    SignOptions,
    VerifyOptions,
} from 'jsonwebtoken'

export enum JwtSignAlgorithm {
    HS256 = 'HS256',
    RS256 = 'RS256',
}

const ONE_WEEK = 7 * 24 * 3600
const KEY_ID = '1'
const ISSUER = 'activepieces'
const ALGORITHM = JwtSignAlgorithm.HS256

let secret: string | null = null

const getSecret = async (): Promise<string> => {
    if (secret !== null) {
        return secret
    }
    secret = system.get(AppSystemProp.JWT_SECRET) ?? null

    if (isNil(secret)) {
        throw new PickUpError(
            {
                code: ErrorCode.SYSTEM_PROP_INVALID,
                params: {
                    prop: AppSystemProp.JWT_SECRET,
                },
            },
            `System property PICKUP_${AppSystemProp.JWT_SECRET} must be defined`,
        )
    }
    return secret
}

export const jwtUtils = {
    async sign({
        payload,
        key,
        expiresInSeconds = ONE_WEEK,
        keyId = KEY_ID,
        algorithm = ALGORITHM,
    }: SignParams): Promise<string> {
        const signOptions: SignOptions = {
            algorithm,
            keyid: keyId,
            expiresIn: expiresInSeconds,
            issuer: ISSUER,
        }
        return new Promise((resolve, reject) => {
            jwtLibrary.sign(payload, key, signOptions, (err, token) => {
                if (err) {
                    return reject(err)
                }

                if (isNil(token)) {
                    return reject(
                        new PickUpError({
                            code: ErrorCode.INVALID_BEARER_TOKEN,
                            params: {},
                        }),
                    )
                }

                return resolve(token)
            })
        })
    },
    getJwtSecret: getSecret,
    async decodeAndVerify<T>({
        jwt,
        key,
        algorithm = ALGORITHM,
        issuer = ISSUER,
        audience,
    }: VerifyParams): Promise<T> {
        const verifyOptions: VerifyOptions = {
            algorithms: [algorithm],
            ...spreadIfDefined('issuer', issuer),
            ...spreadIfDefined('audience', audience),
        }

        return new Promise((resolve, reject) => {
            jwtLibrary.verify(jwt, key, verifyOptions, async (err, payload) => {
                if (err) {
                    return reject(err)
                }
                return resolve(payload as T)
            })
        })
    },

    decode<T>({ jwt }: DecodeParams): DecodedJwt<T> {
        const decodeOptions: DecodeOptions = {
            complete: true,
        }

        return jwtLibrary.decode(jwt, decodeOptions) as DecodedJwt<T>
    },
}

type SignParams = {
    payload: Record<string, unknown>
    key: string
    expiresInSeconds?: number
    algorithm?: JwtSignAlgorithm
    keyId?: string
}

type VerifyParams = {
    jwt: string
    key: string
    algorithm?: JwtSignAlgorithm
    issuer?: string | string[] | null
    audience?: string
}

type DecodeParams = {
    jwt: string
}

type DecodedJwt<T> = {
    header: {
        alg: string
        typ: string
        kid: string
    }
    payload: T
    signature: string
}
