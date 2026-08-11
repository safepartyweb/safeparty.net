'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation, useRegisterMutation } from '@/lib/api/authApi';
import { setCredentials } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import Button from './Button';
import BlackButton from './BlackButton';
import Link from 'next/link';
import Loader from './Loader';
import { toast } from "react-toastify";
import { Eye, EyeClosed } from 'lucide-react';


export default function AuthForm({ isLogin }) {
  // console.log("isLogin",isLogin)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] =  useState(false)
  const [confirmpassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] =  useState(false)
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showLoader, setShowLoader ] = useState(false)

  const router = useRouter();
  
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const dispatch = useDispatch();


  const isLoading = isLogin ? isLoginLoading : isRegisterLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowLoader(true)
    const formData = new FormData();

    try {
      if (isLogin) {
        // console.log(email, password)
        formData.append('email', email);
        formData.append('password', password);
        const apiRes = await login(formData).unwrap();
        // console.log("apiRes", apiRes)
        dispatch(setCredentials(apiRes.user))
        toast.success("Login successful!")
      } else {
        if(password !== confirmpassword){
          return toast.error("Password and confirm password do not matched!")
        }
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        const apiRes = await register(formData).unwrap();
        console.log("apiRes:", apiRes)
        toast.success("Registration successful!")
      }
      //router.push('/admin');
    } catch (err) {
      console.log("Error", err)
      setError(err.data?.message || 'Something went wrong');
      toast.error(err.data?.message || 'Something went wrong')
    } finally{
      setShowLoader(false)
    }
  };

  return (
    <form className='w-full sm:max-w-[520px]' onSubmit={handleSubmit}>
      {showLoader &&  <Loader />}
      {error && <div className="error">{error}</div>}

      {!isLogin && (
      <div className='flex flex-col gap-2 mb-4'>
        <label className='text-lg font-medium'>Name</label>

        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='py-2 px-4 rounded border border-siteBlack w-full'
          />
      </div>        
          
        
        
      )}

      <div className='flex flex-col gap-2 mb-4'>
        <label className='text-lg font-medium'>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='py-2 px-4 rounded border border-siteBlack w-full'
        />
      </div>

      <div className='flex flex-col gap-2 mb-4'>
        <label className='text-lg font-medium'>Password</label>
        <div className="pass_wrap relative">
          <input
            type={showPassword ? 'text' : "password" }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='py-2 px-4 rounded border border-siteBlack w-full'
          />
          {showPassword ? <EyeClosed onClick={e => setShowPassword(false)}  className='absolute right-1 top-2.5' /> : <Eye onClick={e => setShowPassword(true)} className='absolute right-1 top-2.5' />}
          
        </div>
      </div>
      {!isLogin && (
        <div className='flex flex-col gap-2 mb-4'>
          <label className='text-lg font-medium'>Confirmm Password</label>
          <div className="pass_wrap relative">
            <input
              type={showConfirmPassword ? 'text' : "password" }
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='py-2 px-4 rounded border border-siteBlack w-full'
            />
            {showConfirmPassword ? <EyeClosed onClick={e => setShowConfirmPassword(false)} className='absolute right-1 top-2.5' /> : <Eye onClick={e => setShowConfirmPassword(true)} className='absolute right-1 top-2.5' />}
          </div>
        </div>

      )}


      <button className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 block font-bold font-lg cursor-pointer' >{isLogin ? 'Login' : 'Register'}</button>

      
    </form>
  );
}