import { t } from 'i18next';
import {
  Settings,
  SunMoon,
  Users,
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

import SidebarLayout, { SidebarItem } from '@/app/components/sidebar-layout';
import { isNil } from '@pickup/shared';

import { authenticationSession } from '../../lib/authentication-session';

const iconSize = 20;

const sidebarNavItems = [
  {
    title: t('General'),
    href: '/settings/general',
    icon: <Settings size={iconSize} />,
  },
  {
    title: t('Appearance'),
    href: '/settings/appearance',
    icon: <SunMoon size={iconSize} />,
  },
  {
    title: t('Classmates'),
    href: '/settings/classmates',
    icon: <Users size={iconSize} />,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function ProjectSettingsLayout({
  children,
}: SettingsLayoutProps) {
  const currentClassroomId = authenticationSession  .getClassroomId();
  if (isNil(currentClassroomId)) {
    return <Navigate to="/sign-in" replace />;
  }

  const addClassroomIdToHref = (item: SidebarItem) => ({
    ...item,
    href: `/classrooms/${currentClassroomId}${item.href}`,
  });

  const filteredNavItems = sidebarNavItems
    .map(addClassroomIdToHref);

  return (
    <SidebarLayout title={t('Settings')} items={filteredNavItems}>
      {children}
    </SidebarLayout>
  );
}
