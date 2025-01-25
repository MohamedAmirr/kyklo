import { FileId } from '../file'
import { UserId } from '../user'
import { Permission } from './security'
import { ClassroomId } from '../classroom'

export class PickUpError extends Error {
    constructor(public error: PickUpErrorParams, message?: string) {
        super(error.code + (message ? `: ${message}` : ''))
    }
}

export type PickUpErrorParams =
    | AuthenticationParams
    | AuthorizationErrorParams
    | EmailIsNotVerifiedErrorParams
    | EntityNotFoundErrorParams
    | ExistingUserErrorParams
    | FileNotFoundErrorParams
    | InvalidBearerTokenParams
    | InvalidClaimParams
    | InvalidCloudClaimParams
    | InvalidCredentialsErrorParams
    | InvalidJwtTokenErrorParams
    | InvalidOtpParams
    | PermissionDeniedErrorParams
    | FeatureDisabledErrorParams
    | SystemInvalidErrorParams
    | SystemPropNotDefinedErrorParams
    | ValidationErrorParams
    | UserIsInActiveErrorParams
    | EmailAuthIsDisabledParams
    | ExistingAlertChannelErrorParams
    | EmailAlreadyHasActivationKey
    | SessionExpiredParams
    | InvalidLicenseKeyParams
    | NoClassroomFoundErrorParams
    | InvalidSmtpCredentialsErrorParams
    | InvitationOnlySignUpErrorParams
export type BaseErrorParams<T, V> = {
    code: T
    params: V
}

export type InvalidClaimParams = BaseErrorParams<
    ErrorCode.INVALID_CLAIM,
    { redirectUrl: string; tokenUrl: string; clientId: string }
>
export type InvalidCloudClaimParams = BaseErrorParams<
    ErrorCode.INVALID_CLOUD_CLAIM,
    { pieceName: string }
>

export type InvalidBearerTokenParams = BaseErrorParams<
    ErrorCode.INVALID_BEARER_TOKEN,
    {
        message?: string
    }
>

export type SessionExpiredParams = BaseErrorParams<
    ErrorCode.SESSION_EXPIRED,
    {
        message?: string
    }
>

export type FileNotFoundErrorParams = BaseErrorParams<
    ErrorCode.FILE_NOT_FOUND,
    { id: FileId }
>

export type EmailAuthIsDisabledParams = BaseErrorParams<
    ErrorCode.EMAIL_AUTH_DISABLED,
    Record<string, never>
>

export type AuthorizationErrorParams = BaseErrorParams<
    ErrorCode.AUTHORIZATION,
    Record<string, string> & {
        message?: string
    }
>

export type PermissionDeniedErrorParams = BaseErrorParams<
    ErrorCode.PERMISSION_DENIED,
    {
        userId: UserId
        classroomId: ClassroomId
        permission: Permission | undefined
    }
>

export type SystemInvalidErrorParams = BaseErrorParams<
    ErrorCode.SYSTEM_PROP_INVALID,
    {
        prop: string
    }
>

export type InvalidCredentialsErrorParams = BaseErrorParams<
    ErrorCode.INVALID_CREDENTIALS,
    null
>

export type EmailIsNotVerifiedErrorParams = BaseErrorParams<
    ErrorCode.EMAIL_IS_NOT_VERIFIED,
    {
        email: string
    }
>

export type UserIsInActiveErrorParams = BaseErrorParams<
    ErrorCode.USER_IS_INACTIVE,
    {
        email: string
    }
>

export type ExistingUserErrorParams = BaseErrorParams<
    ErrorCode.EXISTING_USER,
    {
        email: string
        platformId: string | null
    }
>

export type SystemPropNotDefinedErrorParams = BaseErrorParams<
    ErrorCode.SYSTEM_PROP_NOT_DEFINED,
    {
        prop: string
    }
>

export type InvalidJwtTokenErrorParams = BaseErrorParams<
    ErrorCode.INVALID_OR_EXPIRED_JWT_TOKEN,
    {
        token: string
    }
