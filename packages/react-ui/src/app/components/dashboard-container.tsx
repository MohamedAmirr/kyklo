import { t } from 'i18next';
import { Home, Logs, Wrench } from 'lucide-react';
import { Navigate } from 'react-router-dom';

import { isNil } from '@pickup/shared';

import { authenticationSession } from '../../lib/authentication-session';

import { AllowOnlyLoggedInUserOnlyGuard } from './allow-logged-in-user-only-guard';
import { Sidebar, SidebarLink } from './sidebar';

type DashboardContainerProps = {
  children: React.ReactNode;
};

export function DashboardContainer({ children }: DashboardContainerProps) {
  const currentClassroomId = authenticationSession.getClassroomId();
  if (isNil(currentClassroomId) || currentClassroomId === '') {
    return <Navigate to="/sign-in" replace />;
  }
  const links: SidebarLink[] = [
    {
      to: '/home',
      label: t('Home'),
      icon: Home,
      showInEmbed: true,
    },
    {
      to: '/runs',
      label: t('Runs'),
      icon: Logs,
      showInEmbed: true,
    },
    {
      to: '/settings',
      label: t('Settings'),
      icon: Wrench,
      showInEmbed: false,
    },
  ]
    .map((link) => {
      return {
        ...link,
        to: `/classrooms/${currentClassroomId}${link.to}`,
      };
    });

  return (
    <AllowOnlyLoggedInUserOnlyGuard>
      <Sidebar
        isHomeDashboard={true}
        links={links}
      >
        {children}
      </Sidebar>
    </AllowOnlyLoggedInUserOnlyGuard>
  );
}
