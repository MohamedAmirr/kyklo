import { Static, Type } from '@sinclair/typebox';
import {
  BaseModelSchema,
  ClassroomRole,
  User,
} from '@pickup/shared';

export const ListAuditEventsRequest = Type.Object({
  limit: Type.Optional(Type.Number()),
  cursor: Type.Optional(Type.String()),
  action: Type.Optional(Type.String()),
  classroomId: Type.Optional(Type.Array(Type.String())),
  userId: Type.Optional(Type.String()),
  createdBefore: Type.Optional(Type.String()),
  createdAfter: Type.Optional(Type.String()),
});

export type ListAuditEventsRequest = Static<typeof ListAuditEventsRequest>;

const UserMeta = Type.Pick(User, ['email', 'id', 'firstName', 'lastName']);

export enum ApplicationEventName {
  USER_SIGNED_IN = 'user.signed.in',
  USER_PASSWORD_RESET = 'user.password.reset',
  USER_EMAIL_VERIFIED = 'user.email.verified',
  CLASSROOM_ROLE_CREATED = 'classroom.role.created',
  CLASSROOM_ROLE_DELETED = 'classroom.role.deleted',
  CLASSROOM_ROLE_UPDATED = 'classroom.role.updated',
}

const BaseAuditEventProps = {
  ...BaseModelSchema,
  platformId: Type.String(),
  classroomId: Type.Optional(Type.String()),
  classroomDisplayName: Type.Optional(Type.String()),
  userId: Type.Optional(Type.String()),
  userEmail: Type.Optional(Type.String()),
  ip: Type.Optional(Type.String()),
};

export const AuthenticationEvent = Type.Object({
  ...BaseAuditEventProps,
  action: Type.Union([
    Type.Literal(ApplicationEventName.USER_SIGNED_IN),
    Type.Literal(ApplicationEventName.USER_PASSWORD_RESET),
    Type.Literal(ApplicationEventName.USER_EMAIL_VERIFIED),
  ]),
  data: Type.Object({
    user: Type.Optional(UserMeta),
  }),
});

export type AuthenticationEvent = Static<typeof AuthenticationEvent>;

export const ClassroomRoleEvent = Type.Object({
  ...BaseAuditEventProps,
  action: Type.Union([
    Type.Literal(ApplicationEventName.CLASSROOM_ROLE_CREATED),
    Type.Literal(ApplicationEventName.CLASSROOM_ROLE_UPDATED),
    Type.Literal(ApplicationEventName.CLASSROOM_ROLE_DELETED),
  ]),
  data: Type.Object({
    classroomRole: Type.Pick(ClassroomRole, [
      'id',
      'created',
      'updated',
      'name',
      'permissions',
      'platformId',
    ]),
  }),
});

export type ClassroomRoleEvent = Static<typeof ClassroomRoleEvent>;


export const ApplicationEvent = Type.Union([
  AuthenticationEvent,
  ClassroomRoleEvent,
]);

export type ApplicationEvent = Static<typeof ApplicationEvent>;

export function summarizeApplicationEvent(event: ApplicationEvent) {
  switch (event.action) {
    case ApplicationEventName.USER_SIGNED_IN:
      return `User ${event.userEmail} signed in`;
    case ApplicationEventName.USER_PASSWORD_RESET:
      return `User ${event.userEmail} reset password`;
    case ApplicationEventName.USER_EMAIL_VERIFIED:
      return `User ${event.userEmail} verified email`;
    case ApplicationEventName.CLASSROOM_ROLE_CREATED:
      return `${event.data.classroomRole.name} is created`;
    case ApplicationEventName.CLASSROOM_ROLE_UPDATED:
      return `${event.data.classroomRole.name} is updated`;
    case ApplicationEventName.CLASSROOM_ROLE_DELETED:
      return `${event.data.classroomRole.name} is deleted`;
  }
}

