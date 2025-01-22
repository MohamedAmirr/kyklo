import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { t } from 'i18next';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import OpenClosedTickets from '@/components/ui/open-closed-tickets';
import { SearchBar } from '@/components/ui/search-bar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import TicketDetails from '@/components/ui/ticket-details';

const data: Ticket[] = [
  {
    id: 'a1b2c3d4',
    ticketId: '#12345',
    title: 'Payment for Service A',
    category: 'Service',
    username: 'user1',
    status: 'opened',
    actions: 'View',
  },
  {
    id: 'e5f6g7h8',
    ticketId: '#67890',
    title: 'Payment for Service B',
    category: 'Service',
    username: 'user2',
    status: 'opened',
    actions: 'View',
  },
  {
    id: 'i9j0k1l2',
    ticketId: '#11223',
    title: 'Payment for Product C',
    category: 'Product',
    username: 'user3',
    status: 'closed',
    actions: 'View',
  },
  {
    id: 'm3n4o5p6',
    ticketId: '#44556',
    title: 'Payment for Product D',
    category: 'Product',
    username: 'user4',
    status: 'closed',
    actions: 'View',
  },
  {
    id: 'q7r8s9t0',
    ticketId: '#77889',
    title: 'Payment for Service E',
    category: 'Service',
    username: 'user5',
    status: 'closed',
    actions: 'View',
  },
  {
    id: 'q7r8s9t0',
    ticketId: '#77889',
    title: 'Payment for Service E',
    category: 'Service',
    username: 'user5',
    status: 'opened',
    actions: 'View',
  },
  {
    id: 'q7r8s9t0',
    ticketId: '#77889',
    title: 'Payment for Service E',
    category: 'Service',
    username: 'user5',
    status: 'opened',
    actions: 'View',
  },
];

export type Ticket = {
  id: string;
  title: string;
  category: string;
  ticketId: string;
  username: string;
  status: 'opened' | 'closed';
  actions: string;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'ticketId',
    header: ({ column }) => (
      <div className="flex items-center">
        {t('Ticket ID')}
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-blue-500 cursor-pointer">
        {row.getValue('ticketId')}
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <div className="flex items-center">
        {t('Title')}
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <div className="flex items-center">
        {t('Category')}
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('category')}</div>
    ),
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <div className="flex items-center">
        {t('Username')}
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('username')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div className="flex items-center">
        {t('Status')}
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const status: string = (row.getValue('status') as string).toLowerCase();
      const bgColor =
        status === 'opened'
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
    filterFn: (row, columnId, value) => {
      const rowStatus = (row.getValue(columnId) as string).toLowerCase();
      return rowStatus === value.toLowerCase();
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">{t('Open menu')}</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem className="cursor-pointer p-0 px-0">
              <Button size={'sm'} className={'w-full'}>
                {(row.getValue('status') as string).toLowerCase() === 'closed'
                  ? 'Re-open Ticket'
                  : 'Close Ticket'}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TicketPage() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: 'status', value: 'opened' },
  ]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openSelectedTicket, setOpenSelectedTicket] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Ticket | null>(null);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const updateFilter = (id: string, value: string | undefined) => {
    setColumnFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (filter) => filter.id === id,
      );

      if (existingFilterIndex > -1) {
        if (value) {
          return prevFilters.map((filter, index) =>
            index === existingFilterIndex ? { id, value } : filter,
          );
        }
        return prevFilters.filter((filter) => filter.id !== id);
      }

      return [...prevFilters, { id, value }];
    });
  };

  const setStatusFilter = (status: 'opened' | 'closed') => {
    updateFilter('status', status);
  };

  const setTitleFilter = (title: string) => {
    updateFilter('title', title);
  };

  const handleRowOnClick = (row: Ticket) => {
    setSelectedRow(row);
    setOpenSelectedTicket(true);
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="flex items-center justify-between p-4">
          <div className={'flex items-center gap-12'}>
            <SearchBar
              filterValue={
                (columnFilters.find((filter) => filter.id === 'title')
                  ?.value as string) || ''
              }
              handleFilterChange={setTitleFilter}
            />
            <OpenClosedTickets
              numberOfClosedTickets={
                data.filter(
                  (ticket) => ticket.status.toLowerCase() === 'closed',
                ).length
              }
              numberOfOpenedTickets={
                data.filter(
                  (ticket) => ticket.status.toLowerCase() === 'opened',
                ).length
              }
              selectedStatus={
                (columnFilters.find((f) => f.id === 'status')?.value as
                  | 'opened'
                  | 'closed') || 'opened'
              }
              onFilterChange={setStatusFilter}
            />
          </div>
          <Dialog open={openDialog}>
            <DialogTrigger asChild>
              <Button size="sm">{t('New Ticket')}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('Create New Ticket')}</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setOpenDialog(false);
                }}
              >
                <div className="space-y-4">
                  {[
                    { label: t('Title'), type: 'text' },
                    { label: t('Category'), type: 'text' },
                    { label: t('Description'), type: 'textarea' },
                  ].map(({ label, type }) => (
                    <div key={label} className="space-y-1">
                      <span>{label}</span>
                      {type === 'textarea' ? (
                        <Textarea
                          className="w-full p-2 border rounded"
                          required
                        />
                      ) : (
                        <Input
                          type={type}
                          className="w-full p-2 border rounded"
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">{t('Cancel')}</Button>
                  </DialogClose>
                  <Button type="submit">{t('Submit')}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={'bg-gray-100'}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => handleRowOnClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t('No results.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {selectedRow && (
          <TicketDetails
            open={openSelectedTicket}
            handleClose={() => setOpenSelectedTicket(false)}
            customerName={selectedRow.username}
            customerRole={''}
            ticketId={selectedRow.ticketId}
            category={selectedRow.category}
            status={selectedRow.status}
          />
        )}
        <div className="flex items-center justify-between space-x-2 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {t('Columns')} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {t('Previous')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {t('Next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
