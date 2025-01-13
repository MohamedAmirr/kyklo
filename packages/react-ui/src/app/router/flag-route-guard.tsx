import { Navigate } from 'react-router-dom';

import { PuFlagId } from '@pickup/shared';

import { flagsHooks } from '@/hooks/flags-hooks';

export const FlagRouteGuard = ({
  flag,
  children,
}: {
  flag: PuFlagId;
  children: React.ReactNode;
}) => {
  const { data: flagValue } = flagsHooks.useFlag<boolean>(flag);
  if (!flagValue) {
    return <Navigate to="/" replace />;
  }
  return children;
};
