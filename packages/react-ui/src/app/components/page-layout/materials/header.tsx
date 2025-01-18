import { Notebook, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const MaterialsHeader = () => {
  return (
    <div>
      <div className="flex h-[50px] items-center mb-5">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] p-1 flex items-center justify-center bg-red-500 text-white rounded-xs	">
            <Notebook size={24} />
          </div>
          <span className="text-lg font-semibold">Class 1/11</span>
        </div>
        <div className="grow"></div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus size={16} className="mr-2" />
            <span>New Content</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
