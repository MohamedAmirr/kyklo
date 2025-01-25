import { t } from 'i18next';
import { Puzzle, Settings, SunMoon, Users } from 'lucide-react';

import SidebarLayout, {
  SideBarContent,
  SidebarItem,
} from '@/app/components/sidebar-layout';

import MaterialsPage from '.';

import { MaterialsHeader } from './materials-header';

const iconSize = 20;

export default function MaterialsPageLayout() {
  const sidebarNavItems: SidebarItem[] = [
    {
      title: t('Subjects'),
      href: '/materials/subjects',
      icon: <Settings size={iconSize} />,
    },
    {
      title: t('Assignments'),
      href: '/materials/assignments',
      icon: <SunMoon size={iconSize} />,
    },
    {
      title: t('Quizzes'),
      href: '/materials/quizzes',
      icon: <Users size={iconSize} />,
    },
    {
      title: t('Exams'),
      href: '/materials/exams',
      icon: <Puzzle size={iconSize} />,
    },
  ];

  const sidebarNavContent: SideBarContent[] = [
    {
      href: '/materials/subjects',
      content: <MaterialsPage />,
    },
    {
      href: '/materials/assignments',
      content: <MaterialsPage />,
    },
    {
      href: '/materials/quizzes',
      content: <MaterialsPage />,
    },
    {
      href: '/materials/exams',
      content: <MaterialsPage />,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <MaterialsHeader />
      <SidebarLayout items={sidebarNavItems} content={sidebarNavContent} />
    </div>
  );
}
