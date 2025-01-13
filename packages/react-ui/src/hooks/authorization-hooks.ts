import React from 'react';

import { authenticationSession } from '@/lib/authentication-session';
import { rolePermissions, Permission } from '@pickup/shared';

export const useAuthorization = () => {
  const role = authenticationSession.getUserClassroomRole();

  const checkAccess = React.useCallback(
    (permission: Permission) => {
      if (!role) return true;

      return rolePermissions[role].includes(permission);
    },
    [role],
  );

  return { checkAccess, role };
};