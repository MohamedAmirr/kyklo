import { Ticket, TicketCategory, TicketStatus } from '@pickup/shared';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';
import { CheckIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  BulkAction,
  CURSOR_QUERY_PARAM,
  DataTable,
  LIMIT_QUERY_PARAM,
  RowDataWithActions,
} from '@/components/ui/data-table';
import TicketDetails from '@/components/ui/ticket-details';
import { ticketApi } from '@/lib/ticket-api';
import { formatUtils } from '@/lib/utils';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { CreateTicketDialog } from './create-ticket-dialog';

// TODO: get categories from backend
const DEFAULT_CATEGORIES: TicketCategory[] = [
  {
    id: '1',
    name: 'General',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Technical',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Account',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
];

export function TicketPage() {
  const [openSelectedTicket, setOpenSelectedTicket] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Ticket | null>(null);

  const [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['tickets'],
    staleTime: 0,
    gcTime: 0,
    queryFn: () => {
      const cursor = searchParams.get(CURSOR_QUERY_PARAM) ?? undefined;
      const limit = searchParams.get(LIMIT_QUERY_PARAM)
        ? parseInt(searchParams.get(LIMIT_QUERY_PARAM)!)
        : 10;
      return ticketApi.list({
        cursor,
        limit,
      });
    },
  });

  const columns: ColumnDef<RowDataWithActions<Ticket>>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Ticket ID')} />
      ),
      cell: ({ row }) => (
        <div className="text-left font-medium min-w-[150px]">
          #{row.original.number}
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Title')} />
      ),
      cell: ({ row }) => (
        <div className="text-left font-medium min-w-[150px]">
          {row.getValue('title')}
        </div>
      ),
    },
    {
      accessorKey: 'username',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Username')} />
      ),
      cell: ({ row }) => (
        <div className="text-left font-medium min-w-[150px]">
          {row.getValue('username')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Status')} />
      ),
      cell: ({ row }) => {
        const status: string = (row.getValue('status') as string).toLowerCase();
        const bgColor =
          status === 'open'
            ? 'bg-success-100 text-success-300'
            : 'bg-destructive-100 text-destructive-300';
  
        return (
          <div
            className={`capitalize ${bgColor}  p-1 px-2 inline-block text-center rounded-3xl`}
          >
            {t(status)}
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Category')} />
      ),
      cell: ({ row }) => (
        <div className="text-left font-medium min-w-[150px]">
          {row.getValue('category')}
        </div>
      ),
    },
  
  ];

  const bulkActions: BulkAction<Ticket>[] = useMemo(
    () => [
      {
        render: () => {
          return (
            <CreateTicketDialog categories={DEFAULT_CATEGORIES} />
          );
        },
      },
    ],
    [t]
  );

  const handleRowOnClick = (row: Ticket) => {
    setSelectedRow(row);
    setOpenSelectedTicket(true);
  };

  const filters = [
    {
      type: 'input',
      title: t('Title'),
      accessorKey: 'id',
      options: [],
      icon: CheckIcon,
    } as const,
    {
      type: 'select',
      title: t('Status'),
      accessorKey: 'status',
      options: Object.values(TicketStatus).map((status) => {
        return {
          label: formatUtils.convertEnumToHumanReadable(status),
          value: status,
        };
      }),
      icon: CheckIcon,
    } as const,
  ];


  return (
    <div>
      <DataTable
        columns={columns}
        page={data?.data}
        filters={filters}
        bulkActions={bulkActions}
        isLoading={isLoading}
        onRowClick={handleRowOnClick}
      />
      {selectedRow && (
        <TicketDetails
          open={openSelectedTicket}
          handleClose={() => setOpenSelectedTicket(false)}
          customerName={selectedRow.reporterId}
          customerRole={''}
          ticketId={selectedRow.id}
          category={selectedRow.categoryId}
          status={selectedRow.status}
        />
      )}
    </div>
  );
}
