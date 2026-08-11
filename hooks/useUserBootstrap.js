// hooks/useUserBootstrap.js
'use client'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from '@/store/authSlice';
import { useGetMeQuery } from '@/lib/api/authApi';
import { useRouter } from 'next/navigation'; 

export default function useUserBootstrap() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);

  const {data, isLoading, isError, error} = useGetMeQuery();

 
  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me'); // sends cookie automatically

        if (res.ok) {
          const data = await res.json();
          dispatch(setCredentials({ user: data.user }));
        } else {
          dispatch(logout());
          //if (redirectIfUnauthed) router.push('/login');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        dispatch(logout());
        //if (redirectIfUnauthed) router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    if(data){
      console.log("datafound",data)
    }
    if(isError){
      console.log("error",error)
    }
  }, [dispatch, isLoading, data]);


  

  /*
  useEffect(() => {
    console.log("useEffect running from user Bootstrap file")
    if (isError) {
      console.log("Error", error)
      router.push('/login');
    }

    if(data){
      console.log("data from me Hook:",data)
      dispatch(setCredentials(data.user))
      setLoading(false);
    }
  }, [error,isError, data]);
*/



  return { loading };




}
