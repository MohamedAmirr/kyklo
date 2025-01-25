import {
    AppSystemProp,
    ContainerType,
    DatabaseType,
    logger,
    SharedSystemProp,
    system,
    SystemProp,
} from '@pickup/server-shared'
import { isNil, PuEdition, PuEnvironment } from '@pickup/shared'
import { jwtUtils } from './jwt-utils'

function enumValidator<T extends string>(enumValues: T[]) {
    return (value: string) => {
        const isValid = enumValues.includes(value as T)
        return isValid ? true : `Value must be one of: ${enumValues.join(', ')}`
    }
}

function booleanValidator(value: string | undefined) {
    const isValid = value === 'true' || value === 'false'
    return isValid ? true : 'Value must be either "true" or "false"'
}

function numberValidator(value: string | undefined) {
    const isValid = !isNil(value) && !Number.isNaN(Number(value))
    return isValid ? true : 'Value must be a valid number'
}

function stringValidator(value: string) {
    const isValid = typeof value === 'string' && value.length > 0
    return isValid ? true : 'Value must be a non-empty string'
}

function urlValidator(value: string) {
    try {
        new URL(value)
        return true
    } catch {
        return 'Value must be a valid URL'
    }
}

const systemPropValidators: {
    [key in SystemProp]: (value: string) => true | string
} = {
    // SharedSystemProp
    [SharedSystemProp.LOG_LEVEL]: enumValidator([
        'error',
        'warn',
        'info',
        'debug',
        'trace',
    ]),
    [SharedSystemProp.LOG_PRETTY]: booleanValidator,
    [SharedSystemProp.ENVIRONMENT]: enumValidator(Object.values(PuEnvironment)),
    [SharedSystemProp.FRONTEND_URL]: urlValidator,
    [SharedSystemProp.SENTRY_DSN]: urlValidator,
    [SharedSystemProp.LOKI_PASSWORD]: stringValidator,
    [SharedSystemProp.LOKI_URL]: urlValidator,
    [SharedSystemProp.LOKI_USERNAME]: stringValidator,
    [SharedSystemProp.EMAIL_AUTH_ENABLED]: booleanValidator,
    [SharedSystemProp.CONTAINER_TYPE]: enumValidator(
        Object.values(ContainerType)
    ),

    // AppSystemProp
    [AppSystemProp.DB_TYPE]: enumValidator(Object.values(DatabaseType)),
    [AppSystemProp.ENCRYPTION_KEY]: stringValidator,
    [AppSystemProp.JWT_SECRET]: stringValidator,
    [AppSystemProp.LICENSE_KEY]: stringValidator,
    [AppSystemProp.POSTGRES_DATABASE]: stringValidator,
    [AppSystemProp.POSTGRES_HOST]: stringValidator,
    [AppSystemProp.POSTGRES_PASSWORD]: stringValidator,
    [AppSystemProp.POSTGRES_PORT]: numberValidator,
    [AppSystemProp.POSTGRES_SSL_CA]: stringValidator,
    [AppSystemProp.POSTGRES_URL]: stringValidator,
    [AppSystemProp.POSTGRES_USERNAME]: stringValidator,
    [AppSystemProp.POSTGRES_USE_SSL]: booleanValidator,
    [AppSystemProp.EDITION]: enumValidator(Object.values(PuEdition)),
    [AppSystemProp.FIREBASE_HASH_PARAMETERS]: stringValidator,
    [AppSystemProp.API_RATE_LIMIT_AUTHN_MAX]: numberValidator,
    [AppSystemProp.API_RATE_LIMIT_AUTHN_WINDOW]: stringValidator,
    [AppSystemProp.API_RATE_LIMIT_AUTHN_ENABLED]: booleanValidator,
    [AppSystemProp.MAX_FILE_SIZE_MB]: numberValidator,
    [AppSystemProp.SMTP_SENDER_NAME]: stringValidator,
    [AppSystemProp.SMTP_SENDER_EMAIL]: stringValidator,
    [AppSystemProp.SMTP_HOST]: stringValidator,
    [AppSystemProp.SMTP_PASSWORD]: stringValidator,
    [AppSystemProp.SMTP_PORT]: numberValidator,
    [AppSystemProp.SMTP_USERNAME]: stringValidator,
    [AppSystemProp.SHOW_PLATFORM_DEMO]: booleanValidator,
}

const validateSystemPropTypes = () => {
    const systemProperties: SystemProp[] = [
        ...Object.values(SharedSystemProp),
        ...Object.values(AppSystemProp),
    ]
    const errors: {
        [key in SystemProp]?: string
    } = {}

    for (const prop of systemProperties) {
        const value = system.get(prop)
        const onlyValidateIfValueIsSet = !isNil(value)
        if (onlyValidateIfValueIsSet) {
            const validationResult = systemPropValidators[prop](value)
            if (validationResult !== true) {
                errors[
                    prop
                ] = `Current value: ${value}. Expected: ${validationResult}`
            }
        }
    }
    return errors
}

export const validateEnvPropsOnStartup = async (): Promise<void> => {
    const errors = validateSystemPropTypes()
    if (Object.keys(errors).length > 0) {
        logger.warn(
            {
                errors,
            },
            '[validateEnvPropsOnStartup]'
        )
    }

    const jwtSecret = await jwtUtils.getJwtSecret()
    if (isNil(jwtSecret)) {
        throw new Error(
            JSON.stringify({
                message:
                    'PU_JWT_SECRET is undefined, please define it in the environment variables',
                docUrl: 'https://www.activepieces.com/docs/install/configuration/environment-variables',
            })
        )
    }
}
