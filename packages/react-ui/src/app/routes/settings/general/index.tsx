import { typeboxResolver } from '@hookform/resolvers/typebox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { FlagGuard } from '@/app/components/flag-guard';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/seperator';
import { useToast } from '@/components/ui/use-toast';
import { ClassroomMemberRole, ActiveClassroom, PuFlagId } from '@pickup/shared';
import { classroomHooks } from '@/hooks/project-hooks';
import { useAuthorization } from '@/hooks/authorization-hooks';

export default function GeneralPage() {
  const queryClient = useQueryClient();
  const { classroom, updateClassroom } = classroomHooks.useCurrentClassroom();
  const { role } = useAuthorization();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      displayName: classroom?.displayName
    },
    disabled: role !== ClassroomMemberRole.TEACHER,
    resolver: typeboxResolver(ActiveClassroom),
  });


  return (
    <div className="flex flex-col items-center  gap-4">
      <div className="space-y-6 w-full">
        <div>
          <h3 className="text-xl font-semibold">{t('General')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('Manage general settings for your project.')}
          </p>
        </div>
        <Separator />
        <div className="grid gap-1 mt-4">
          <Form {...form}>
            <form
              className="grid space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <FormField
                name="displayName"
                render={({ field }) => (
                  <FormItem className="grid space-y-2">
                    <Label htmlFor="displayName">{t('Project Name')}</Label>
                    <Input
                      {...field}
                      required
                      id="displayName"
                      placeholder={t('Project Name')}
                      className="rounded-sm"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form?.formState?.errors?.root?.serverError && (
                <FormMessage>
                  {form.formState.errors.root.serverError.message}
                </FormMessage>
              )}
            </form>
          </Form>
          {role === ClassroomMemberRole.TEACHER && (
            <div className="flex gap-2 justify-end mt-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                {t('Save')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
