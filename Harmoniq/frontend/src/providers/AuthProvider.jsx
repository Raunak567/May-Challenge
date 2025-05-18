import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import React, { useEffect } from 'react'


const updateApiToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}
const AuthProvider = () => {
    const {getToken,userId} = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken()
                updateApiToken(token);

            } catch (error) {
                console.error('Error in auth Provider')
            }
        }
        initAuth()
    }, [getToken]
);
  return (
    <div>AuthProvider</div>
  )
}

export default AuthProvider