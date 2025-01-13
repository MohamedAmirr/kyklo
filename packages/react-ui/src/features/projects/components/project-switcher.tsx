'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { ScrollArea } from '@/components/ui/scroll-area';
import { classroomHooks } from '@/hooks/project-hooks';

function ProjectSwitcher() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { data: classrooms } = classroomHooks.useClassrooms();
  const [open, setOpen] = React.useState(false);
  const { data: currentClassroom, setCurrentClassroom } =
    classroomHooks.useCurrentClassroom();
  const filterClassrooms = React.useCallback(
    (classroomId: string, search: string) => {
      //Radix UI lowercases the value string (classroomId)
      const classroom = classrooms?.find(
        (classroom) => classroom.id.toLowerCase() === classroomId,
      );
        if (!classroom) {
        return 0;
      }
      return classroom.displayName.toLowerCase().includes(search.toLowerCase())
        ? 1
        : 0;
    },
    [classrooms],
  );
  const sortedClassrooms = (classrooms ?? []).sort((a, b) => {
    return a.displayName.localeCompare(b.displayName);
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a project"
          className="w-[200px] justify-between"
        >
          <span className="truncate">{currentClassroom?.displayName}</span>
          <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command filter={filterClassrooms}>
          <CommandList>
            <CommandInput placeholder="Search project..." />
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup key="projects" heading="Projects">
              <ScrollArea viewPortClassName="max-h-[200px]">
                {sortedClassrooms &&
                  sortedClassrooms.map((classroom) => (
                    <CommandItem
                      key={classroom.id}
                      onSelect={() => {
                        setCurrentClassroom(
                          queryClient,
                          classroom,
                          location.pathname,
                        );
                        setOpen(false);
                      }}
                      value={classroom.id}
                      className="text-sm"
                    >
                      {classroom.displayName}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          currentClassroom?.id === classroom.id
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { ProjectSwitcher };
