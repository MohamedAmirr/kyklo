import {
    ErrorCode,
    isNil,
    PickUpError,
    PuEdition,
} from '@pickup/shared'
import { AppSystemProp, SharedSystemProp, SystemProp } from './system-prop'

export enum RedisType {
    SENTINEL = 'SENTINEL',
    DEFAULT = 'DEFAULT',
}

export enum ContainerType {
    APP = 'APP',
}

export enum DatabaseType {
    POSTGRES = 'POSTGRES',
    SQLITE3 = 'SQLITE3',
}

const systemPropDefaultValues: Partial<Record<SystemProp, string>> = {
    [AppSystemProp.API_RATE_LIMIT_AUTHN_ENABLED]: 'true',
    [AppSystemProp.API_RATE_LIMIT_AUTHN_MAX]: '50',
    [AppSystemProp.API_RATE_LIMIT_AUTHN_WINDOW]: '1 minute',
    [AppSystemProp.DB_TYPE]: DatabaseType.POSTGRES,
    [AppSystemProp.EDITION]: PuEdition.COMMUNITY,
    [AppSystemProp.SHOW_PLATFORM_DEMO]: 'false',
    [AppSystemProp.MAX_FILE_SIZE_MB]: '4',
    [SharedSystemProp.ENVIRONMENT]: 'dev',
    [SharedSystemProp.LOG_LEVEL]: 'info',
    [SharedSystemProp.LOG_PRETTY]: 'false',
    [SharedSystemProp.CONTAINER_TYPE]: ContainerType.APP,
}

export const system = {
    get<T extends string>(prop: SystemProp): T | undefined {
        return getEnvVar(prop) as T | undefined
    },

    getNumberOrThrow(prop: SystemProp): number {
        const value = system.getNumber(prop)

        if (isNil(value)) {
            throw new PickUpError(
                {
                    code: ErrorCode.SYSTEM_PROP_NOT_DEFINED,
                    params: {
                        prop,
                    },
                },
                `System property PU_${prop} is not defined, please check the documentation`,
            )
        }
        return value

    },
    getNumber(prop: SystemProp): number | null {
        const stringNumber = getEnvVar(prop)

        if (!stringNumber) {
            return null
        }

        const parsedNumber = Number.parseInt(stringNumber, 10)

        if (Number.isNaN(parsedNumber)) {
            return null
        }

        return parsedNumber
    },

    getBoolean(prop: SystemProp): boolean | undefined {
        const value = getEnvVar(prop)

        if (isNil(value)) {
            return undefined
        }
        return value === 'true'
    },

    getList(prop: SystemProp): string[] {
        const values = getEnvVar(prop)

        if (isNil(values)) {
            return []
        }
        return values.split(',').map((value) => value.trim())
    },

    getOrThrow<T extends string = string>(prop: SystemProp): T {
        const value = getEnvVar(prop) as T | undefined

        if (value === undefined) {
            throw new PickUpError(
                {
                    code: ErrorCode.SYSTEM_PROP_NOT_DEFINED,
                    params: {
                        prop,
                    },
                },
                `System property PU_${prop} is not defined, please check the documentation`,
            )
        }

        return value
    },
    getEdition(): PuEdition {
        return this.getOrThrow(AppSystemProp.EDITION) as PuEdition
    },
    isApp(): boolean {
        return [ContainerType.APP].includes(
            this.getOrThrow(SharedSystemProp.CONTAINER_TYPE) as ContainerType
        )
    },
}

const getEnvVar = (prop: SystemProp): string | undefined => {
    return process.env[`PU_${prop}`] ?? systemPropDefaultValues[prop]
}
