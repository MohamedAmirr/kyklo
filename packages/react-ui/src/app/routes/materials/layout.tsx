import { t } from "i18next";
import { Calendar, Plus, Puzzle, Settings, SunMoon, Users } from "lucide-react";

import SidebarLayout, {
  SideBarContent,
  SidebarItem,
} from "@/app/components/sidebar-layout";

import MaterialsPage from ".";

import { PageHeader } from "./materials-header";
import { Button } from "@/components/ui/button";

const iconSize = 20;

export default function MaterialsPageLayout() {
  const sidebarNavItems: SidebarItem[] = [
    {
      title: t("Subjects"),
      href: "/materials/subjects",
      icon: <Settings size={iconSize} />,
    },
    {
      title: t("Assignments"),
      href: "/materials/assignments",
      icon: <SunMoon size={iconSize} />,
    },
    {
      title: t("Quizzes"),
      href: "/materials/quizzes",
      icon: <Users size={iconSize} />,
    },
    {
      title: t("Exams"),
      href: "/materials/exams",
      icon: <Puzzle size={iconSize} />,
    },
  ];

  const sidebarNavContent: SideBarContent[] = [
    {
      href: "/materials/subjects",
      content: <MaterialsPage />,
    },
    {
      href: "/materials/assignments",
      content: <MaterialsPage />,
    },
    {
      href: "/materials/quizzes",
      content: <MaterialsPage />,
    },
    {
      href: "/materials/exams",
      content: <MaterialsPage />,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHeader>
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] p-1 flex items-center justify-center bg-red-500 text-white rounded-xs">
              <Calendar size={24} />
            </div>
            <span className="text-lg font-semibold">Class 1/11</span>
          </div>

          <div className="grow"></div>

          <Button>
            <Plus size={16} className="mr-2" />
            <span>Create Material</span>
          </Button>
        </div>
      </PageHeader>
      <SidebarLayout items={sidebarNavItems} content={sidebarNavContent} />
    </div>
  );
}
