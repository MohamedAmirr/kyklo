import { PuEdition, PuFlagId, isNil } from '@pickup/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import React from 'react';
import { useParams, Navigate, useSearchParams } from 'react-router-dom';

import { useToast } from '@/components/ui/use-toast';
import { flagsHooks } from '@/hooks/flags-hooks';
import { api } from '@/lib/api';
import { authenticationSession } from '@/lib/authentication-session';

const TokenCheckerWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const currentClassroomId = authenticationSession.getClassroomId();
  const { data: edition } = flagsHooks.useFlag<PuEdition>(PuFlagId.EDITION);

  const { toast } = useToast();
  const { data: isClassroomValid, isError } = useSuspenseQuery<boolean, Error>({
    queryKey: ['switch-to-classroom', classroomId],
    queryFn: async () => {
      if (edition === PuEdition.COMMUNITY) {
        return true;
      }
      if (isNil(classroomId)) {
        return false;
      }
      try {
        // authenticationSession.switchToSession(classroomId!);
        return true;
      } catch (error) {
        if (api.isError(error) && error.response?.status === 401) {
          toast({
            duration: 3000,
            title: t('Invalid Access'),
            description: t(
              'Either the classroom does not exist or you do not have access to it.',
            ),
          });
          // TODO: Add authenticationSession.clearSession();
        }
        return false;
      }
    },
    retry: false,
    staleTime: Infinity,
  });

  if (isNil(currentClassroomId) || isNil(classroomId)) {
    return <Navigate to="/sign-in" replace />;
  }

  if (isError || !isClassroomValid) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

type RedirectToCurrentClassroomRouteProps = {
  path: string;
  children: React.ReactNode;
};
const RedirectToCurrentClassroomRoute: React.FC<
  RedirectToCurrentClassroomRouteProps
> = ({ path }) => {
  const currentClassroomId = authenticationSession.getClassroomId();
  const params = useParams();
  const [searchParams] = useSearchParams();
  if (isNil(currentClassroomId)) {
    return <Navigate to="/sign-in" replace />;
  }

  const pathWithParams = `${path.startsWith('/') ? path : `/${path}`}`.replace(
    /:(\w+)/g,
    (_, param) => params[param] ?? '',
  );

  const searchParamsString = searchParams.toString();
  const pathWithParamsAndSearchParams = `${pathWithParams}${
    searchParamsString ? `?${searchParamsString}` : ''
  }`;

  return (
    <Navigate
      to={`/classroom/${currentClassroomId}${pathWithParamsAndSearchParams}`}
      replace
    />
  );
};

interface ProjectRouterWrapperProps {
  path: string;
  element: React.ReactNode;
}

export const ProjectRouterWrapper = ({
  element,
  path,
}: ProjectRouterWrapperProps) => [
  {
    path: `/classroom/:classroomId${path.startsWith('/') ? path : `/${path}`}`,
    element: <TokenCheckerWrapper>{element}</TokenCheckerWrapper>,
  },
  {
    path,
    element: (
      <RedirectToCurrentClassroomRoute path={path}>
        {element}
      </RedirectToCurrentClassroomRoute>
    ),
  },
];
