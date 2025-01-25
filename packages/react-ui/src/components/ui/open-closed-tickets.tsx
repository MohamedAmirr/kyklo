import { t } from 'i18next';

import { Button } from '@/components/ui/button';

interface OpenClosedTicketsProps {
  numberOfOpenedTickets: number;
  numberOfClosedTickets: number;
  selectedStatus: 'open' | 'closed';
  onFilterChange: (status: 'open' | 'closed') => void;
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
    <div
      className={`relative flex items-center p-1 gap-1 h-9 rounded-md bg-gray-200 ${className}`}
    >
      <div
        className={`
                absolute top-1 h-7 w-[calc(50%-4px)] bg-white rounded-md transition-all duration-500
                ${
                  selectedStatus === 'open'
                    ? 'translate-x-0'
                    : 'translate-x-full'
                }
                `}
      ></div>

      <Button
        variant={`${selectedStatus === 'open' ? 'transparent' : 'ghost'}`}
        onClick={() => onFilterChange('open')}
        className={`
                relative z-10 flex-1 h-full text-black rounded-md capitalize
                ${selectedStatus === 'open' ? 'font-bold' : 'font-normal'}
                `}
        size={'sm'}
      >
        {t('open')} ({numberOfOpenedTickets})
      </Button>

      {/* Closed Button */}
      <Button
        variant={`${selectedStatus === 'closed' ? 'transparent' : 'ghost'}`}
        onClick={() => onFilterChange('closed')}
        className={`
                relative z-10 flex-1 h-full text-black rounded-md capitalize
                ${selectedStatus === 'closed' ? 'font-bold' : 'font-normal'}
                `}
        size={'sm'}
      >
        {t('closed')} ({numberOfClosedTickets})
      </Button>
    </div>
  );
};

export default OpenClosedTickets;
