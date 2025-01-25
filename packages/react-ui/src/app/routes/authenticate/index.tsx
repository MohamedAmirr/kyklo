import { authenticationSession } from '@/lib/authentication-session'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthenticatePage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)
    const response = searchParams.get('response')

    useEffect(() => {
        if (response) {
            const decodedResponse = JSON.parse(response)
            authenticationSession.saveResponse(decodedResponse)
            navigate('/home')
        }
    }, [response])

    return <>Please wait...</>
}

export default AuthenticatePage
