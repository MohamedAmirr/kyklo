import { t } from "i18next";
import { Calendar, Plus } from "lucide-react";

import { PgaeHeader } from "@/app/components/page-layout/materials/header";
import EventsPage from ".";
import { Button } from "@/components/ui/button";

const iconSize = 20;

export default function EventPageLayout() {
  return (
    <div className="flex flex-col w-full">
      <PgaeHeader>
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
            <span>New Event</span>
          </Button>
        </div>
      </PgaeHeader>
      <EventsPage />
    </div>
  );
}
