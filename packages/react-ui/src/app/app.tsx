import {
  DefaultErrorFunction,
  SetErrorFunction,
} from '@sinclair/typebox/errors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { InitialDataGuard } from './components/initial-data-guard';
import { PuRouter } from './router';

const queryClient = new QueryClient();
let typesFormatsAdded = false;

if (!typesFormatsAdded) {
  SetErrorFunction((error: any) => {
    return error?.schema?.errorMessage ?? DefaultErrorFunction(error);
  });
  typesFormatsAdded = true;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InitialDataGuard>
        <TooltipProvider>
          <ThemeProvider storageKey="vite-ui-theme">
            <PuRouter />
            <Toaster />
          </ThemeProvider>
        </TooltipProvider>
      </InitialDataGuard>
    </QueryClientProvider>
  );
}

export default App;
