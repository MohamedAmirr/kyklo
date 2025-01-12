import { Permission } from '../common/security/permission'

export enum DefaultClassroomRole {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
}

export enum RoleType {
    DEFAULT = 'DEFAULT',
    CUSTOM = 'CUSTOM',
}

export const rolePermissions: Record<DefaultClassroomRole, Permission[]> = {
    [DefaultClassroomRole.STUDENT]: [
        Permission.READ_CLASSROOM,
        Permission.READ_CLASSROOM_MEMBER,
        Permission.READ_INVITATION,
    ],
    [DefaultClassroomRole.TEACHER]: [
        Permission.READ_CLASSROOM,
        Permission.WRITE_CLASSROOM,
        Permission.READ_CLASSROOM_MEMBER,
        Permission.WRITE_CLASSROOM_MEMBER,
        Permission.READ_INVITATION,
    ],
}
