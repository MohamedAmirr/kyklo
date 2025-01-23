import { t } from 'i18next';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { SignInForm } from './sign-in-form';

const AuthFormTemplate = React.memo(({ form }: { form: 'signin' }) => {
  const data = {
    signin: {
      title: t('Welcome Back!'),
      description: t('Enter your email below to sign in to your account'),
      showNameFields: false,
    },
  }[form];

  return (
    <Card className="w-[28rem] rounded-sm drop-shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
});

AuthFormTemplate.displayName = 'AuthFormTemplate';

export { AuthFormTemplate };
