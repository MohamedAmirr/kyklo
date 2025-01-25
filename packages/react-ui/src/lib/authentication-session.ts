import { ApiResponse, AuthenticationResponse, isNil } from '@pickup/shared'
import { jwtDecode } from 'jwt-decode'
import { authenticationApi } from './authentication-api'

const tokenKey = 'token'
const currentUserKey = 'currentUser'
export const authenticationSession = {
    saveResponse(response: ApiResponse<AuthenticationResponse>) {
        localStorage.setItem(tokenKey, response.data.token)
        localStorage.setItem(
            currentUserKey,
            JSON.stringify({
                ...response.data,
                token: undefined,
            })
        )
        window.dispatchEvent(new Event('storage'))
    },
    getToken(): string | null {
        return localStorage.getItem(tokenKey) ?? null
    },
    getSchoolId(): string | null {
        const token = this.getToken()
        if (isNil(token)) {
            return null
        }
        const decodedJwt = jwtDecode<{ schoolId: string }>(token)
        return decodedJwt.schoolId
    },
    getClassroomId(): string | null {
        const token = this.getToken()
        if (isNil(token)) {
            return null
        }
        const decodedJwt = jwtDecode<{ classroomId: string }>(token)
        return decodedJwt.classroomId
    },
    appendProjectRoutePrefix(path: string): string {
        const schoolId = this.getSchoolId()
        if (isNil(schoolId)) {
            return path
        }
        return `/schools/${schoolId}${path.startsWith('/') ? path : `/${path}`}`
    },
    isLoggedIn(): boolean {
        return !!this.getToken() && !!this.getCurrentUser()
    },
    clearSession() {
        localStorage.removeItem(tokenKey)
        localStorage.removeItem(currentUserKey)
    },
    logOut() {
        this.clearSession()
        window.location.href = '/sign-in'
    },
    getCurrentUser(): AuthenticationResponse | null {
        const user = localStorage.getItem(currentUserKey)
        if (user) {
            try {
                return JSON.parse(user)
            } catch (e) {
                console.error(e)
                return null
            }
        }
        return null
    },
    async switchToSession(classroomId: string) {
        if (authenticationSession.getClassroomId() === classroomId) {
            return
        }
        const result = await authenticationApi.switchClassroom({ classroomId })
        localStorage.setItem(tokenKey, result.token)
        localStorage.setItem(
            currentUserKey,
            JSON.stringify({
                ...this.getCurrentUser(),
                classroomId,
            })
        )
        window.dispatchEvent(new Event('storage'))
    },
}
