import { isNil } from '@pickup/shared'
import { t } from 'i18next'
import {
    BookOpen,
    CalendarRange,
    Home,
    MailWarning,
    Wrench,
    Shapes,
} from 'lucide-react'
import { Navigate } from 'react-router-dom'

import { authenticationSession } from '@/lib/authentication-session'

import { AllowOnlyLoggedInUserOnlyGuard } from './allow-logged-in-user-only-guard'
import { Sidebar, SidebarLink } from './sidebar'

type DashboardContainerProps = {
    children: React.ReactNode
}

export function DashboardContainer({ children }: DashboardContainerProps) {
    const currentClassroomId = authenticationSession.getClassroomId()
    if (isNil(currentClassroomId) || currentClassroomId === '') {
        return <Navigate to="/sign-in" replace />
    }
    const links: SidebarLink[] = [
        {
            to: '/home',
            label: t('Home'),
            icon: Home,
        },

        {
            to: '/materials',
            label: t('Materials'),
            icon: BookOpen,
        },
        {
            to: '/events/list/1',
            label: t('Events'),
            icon: CalendarRange,
        },
        {
            to: '/complaints',
            label: t('Complaints'),
            icon: MailWarning,
        },
        {
            to: '/classroom',
            label: t('Classrooms'),
            icon: Shapes,
        },
        {
            to: '/settings',
            label: t('Settings'),
            icon: Wrench,
        },
    ]

    return (
        <AllowOnlyLoggedInUserOnlyGuard>
            <Sidebar isHomeDashboard={true} links={links}>
                {children}
            </Sidebar>
        </AllowOnlyLoggedInUserOnlyGuard>
    )
}
