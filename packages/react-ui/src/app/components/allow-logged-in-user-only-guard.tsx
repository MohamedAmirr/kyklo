import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { SocketProvider } from '@/components/socket-provider'
import { flagsHooks } from '@/hooks/flags-hooks'
import { authenticationSession } from '@/lib/authentication-session'

import { LoadingScreen } from './loading-screen'

// import { platformHooks } from '@/hooks/platform-hooks';
// import { classroomHooks } from '@/hooks/project-hooks';

function isJwtExpired(token: string): boolean {
    if (!token) {
        return true
    }
    try {
        const decoded = jwtDecode(token)
        if (
            decoded &&
            decoded.exp &&
            dayjs().isAfter(dayjs.unix(decoded.exp))
        ) {
            return true
        }
        return false
    } catch (e) {
        console.error(e)
        return true
    }
}

type AllowOnlyLoggedInUserOnlyGuardProps = {
    children: React.ReactNode
}
export const AllowOnlyLoggedInUserOnlyGuard = ({
    children,
}: AllowOnlyLoggedInUserOnlyGuardProps) => {
    if (!authenticationSession.isLoggedIn()) {
        return <Navigate to="/sign-in" replace />
    }
    const token = authenticationSession.getToken()
    if (!token || isJwtExpired(token)) {
        authenticationSession.logOut()
        return <Navigate to="/sign-in" replace />
    }
    // classroomHooks.prefetchClassroom();
    // platformHooks.prefetchPlatform();
    flagsHooks.useFlags()
    return (
        <Suspense fallback={<LoadingScreen></LoadingScreen>}>
            <SocketProvider>{children}</SocketProvider>
        </Suspense>
    )
}
