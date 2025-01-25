import { Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import EventsPage from ".";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../materials/materials-header";

const iconSize = 20;

export default function EventPageLayout() {
  const navigate = useNavigate();

  const handleAddEvent = () => {
    navigate("/events/create");
  };

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

          <Button onClick={handleAddEvent}>
            <Plus size={16} className="mr-2" />
            <span>New Event</span>
          </Button>
        </div>
      </PageHeader>
      <EventsPage />
    </div>
  );
}