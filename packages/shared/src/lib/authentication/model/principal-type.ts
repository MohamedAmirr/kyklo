export enum PrincipalType {
    USER = 'USER',
    SERVICE = 'SERVICE',
    UNKNOWN = 'UNKNOWN',
}

export const ALL_PRINCIPAL_TYPES = Object.values(PrincipalType)

export const SERVICE_KEY_SECURITY_OPENAPI = {
    apiKey: [],
}

export enum EndpointScope {
    PLATFORM = 'PLATFORM',
    CLASSROOM = 'CLASSROOM',
}