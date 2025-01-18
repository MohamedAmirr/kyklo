import { t } from 'i18next';
import { X, CircleHelp } from 'lucide-react';
import React from 'react';

import profileImg from '@/assets/profile-sample.png';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { Separator } from './seperator';

type Props = {
  open: boolean;
  handleClose: () => void;
  customerName: string;
  customerRole: string;
  ticketId: string;
  category: string;
  status: 'opened' | 'closed';
};

const TicketDetails = ({
  open,
  handleClose,
  customerName,
  customerRole,
  ticketId,
  category,
  status,
}: Props) => {
  const TicketDetail = React.memo(
    ({ label, value }: { label: string; value: string }) => (
      <div className="flex flex-col justify-center items-start gap-1">
        <h2 className="text-gray-400 text-lg font-semibold">{t(label)}</h2>
        {value.toLowerCase() === 'opened' ||
        value.toLowerCase() === 'closed' ? (
          <h2
            className={cn(
              `text-lg capitalize px-2 rounded-3xl`,
              value.toLowerCase() === 'opened'
                ? 'bg-success-100 text-success-300'
                : value.toLowerCase() === 'closed'
                ? 'bg-destructive-100 text-destructive-300'
                : '',
            )}
          >
            {t(value)}
          </h2>
        ) : (
          <h2 className="text-lg">{t(value)}</h2>
        )}
      </div>
    ),
  );

  TicketDetail.displayName = 'TicketDetail';

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full">
        <SheetHeader className={'flex justify-between items-center'}>
          <div className={'flex items-center gap-4'}>
            <div className="flex justify-center items-center h-11 w-11 bg-blue-50 rounded-md">
              <CircleHelp className=" h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-lg capitalize">{t('customer issue')}</h2>
          </div>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={'close'}
              className="bg-gray-100 rounded-3xl"
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <Separator className={'my-5'} />
        <div className={'flex flex-col  gap-6'}>
          <div className="flex items-center gap-4">
            <Avatar className={'w-20 h-20'}>
              <AvatarImage alt={'Profile Image'} src={profileImg} />
            </Avatar>
            <div>
              <h3 className="text-lg">{customerName}</h3>
              <p className="text-sm text-gray-500">{customerRole}</p>
            </div>
          </div>
          <div
            className={
              'flex flex-row sm:flex-row sm:justify-evenly justify-evenly border-2 w-full h-24 rounded-xl p-1'
            }
          >
            <TicketDetail label={t('Ticket ID')} value={ticketId} />
            <Separator
              orientation="vertical"
              className="mx-2 h-12 self-center"
            />
            <TicketDetail label={t('Category')} value={category} />
            <Separator
              orientation="vertical"
              className="mx-2 h-12 self-center"
            />
            <TicketDetail label={t('Ticket Status')} value={status} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TicketDetails;
