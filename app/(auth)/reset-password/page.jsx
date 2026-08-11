'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import AnimatedBlock from '@/components/shared/MotionParent'
import { toast } from 'react-toastify'
import { Eye, EyeClosed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [status, setStatus] = useState('')
  const router = useRouter()

  const handleReset = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password and confirm password do not matched!')
      return
    }

    try {
      const res = await fetch('/api/auth/customer/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
      })

      if (res.status == 401) {
        throw new Error('Token expired or invalid')
      }

      toast.success('Password changed successfully!')
      router.push('/login')
    } catch (error) {
      console.log('Error:', error)
      toast.error(error.message)
    }
  }

  return (
    <div className="container max-w-sitemax px-4 mx-auto">
      <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center">
        <AnimatedBlock direction="up">
          <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
          <form onSubmit={handleReset}>
            <div className="input_wrap relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New password"
                className="w-full p-2 border rounded mb-2"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <EyeClosed
                  onClick={() => setShowPassword(false)}
                  className="cursor-pointer absolute right-1 top-2.5"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(true)}
                  className="cursor-pointer absolute right-1 top-2.5"
                />
              )}
            </div>
            <div className="input_wrap relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New password"
                className="w-full p-2 border rounded mb-2"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {showConfirmPassword ? (
                <EyeClosed
                  onClick={() => setShowConfirmPassword(false)}
                  className="cursor-pointer absolute right-1 top-2.5"
                />
              ) : (
                <Eye
                  onClick={() => setShowConfirmPassword(true)}
                  className="cursor-pointer absolute right-1 top-2.5"
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-4 py-2 block font-bold text-lg cursor-pointer"
            >
              Reset Password
            </button>
          </form>
        </AnimatedBlock>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <section className="sec_login py-6 md:py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </section>
  )
}
