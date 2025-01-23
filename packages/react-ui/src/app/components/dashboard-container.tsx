import { isNil } from '@pickup/shared';
import { t } from 'i18next';
import { BookOpen, Home, MessageCircleQuestion, Wrench } from 'lucide-react';
import { Navigate } from 'react-router-dom';

import { authenticationSession } from '@/lib/authentication-session';

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
    },
    {
      to: '/materials',
      label: t('Materials'),
      icon: BookOpen,
    },
    {
      to: '/tickets',
      label: t('Tickets'),
      icon: MessageCircleQuestion,
    },
    {
      to: '/settings',
      label: t('Settings'),
      icon: Wrench,
    },
  ];

  return (
    <AllowOnlyLoggedInUserOnlyGuard>
      <Sidebar isHomeDashboard={true} links={links}>
        {children}
      </Sidebar>
    </AllowOnlyLoggedInUserOnlyGuard>
  );
}
