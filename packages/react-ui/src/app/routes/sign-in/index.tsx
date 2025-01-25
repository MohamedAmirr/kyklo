import { FullLogo } from '@/components/ui/full-logo'
import { AuthFormTemplate } from '@/features/authentication/components/auth-form-template'
import { Navigate } from 'react-router-dom'
import { authenticationSession } from '@/lib/authentication-session'

const SignInPage: React.FC = () => {
    const currentSchoolId = authenticationSession.getSchoolId()
    if (currentSchoolId) {
        return <Navigate to="/home" replace />
    }
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-2">
            <FullLogo />
            <AuthFormTemplate form={'signin'} />
        </div>
    )
}

SignInPage.displayName = 'SignInPage'

export { SignInPage }
