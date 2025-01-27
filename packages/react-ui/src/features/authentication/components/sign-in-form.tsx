import { typeboxResolver } from '@hookform/resolvers/typebox'
import {
    ApiResponse,
    AuthenticationResponse,
    ErrorCode,
    PuEdition,
    PuFlagId,
    SignInRequest,
} from '@pickup/shared'
import { Static, Type } from '@sinclair/typebox'
import { useMutation } from '@tanstack/react-query'
import { t } from 'i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { flagsHooks } from '@/hooks/flags-hooks'
import { HttpError } from '@/lib/api'
import { authenticationApi } from '@/lib/authentication-api'
import { authenticationSession } from '@/lib/authentication-session'
import { formatUtils } from '@/lib/utils'

const SignInSchema = Type.Object({
    email: Type.String({
        pattern: formatUtils.emailRegex.source,
        errorMessage: t('Email is invalid'),
    }),
    password: Type.String({
        minLength: 1,
        errorMessage: t('Password is required'),
    }),
})

type SignInSchema = Static<typeof SignInSchema>

const SignInForm: React.FC = () => {
    const form = useForm<SignInSchema>({
        resolver: typeboxResolver(SignInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    })

    const { data: edition } = flagsHooks.useFlag(PuFlagId.EDITION)

    const navigate = useNavigate()

    const { mutate, isPending } = useMutation<
        ApiResponse<AuthenticationResponse>,
        HttpError,
        SignInRequest
    >({
        mutationFn: authenticationApi.signIn,
        onSuccess: data => {
            authenticationSession.saveResponse(data)
            navigate('/home')
        },
        onError: (error: any) => {
            if (error.response) {
                switch (error.response.data.code) {
                    case ErrorCode.INVALID_CREDENTIALS: {
                        form.setError('root.serverError', {
                            message: t('Invalid email or password'),
                        })
                        break
                    }
                    default: {
                        form.setError('root.serverError', {
                            message: t(
                                'Something went wrong, please try again later'
                            ),
                        })
                        break
                    }
                }
            }
        },
    })

    const onSubmit: SubmitHandler<SignInRequest> = data => {
        form.setError('root.serverError', {
            message: undefined,
        })
        mutate(data)
    }

    return (
        <Form {...form}>
            <form className="grid space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="grid space-y-2">
                            <Label htmlFor="email">{t('Email')}</Label>
                            <Input
                                {...field}
                                required
                                id="email"
                                type="text"
                                placeholder={'email@example.com'}
                                className="rounded-sm"
                                tabIndex={1}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="grid space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">
                                    {t('Password')}
                                </Label>
                                {edition !== PuEdition.COMMUNITY && (
                                    <Link
                                        to="/forget-password"
                                        className="text-muted-foreground text-sm hover:text-primary transition-all duration-200"
                                    >
                                        {t('Forgot your password?')}
                                    </Link>
                                )}
                            </div>
                            <Input
                                {...field}
                                required
                                id="password"
                                type="password"
                                placeholder={'********'}
                                className="rounded-sm"
                                tabIndex={2}
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
                <Button
                    loading={isPending}
                    onClick={e => form.handleSubmit(onSubmit)(e)}
                    tabIndex={3}
                >
                    {t('Sign in')}
                </Button>
            </form>
        </Form>
    )
}

SignInForm.displayName = 'SignIn'

export { SignInForm }
