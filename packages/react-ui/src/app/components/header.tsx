import { t } from 'i18next';
import { LogOut, Shield } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ProgressCircularComponent } from '@/components/custom/circular-progress';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/user-avatar';
import { ProjectSwitcher } from '@/features/projects/components/project-switcher';
import { classroomHooks } from '@/hooks/project-hooks';
import { formatUtils } from '@/lib/utils';
import { PuFlagId, isNil } from '@pickup/shared';

import { Separator } from '../../components/ui/seperator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../components/ui/tooltip';

import { FlagGuard } from './flag-guard';

export const Header = () => {
  const history = useLocation();
  const isInPlatformAdmin = history.pathname.startsWith('/platform');
  return (
    <div>
      <div className="flex h-[60px] items-center">
        {isInPlatformAdmin ? (
          <span className="text-3xl font-bold px-4 py-2">
            {t('Platform Admin')}
          </span>
        ) : (
          <ProjectSwitcher />
        )}
        <div className="grow"></div>
        <div className="flex items-center justify-center gap-4">
          <Link to={isInPlatformAdmin ? '/' : '/platform'}>
            <Button
              variant={'outline'}
              size="sm"
              className="flex items-center justify-center gap-2"
            >
              {isInPlatformAdmin ? (
                <LogOut className="size-4" />
              ) : (
                <Shield className="size-4" />
              )}
              <span>
                {t(
                  isInPlatformAdmin
                    ? 'Exit Platform Admin'
                    : 'Platform Admin',
                )}
              </span>
            </Button>
          </Link>

          <UserAvatar />
        </div>
      </div>
      <Separator></Separator>
    </div>
  )
};