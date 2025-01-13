import {
  useQuery,
  QueryClient,
  usePrefetchQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { authenticationSession } from '@/lib/authentication-session';
import { UpdatePlatformRequestBody } from '@pickup/shared';
import { ActiveClassroom } from '@pickup/shared';

import { classroomApi } from '../lib/classroom-api';

export const classroomHooks = {
  prefetchClassroom: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePrefetchQuery<ActiveClassroom, Error>({
      queryKey: ['current-classroom'],
      queryFn: classroomApi.current,
      staleTime: Infinity,
    });
  },
  useCurrentClassroom: () => {
    const query = useSuspenseQuery<ActiveClassroom, Error>({
      queryKey: ['current-classroom'],
      queryFn: classroomApi.current,
      staleTime: Infinity,
    });
    return {
      ...query,
      classroom: query.data,
      updateClassroom,
      setCurrentClassroom,
    };
  },
  useClassrooms: () => {
    return useQuery<ActiveClassroom[], Error>({
      queryKey: ['classrooms'],
      queryFn: async () => {
        const results = await classroomApi.list({
          cursor: undefined,
          limit: 1000,
        });
        return results.data;
      },
    });
  },
};

const updateClassroom = async (
  queryClient: QueryClient,
  request: UpdatePlatformRequestBody,
) => {
  queryClient.setQueryData(['current-classroom'], {
    ...queryClient.getQueryData(['current-classroom'])!,
    ...request,
  });
};

const setCurrentClassroom = async (
  queryClient: QueryClient,
  classroom: ActiveClassroom,
  pathName?: string,
) => {
  await authenticationSession.switchToSession(classroom.id);
  queryClient.setQueryData(['current-classroom'], classroom);
  if (pathName) {
    const pathNameWithNewProjectId = pathName.replace(
      /\/classrooms\/\w+/,
      `/classrooms/${classroom.id}`,
    );
    window.location.href = pathNameWithNewProjectId;
  }
};
