import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export function Sheet({
  children,
  open,
  onOpenChange,
  side = 'right',
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  side?: 'top' | 'bottom' | 'left' | 'right';
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 transition-opacity duration-300 ease-in-out" />
        <Dialog.Content
          className={cn('fixed bg-white dark:bg-neutral-900 shadow-lg', {
            'top-3 left-3 right-3 h-1/3 rounded-xl animate-slideInTop data-[state=closed]:animate-slideOutTop':
              side === 'top',
            'bottom-3 left-3 right-3 h-1/3 rounded-xl animate-slideInBottom data-[state=closed]:animate-slideOutBottom':
              side === 'bottom',
            'top-3 bottom-3 left-3 w-1/3 rounded-xl animate-slideInLeft data-[state=closed]:animate-slideOutLeft':
              side === 'left',
            'top-3 bottom-3 right-3 w-2/5 rounded-xl animate-slideInRight data-[state=closed]:animate-slideOutRight':
              side === 'right',
          })}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SheetContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

export function SheetHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-4 flex items-center', className)}>{children}</div>
  );
}

export function SheetClose({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Close asChild={asChild}>
      {children || (
        <button className="absolute flex top-4 right-4">
          <X className="h-5 w-5" />
        </button>
      )}
    </Dialog.Close>
  );
}
