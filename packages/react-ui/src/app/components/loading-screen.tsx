import { LoadingSpinner } from '../../components/ui/spinner'
import { cn } from '../../lib/utils'

export const LoadingScreen = () => {
    return (
        <div
            className={cn('flex h-screen w-screen items-center justify-center')}
        >
            <LoadingSpinner size={50} />
        </div>
    )
}
