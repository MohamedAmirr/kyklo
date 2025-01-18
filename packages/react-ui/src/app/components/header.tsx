import { ClassroomSwitcher } from '@/features/classrooms/components/classroom-switcher';

import { Separator } from '../../components/ui/seperator';

export const Header = () => {
  return (
    <div>
      <div className="flex h-[60px] items-center">
        <ClassroomSwitcher />
      </div>
      <Separator></Separator>
    </div>
  )
};