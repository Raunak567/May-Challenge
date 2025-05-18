import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react'; 


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
  
    useEffect(() => {
      const initAuth = async () => {
        try {
          const token = await getToken();
          updateApiToken(token);
        } catch (error) {
          updateApiToken(null);
          console.error('Error in AuthProvider:', error);
        } finally {
          setLoading(false);
        }
      };
      initAuth();
    }, [getToken]);
  
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