>

export type EntityNotFoundErrorParams = BaseErrorParams<
    ErrorCode.ENTITY_NOT_FOUND,
    {
        message?: string
        entityType?: string
        entityId?: string
    }
>

export type ValidationErrorParams = BaseErrorParams<
    ErrorCode.VALIDATION,
    {
        message: string
    }
>

export type FeatureDisabledErrorParams = BaseErrorParams<
    ErrorCode.FEATURE_DISABLED,
    {
        message: string
    }
>

export type AuthenticationParams = BaseErrorParams<
    ErrorCode.AUTHENTICATION,
    {
        message: string
    }
>

export type ExistingAlertChannelErrorParams = BaseErrorParams<
    ErrorCode.EXISTING_ALERT_CHANNEL,
    {
        email: string
    }
>

export type InvalidOtpParams = BaseErrorParams<
    ErrorCode.INVALID_OTP,
    Record<string, never>
>

export type InvalidLicenseKeyParams = BaseErrorParams<
    ErrorCode.INVALID_LICENSE_KEY,
    {
        key: string
    }
>

export type EmailAlreadyHasActivationKey = BaseErrorParams<
    ErrorCode.EMAIL_ALREADY_HAS_ACTIVATION_KEY,
    {
        email: string
    }
>

export type NoClassroomFoundErrorParams = BaseErrorParams<
    ErrorCode.NO_CLASSROOM_FOUND,
    {
        email: string
        message?: string
    }
>

export type InvalidSmtpCredentialsErrorParams = BaseErrorParams<
    ErrorCode.INVALID_SMTP_CREDENTIALS,
    {
        message?: string
    }
>

export type InvitationOnlySignUpErrorParams = BaseErrorParams<
    ErrorCode.INVITATION_ONLY_SIGN_UP,
    {
        message?: string
    }
>

export enum ErrorCode {
    AUTHENTICATION = 'AUTHENTICATION',
    AUTHORIZATION = 'AUTHORIZATION',
    EMAIL_IS_NOT_VERIFIED = 'EMAIL_IS_NOT_VERIFIED',
    ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
    EXISTING_ALERT_CHANNEL = 'EXISTING_ALERT_CHANNEL',
    FILE_NOT_FOUND = 'FILE_NOT_FOUND',
    INVALID_BEARER_TOKEN = 'INVALID_BEARER_TOKEN',
    SESSION_EXPIRED = 'SESSION_EXPIRED',
    INVALID_CLAIM = 'INVALID_CLAIM',
    INVALID_CLOUD_CLAIM = 'INVALID_CLOUD_CLAIM',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    INVALID_OR_EXPIRED_JWT_TOKEN = 'INVALID_OR_EXPIRED_JWT_TOKEN',
    INVALID_OTP = 'INVALID_OTP',
    PERMISSION_DENIED = 'PERMISSION_DENIED',
    FEATURE_DISABLED = 'FEATURE_DISABLED',
    SYSTEM_PROP_INVALID = 'SYSTEM_PROP_INVALID',
    SYSTEM_PROP_NOT_DEFINED = 'SYSTEM_PROP_NOT_DEFINED',
    USER_IS_INACTIVE = 'USER_IS_INACTIVE',
    VALIDATION = 'VALIDATION',
    INVALID_LICENSE_KEY = 'INVALID_LICENSE_KEY',
    EMAIL_ALREADY_HAS_ACTIVATION_KEY = 'EMAIL_ALREADY_HAS_ACTIVATION_KEY',
    EXISTING_USER = 'EXISTING_USER',
    EMAIL_AUTH_DISABLED = 'EMAIL_AUTH_DISABLED',
    NO_CLASSROOM_FOUND = 'NO_CLASSROOM_FOUND',
    INVALID_SMTP_CREDENTIALS = 'INVALID_SMTP_CREDENTIALS',
    INVITATION_ONLY_SIGN_UP = 'INVITATION_ONLY_SIGN_UP',
}
