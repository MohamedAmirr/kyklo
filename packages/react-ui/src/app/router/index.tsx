import { useEffect, useMemo } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
  useLocation,
} from 'react-router-dom';

import { PageTitle } from '@/app/components/page-title';
import ClassroomSettingsLayout from '@/app/components/classroom-settings-layout';
import { RedirectPage } from '@/app/routes/redirect';
import { VerifyEmail } from '@/features/authentication/components/verify-email';

import { AllowOnlyLoggedInUserOnlyGuard } from '../components/allow-logged-in-user-only-guard';
import { DashboardContainer } from '../components/dashboard-container';
import NotFoundPage from '../routes/404-page';
import AuthenticatePage from '../routes/authenticate';
import { ChangePasswordPage } from '../routes/change-password';
import { ResetPasswordPage } from '../routes/forget-password';
import { SignInPage } from '../routes/sign-in';
import { SignUpPage } from '../routes/sign-up';

import { ProjectRouterWrapper } from './classroom-route-wrapper';
import HomePage from '../routes/home';
import TicketPage from '../routes/ticket';

const SettingsRerouter = () => {
  const { hash } = useLocation();
  const fragmentWithoutHash = hash.slice(1).toLowerCase();
  return fragmentWithoutHash ? (
    <Navigate to={`/settings/${fragmentWithoutHash}`} replace />
  ) : (
    <Navigate to="/settings/general" replace />
  );
};

const routes = [
  {
    path: '/home',
    element: (
      <DashboardContainer>
        <PageTitle title="Home">
          <HomePage />
        </PageTitle>
      </DashboardContainer>
    ),
  },
  {
    path: '/ticket',
    element: (
      <DashboardContainer>
        <PageTitle title="Ticket">
          <TicketPage />
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
    path: '/sign-up',
    element: (
      <PageTitle title="Sign Up">
        <SignUpPage />
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
];
const ApRouter = () => {
  const router = useMemo(() => {
    return createBrowserRouter(routes);
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
};

export { ApRouter };
