'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
import AnimatedBlock from '@/components/shared/MotionParent';


export default function RegisterPage() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      redirect('/admin');
    }
  }, [user]);

  return (
    <section className="sec_login py-6 md:py-10">
      <div className="container max-w-sitemax px-4 mx-auto ">
        <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center">
          <AnimatedBlock className='' direction="up">
            <h1 className="text-2xl font-bold text-center mb-2">Welcome!</h1>
            <p className="text-lg font-medium mb-10 text-center">Please enter your details to register.</p>
          </AnimatedBlock>         
          

          <AnimatedBlock className='' direction="up">
            <AuthForm isLogin={false} />
            <p className="register_link mt-6 text-center">Already registered? <Link className="text-bold" href="/admin-login">Login here.</Link></p>
          </AnimatedBlock>  





          
        </div>
      </div>
    </section>
  );
}