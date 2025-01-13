import { flagsHooks } from '@/hooks/flags-hooks';
import { PuFlagId } from '@pickup/shared';

type FlagGuardProps = {
  children: React.ReactNode;
  flag: PuFlagId;
};
const FlagGuard = ({ children, flag }: FlagGuardProps) => {
  const { data: flagValue } = flagsHooks.useFlag<boolean>(flag);
  if (!flagValue) {
    return null;
  }
  return children;
};

FlagGuard.displayName = 'FlagGuard';
export { FlagGuard };
