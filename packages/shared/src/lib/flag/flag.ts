import { BaseModel, PuId } from '@pickup/shared';

export type FlagId = PuId;

export type Flag = {
    value: unknown;
} & BaseModel<FlagId>;

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
    SHOW_PLATFORM_DEMO = 'SHOW_PLATFORM_DEMO',
    CLASSROOM_LIMITS_ENABLED = 'CLASSROOM_LIMITS_ENABLED',
    CURRENT_VERSION = 'CURRENT_VERSION',
    EDITION = 'EDITION',
    ENVIRONMENT = 'ENVIRONMENT',
    FRONTEND_URL = 'FRONTEND_URL',
    LATEST_VERSION = 'LATEST_VERSION',
    PRIVACY_POLICY_URL = 'PRIVACY_POLICY_URL',
    THEME = 'THEME',
    USER_CREATED = 'USER_CREATED',
    TERMS_OF_SERVICE_URL = 'TERMS_OF_SERVICE_URL',
    EMAIL_AUTH_ENABLED = 'EMAIL_AUTH_ENABLED',
}
