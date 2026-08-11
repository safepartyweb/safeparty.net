'use client';
import { useEffect } from 'react';

import { Provider } from 'react-redux';
import { useGetMeQuery } from '@/lib/api/authApi';

import { store, persistor } from '@/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/authSlice';



export default function AuthProvider({ children }) {
  return (
    <Provider store={store}>
        {/* <AuthInitializer>{children}</AuthInitializer> */}
        {children}
    </Provider>
  );
}


function AuthInitializer({ children }) {
  // This will automatically fetch user data when the app loads
  const { isLoading, isError } = useGetMeQuery();
  
  // Optional: Add loading state if needed
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return children;
}




/*
function AuthInitializer({ children }) {
  const { data, error, isLoading } = useGetMeQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      dispatch(logout()); // Clear invalid auth state
      router.push('/login');
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  return children;
}

*/