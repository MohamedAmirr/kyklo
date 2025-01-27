import { useMemo } from 'react'
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
    useLocation,
} from 'react-router-dom'

import { AllowOnlyLoggedInUserOnlyGuard } from '@/app/components/allow-logged-in-user-only-guard'
import { PageTitle } from '@/app/components/page-title'
import ClassroomPage from '@/app/routes/classroom'
import { RedirectPage } from '@/app/routes/redirect'
import { VerifyEmail } from '@/features/authentication/components/verify-email'

import { DashboardContainer } from '../components/dashboard-container'
import NotFoundPage from '../routes/404-page'
import AuthenticatePage from '../routes/authenticate'
import { ChangePasswordPage } from '../routes/change-password'
import ComplaintLayout from '../routes/complaints/complaint-layout'
import AddEventPage from '../routes/events/create-event'
import EventDetails from '../routes/events/event-details'
import EventPageLayout from '../routes/events/layout'
import { ResetPasswordPage } from '../routes/forget-password'
import HomePage from '../routes/home'
import MaterialsPageLayout from '../routes/materials/layout'
import { SignInPage } from '../routes/sign-in'

import { ProjectRouterWrapper } from './classroom-route-wrapper'

const SettingsRerouter = () => {
    const { hash } = useLocation()
    const fragmentWithoutHash = hash.slice(1).toLowerCase()
    return fragmentWithoutHash ? (
        <Navigate to={`/settings/${fragmentWithoutHash}`} replace />
    ) : (
        <Navigate to="/settings/general" replace />
    )
}

const routes = [
    {
        path: '/home',
        element: (
            <AllowOnlyLoggedInUserOnlyGuard>
                <DashboardContainer>
                    <PageTitle title="Home">
                        <HomePage />
                    </PageTitle>
                </DashboardContainer>
            </AllowOnlyLoggedInUserOnlyGuard>
        ),
    },
    {
        path: '/materials',
        element: (
            <DashboardContainer>
                <PageTitle title="Materials">
                    <MaterialsPageLayout />
                </PageTitle>
            </DashboardContainer>
        ),
    },
    {
        path: '/events/list/:page',
        element: (
            <DashboardContainer>
                <PageTitle title="Events">
                    <EventPageLayout />
                </PageTitle>
            </DashboardContainer>
        ),
    },
    {
        path: '/events/:id',
        element: (
            <DashboardContainer>
                <PageTitle title="Event Details">
                    <EventDetails />
                </PageTitle>
            </DashboardContainer>
        ),
    },
    {
        path: '/events/create',
        element: (
            <DashboardContainer>
                <PageTitle title="Create Event">
                    <AddEventPage />
                </PageTitle>
            </DashboardContainer>
        ),
    },
    {
        path: '/complaints',
        element: (
            <DashboardContainer>
                <PageTitle title="Complaints">
                    <ComplaintLayout />
                </PageTitle>
            </DashboardContainer>
        ),
    },
    {
        path: '/classroom',
        element: (
            <DashboardContainer>
                <PageTitle title="Classrooms">
                    <ClassroomPage />
                </PageTitle>
            </DashboardContainer>
        ),
    },
    {
        path: '/authenticate',
        element: <AuthenticatePage />,
    },
    ...ProjectRouterWrapper({
        path: '/settings',
        element: (
            <DashboardContainer>
                <SettingsRerouter></SettingsRerouter>
            </DashboardContainer>
        ),
    }),
    {
        path: '/forget-password',
        element: (
            <PageTitle title="Forget Password">
                <ResetPasswordPage />
            </PageTitle>
        ),
    },
    {
        path: '/reset-password',
        element: (
            <PageTitle title="Reset Password">
                <ChangePasswordPage />
            </PageTitle>
        ),
    },
    {
        path: '/sign-in',
        element: (
            <PageTitle title="Sign In">
                <SignInPage />
            </PageTitle>
        ),
    },
    {
        path: '/verify-email',
        element: (
            <PageTitle title="Verify Email">
                <VerifyEmail />
            </PageTitle>
        ),
    },
    {
        path: '/404',
        element: (
            <PageTitle title="Not Found">
                <NotFoundPage />
            </PageTitle>
        ),
    },
    {
        path: '/redirect',
        element: <RedirectPage></RedirectPage>,
    },
    {
        path: '/*',
        element: (
            <PageTitle title="Redirect">
                <Navigate to="/home" replace />
            </PageTitle>
        ),
    },
]
const PuRouter = () => {
    const router = useMemo(() => {
        return createBrowserRouter(routes)
    }, [])

    return <RouterProvider router={router}></RouterProvider>
}

export { PuRouter }
