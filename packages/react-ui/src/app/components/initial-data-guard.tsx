import { Suspense } from 'react';

import { LoadingScreen } from './loading-screen';
import React from 'react';
import { flagsHooks } from '@/hooks/flags-hooks';

type InitialDataGuardProps = {
  children: React.ReactNode;
};
export const InitialDataGuard = ({ children }: InitialDataGuardProps) => {
  flagsHooks.prefetchFlags();
  return (
    <Suspense fallback={<LoadingScreen></LoadingScreen>}>{children}</Suspense>
  );
};
