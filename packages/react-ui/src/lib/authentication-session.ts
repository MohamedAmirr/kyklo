import { jwtDecode } from 'jwt-decode';

import { classroomApi } from '@/lib/classroom-api';
import {
  AuthenticationResponse,
  isNil,
  ClassroomMemberRole,
} from '@pickup/shared';

const tokenKey = 'token';
const currentUserKey = 'currentUser';
export const authenticationSession = {
  saveResponse(response: AuthenticationResponse) {
    localStorage.setItem(tokenKey, response.token);
    localStorage.setItem(
      currentUserKey,
      JSON.stringify({
        ...response,
        token: undefined,
      }),
    );
    window.dispatchEvent(new Event('storage'));
  },
  getToken(): string | null {
    return localStorage.getItem(tokenKey) ?? null;
  },
  getClassroomId(): string | null {
    const token = this.getToken();
    if (isNil(token)) {
      return null;
    }
    const decodedJwt = jwtDecode<{ classroomId: string }>(token);
    return decodedJwt.classroomId;
  },
  getPlatformId(): string | null {
    return this.getCurrentUser()?.platformId ?? null;
  },
  getUserClassroomRole(): ClassroomMemberRole | null {
    return this.getCurrentUser()?.classroomRole ?? null;
  },
  async switchToSession(classroomId: string) {
    const result = await classroomApi.getTokenForClassroom(classroomId);
    localStorage.setItem(tokenKey, result.token);
    localStorage.setItem(
      currentUserKey,
      JSON.stringify({
        ...this.getCurrentUser(),
        classroomId,
        classroomRole: result.classroomRole,
      }),
    );
    window.dispatchEvent(new Event('storage'));
  },
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  },
  clearSession() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(currentUserKey);
  },
  logOut() {
    this.clearSession();
    window.location.href = '/sign-in';
  },
  getCurrentUser(): AuthenticationResponse | null {
    const user = localStorage.getItem(currentUserKey);
    if (user) {
      try {
        return JSON.parse(user);
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    return null;
  },
};
