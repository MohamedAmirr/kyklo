import { BaseModel, PuId } from '@pickup/shared'

export type FlagId = PuId

export type Flag = {
    value: unknown
} & BaseModel<FlagId>

export enum PuEnvironment {
    PRODUCTION = 'prod',
    DEVELOPMENT = 'dev',
    TESTING = 'test',
}

export enum PuEdition {
    COMMUNITY = 'ce',
    ENTERPRISE = 'ee',
}

export enum PuFlagId {
    EDITION = 'EDITION',
    FRONTEND_URL = 'FRONTEND_URL',
    THEME = 'THEME',
    SHOW_PLATFORM_DEMO = 'SHOW_PLATFORM_DEMO',
}
