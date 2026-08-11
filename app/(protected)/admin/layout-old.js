'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
// import { useEffect, useState } from 'react';
import useUserBootstrap from '@/hooks/useUserBootstrap';
import Loader from '@/components/Loader';
import Link from 'next/link';
import DashboardLeft from '@/components/admin/DashboardLeft';
import AnimatedBlock from '@/components/shared/MotionParent';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';


export default function DashboardLayout({children}) {
  // const { loading } = useUserBootstrap();
  const { userInfo } = useSelector((state) => state.auth);
  // console.log("userInfo", userInfo)
  const router = useRouter();
  let locInfo;
  if (typeof window !== 'undefined') {
    locInfo = localStorage.getItem('userInfo')
  }
  // console.log("locInfo",locInfo)
  const dispatch = useDispatch()
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me'); // sends cookie automatically

        if (res.ok) {
          const data = await res.json();
          console.log("data from fetch me",data)
          //dispatch(setCredentials({ user: data.user }));
        } else {
          dispatch(logout());
          console.log("ftch err!")
          router.push('/admin-login')
          //if (redirectIfUnauthed) router.push('/login');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        dispatch(logout());
        router.push('/admin-login')
        //if (redirectIfUnauthed) router.push('/login');
      } finally {
        //setLoading(false);
      }
    };

    fetchUser()

    if (!userInfo && !locInfo ) {
      router.push('/admin-login')
    }
    
  }, []);

  


  /*
  useEffect(() => {
    // Redirect if userInfo is not found after Redux has updated
    if (userInfo === undefined) {
      return; // Just don't do anything if still undefined (initial render)
    }
    
    if (!userInfo) {
      router.push('/login'); // Redirect to login if userInfo is not found in store
    }
  }, [userInfo, router]); // Dependency array ensures this runs whenever userInfo changes

  if (userInfo === undefined) {
    return <div>Loading...</div>; // Optionally show a loading state while checking
  }
*/
  if (!userInfo) {
    //return <Loader />; // or loading spinner
  }

  // if (loading){
  //   console.log("loading",loading)
  // };

  // console.log("loading",loading)

  // if (loading) return <Loader />;
 
  
  return (
    
    <section className="sec_admin ">
      <div className="container max-w-sitemax px-4 mx-auto  ">
        <div className="dashboard_wrapper grid grid-cols-6 gap-6 md:gap-10 justify-between flex-col sm:flex-row">
          
          <DashboardLeft />
          

          <div className="dashboard_right py-6 md:py-10 px-4 col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-5">
            <AnimatedBlock direction="right">{children}</AnimatedBlock>
            
          </div>

        </div>
        
      </div>
    </section>


  );
}