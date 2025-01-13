import { api } from '@/lib/api';
import { authenticationSession } from '@/lib/authentication-session';
import {
  ListProjectRequestForUserQueryParams,
  SeekPage,
  SwitchClassroomResponse,
  ActiveClassroom,
} from '@pickup/shared';

export const classroomApi = {
  current: async () => {
    return classroomApi.get(authenticationSession.getClassroomId()!);
  },
  update: async (classroomId: string, request: ActiveClassroom) => {
    return api.post<ActiveClassroom>(
      `/v1/users/classrooms/${classroomId}`,
      request,
    );
  },
  list(request: ListProjectRequestForUserQueryParams) {
    return api.get<SeekPage<ActiveClassroom>>('/v1/users/classrooms', request);
  },
  get: async (classroomId: string) => {
    return api.get<ActiveClassroom>(`/v1/users/classrooms/${classroomId}`);
  },
  getTokenForClassroom: async (classroomId: string) => {
    return api.post<SwitchClassroomResponse>(
      `/v1/users/classrooms/${classroomId}/token`,
      {
        classroomId,
      },
    );
  },
};
