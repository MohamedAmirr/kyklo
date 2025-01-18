import {Button} from "@/components/ui/button";

interface OpenClosedTicketsProps {
    numberOfOpenedTickets: number;
    numberOfClosedTickets: number;
    selectedStatus: 'opened' | 'closed';
    onFilterChange: (status: "opened" | "closed") => void;
    className?: string;
}

const OpenClosedTickets = ({
                               numberOfOpenedTickets,
                               numberOfClosedTickets,
                               selectedStatus,
                               onFilterChange,
                               className,
                           }: OpenClosedTicketsProps) => {


    return (
        <div className={`relative flex items-center p-1 gap-1 h-9 rounded-md bg-gray-200 ${className}`}>
            <div
                className={`
                absolute top-1 h-7 w-[calc(50%-4px)] bg-white rounded-md transition-all duration-500
                ${selectedStatus === "opened" ? "translate-x-0" : "translate-x-full"}
                `}
            ></div>

            <Button
                variant={`${selectedStatus === "opened" ? "transparent" : "ghost"}`}
                onClick={() => onFilterChange("opened")}
                className={`
                relative z-10 flex-1 h-full text-black rounded-md
                ${selectedStatus === "opened" ? "font-bold" : "font-normal"}
                `}
                size={"sm"}
            >
                Opened ({numberOfOpenedTickets})
            </Button>

            {/* Closed Button */}
            <Button
                variant={`${selectedStatus === "closed" ? "transparent" : "ghost"}`}
                onClick={() => onFilterChange("closed")}
                className={`
                relative z-10 flex-1 h-full text-black rounded-md
                ${selectedStatus === "closed" ? "font-bold" : "font-normal"}
                `}
                size={"sm"}
            >
                Closed ({numberOfClosedTickets})
            </Button>
        </div>
    );
};

export default OpenClosedTickets;
