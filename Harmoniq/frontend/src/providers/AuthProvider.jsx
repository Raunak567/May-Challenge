import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';

const updateApiToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const AuthProvider = ({ children }) => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const checkAdminStatus = useAuthStore(state => state.checkAdminStatus);
  
    useEffect(() => {
      const initAuth = async () => {
        try {
          const token = await getToken();
          updateApiToken(token);
          if (token) {
            await checkAdminStatus();
          }
        } catch (error) {
          updateApiToken(null);
          console.error('Error in AuthProvider:', error);
        } finally {
          setLoading(false);
        }
      };
      initAuth();
    }, [getToken, checkAdminStatus]);
  
    if (loading) {
      return (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader className="size-8 text-emerald-500 animate-spin" />
        </div>
      );
    }
  
    return <>{children}</>;
  };
  
  export default AuthProvider;
