'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimatedBlock from '@/components/shared/MotionParent';
import { useLoginMutation } from '@/lib/api/customerApi';
import { setCredentials } from '@/store/authSlice';
import Loader from '@/components/Loader';
import { toast } from 'react-toastify';
import { Suspense } from 'react';

function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const locInfo = typeof window !== 'undefined' && localStorage.getItem('userInfo');
    if (userInfo || locInfo) {
      router.push(redirect);
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowLoader(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const apiRes = await login(formData).unwrap();
      dispatch(setCredentials(apiRes.user));
      toast.success('Login successful!');
      router.push(redirect);
    } catch (err) {
      console.log('Error', err);
      setError(err.data?.message || 'Something went wrong');
      toast.error(err.data?.message || 'Something went wrong');
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <section className="sec_login py-6 md:py-10">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center">
          <AnimatedBlock direction="up">
            <h1 className="text-2xl font-bold text-center mb-2">Welcome Back!</h1>
            <p className="text-lg font-medium mb-10 text-center">Please enter your credentials to login.</p>
          </AnimatedBlock>

          <AnimatedBlock direction="up">
            <form className="w-full sm:max-w-[520px]" onSubmit={handleSubmit}>
              {showLoader && <Loader />}
              {error && <div className="text-red-600 font-medium mb-4">{error}</div>}

              <div className="flex flex-col gap-2 mb-4">
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="py-2 px-4 rounded border border-siteBlack w-full"
                />
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label className="text-lg font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-2 px-4 rounded border border-siteBlack w-full"
                />
              </div>

              <button className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 block font-bold text-lg cursor-pointer">
                Login
              </button>
            </form>

            <p className="register_link mt-6 text-center">
              Don&apos;t have an account?{' '}
              <Link className="font-bold text-blue-600" href="/register">
                Register here.
              </Link>
            </p>
            <p className="register_link mt-6 text-center">
              Forgot Password?{' '}
              <Link className="font-bold text-blue-600" href="/forgot-password">
                Reset here.
              </Link>
            </p>


          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-6">Loading login page...</div>}>
      <LoginForm />
    </Suspense>
  );
}
