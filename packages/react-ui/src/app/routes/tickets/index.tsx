import { ApiResponse, NewTicket, Tickets } from '@pickup/shared';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { t } from 'i18next';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  CURSOR_QUERY_PARAM,
  DataTable,
  LIMIT_QUERY_PARAM,
  RowDataWithActions,
} from '@/components/ui/data-table';
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormField, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OpenClosedTickets from '@/components/ui/open-closed-tickets';
import { SearchBar } from '@/components/ui/search-bar';
import { Textarea } from '@/components/ui/textarea';
import TicketDetails from '@/components/ui/ticket-details';
import { toast } from '@/components/ui/use-toast';
import { ticketApi } from '@/lib/ticket-api';

export const columns: ColumnDef<RowDataWithActions<Tickets>>[] = [
  {
    accessorKey: 'id',
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center">
        {t('Ticket ID')}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-blue-500 cursor-pointer">
        {row.getValue('id')}
      </div>
    ),
  },
  {
    accessorKey: 'title',
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center">
        {t('Title')}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
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
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center">
        {t('Category')}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
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
    enableSorting: true,
    header: ({ column }) => (
      <div className="flex items-center">
        {t('Username')}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
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
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: 'status', value: 'open' },
  ]);
  const [openSelectedTicket, setOpenSelectedTicket] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Tickets | null>(null);

  const [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['issues', searchParams.toString()],
    staleTime: 0,
    gcTime: 0,
    queryFn: () => {
      const cursor = searchParams.get(CURSOR_QUERY_PARAM);
      const limit = searchParams.get(LIMIT_QUERY_PARAM)
        ? parseInt(searchParams.get(LIMIT_QUERY_PARAM)!)
        : 10;
      return ticketApi.list({
        cursor: cursor ?? undefined,
        limit,
      });
    },
  });

  const filteredData = React.useMemo(() => {
    let result = data?.data ?? [];

    columnFilters.forEach((filter) => {
      if (filter?.id === 'title' && filter?.value) {
        result = result?.filter((ticket) =>
          ticket?.title
            .toLowerCase()
            .includes((filter?.value as string).toLowerCase()),
        );
      } else if (filter?.id === 'status' && filter?.value) {
        result = result?.filter(
          (ticket) =>
            ticket?.status.toLowerCase() ===
            (filter?.value as string).toLowerCase(),
        );
      }
    });

    return result;
  }, [columnFilters]);

  const updateFilter = (id: string, value: string | undefined) => {
    setColumnFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (filter) => filter?.id === id,
      );

      if (existingFilterIndex > -1) {
        if (value) {
          return prevFilters.map((filter, index) =>
            index === existingFilterIndex ? { id, value } : filter,
          );
        }
        return prevFilters?.filter((filter) => filter?.id !== id);
      }

      return [...prevFilters, { id, value }];
    });
  };

  const form = useForm<{
    title: string;
    categoryId: string;
    description: string;
  }>({
    defaultValues: {
      title: '',
      categoryId: '',
      description: '',
    },
  });

  const setStatusFilter = (status: 'open' | 'closed') => {
    updateFilter('status', status);
  };

  const setTitleFilter = (title: string) => {
    updateFilter('title', title);
  };

  const handleRowOnClick = (row: Tickets) => {
    setSelectedRow(row);
    setOpenSelectedTicket(true);
  };

  const { mutate, isPending } = useMutation<
    ApiResponse<unknown>,
    Error,
    NewTicket
  >({
    mutationFn: ticketApi.create,
    onSuccess: () => {
      toast({
        title: t('Success'),
        description: t('Your password was changed successfully'),
        duration: 3000,
      });
      setOpenDialog(false);
    },
    onError: (error) => {
      // setServerError(
      //   t('Your password reset request has expired, please request a new one'),
      // );
      console.error(error);
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit: SubmitHandler<NewTicket> = (data) => {
    mutate(data);
    console.log(data.title);
  };

  return (
    <div className="w-full flex-col rounded-md border">
      <div className={'w-full flex justify-between p-4'}>
        <div className={'w-1/4 flex items-center gap-12'}>
          <SearchBar
            filterValue={
              (columnFilters.find((filter) => filter?.id === 'title')
                ?.value as string) || ''
            }
            handleFilterChange={setTitleFilter}
          />
          <OpenClosedTickets
            numberOfClosedTickets={
              filteredData?.filter(
                (ticket) => ticket?.status.toLowerCase() === 'closed',
              ).length
            }
            numberOfOpenedTickets={
              filteredData?.filter(
                (ticket) => ticket?.status.toLowerCase() === 'open',
              ).length
            }
            selectedStatus={
              (columnFilters.find((f) => f.id === 'status')?.value as
                | 'open'
                | 'closed') || 'open'
            }
            onFilterChange={setStatusFilter}
          />
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button size="sm">{t('New Ticket')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('Create New Ticket')}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  name={'title'}
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="title">{t('Title')}</Label>
                      <Input
                        {...field}
                        required
                        id="title"
                        type="text"
                        className="rounded-sm"
                        ref={inputRef}
                        onChange={(e) => field.onChange(e)}
                      />
                    </>
                  )}
                />
                <FormField
                  name={'categoryId'}
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="categoryId">{t('Category')}</Label>
                      <Input
                        {...field}
                        required
                        id="categoryId"
                        type="dropdown" // TODO: need to add a dropdown type
                        className="rounded-sm"
                        ref={inputRef}
                        onChange={(e) => field.onChange(e)}
                      />
                    </>
                  )}
                />
                <FormField
                  name={'description'}
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="description">{t('Description')}</Label>
                      <Textarea
                        {...field}
                        required
                        id="description"
                        className="rounded-sm"
                        onChange={(e) => field.onChange(e)}
                      />
                    </>
                  )}
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">{t('Cancel')}</Button>
                  </DialogClose>
                  <Button type="submit">{t('Submit')}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        page={data?.data}
        isLoading={isLoading}
        onRowClick={handleRowOnClick}
      />
      {selectedRow && (
        <TicketDetails
          open={openSelectedTicket}
          handleClose={() => setOpenSelectedTicket(false)}
          customerName={selectedRow.raisedById}
          customerRole={''}
          ticketId={selectedRow.id}
          category={selectedRow.categoryId}
          status={selectedRow.status}
        />
      )}
    </div>
  );
}
