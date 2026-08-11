'use client'
import React,{useState} from 'react'
import AnimatedBlock from '@/components/shared/MotionParent'
import Loader from '@/components/Loader'
import Link from 'next/link'
import { toast } from 'react-toastify'



const page = () => {

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [showLoader, setShowLoader] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const res = await fetch('/api/auth/customer/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      console.log("res", res);

      if(res.status == 404){
        throw new Error("User not found")
      }
      toast.success("Reset link sent to your email.")


    } catch (error) {
      console.log("Error:", error)
      toast.error(error.message)
    } finally{
      setEmail('')
      setShowLoader(false)

    }

    

    
    
  };

  if(showLoader){
    return <Loader />
  }

  return (
    <section className="sec_login py-6 md:py-10">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center">
          <AnimatedBlock direction="up">
            <h1 className="text-2xl font-bold text-center mb-2">Password reset!</h1>
            <p className="text-lg font-medium mb-10 text-center">Please enter your email to reset password.</p>
          </AnimatedBlock>

          <AnimatedBlock direction="up">
            <form className="w-full sm:max-w-[520px]" onSubmit={handleSubmit}>
              {showLoader && <Loader />}
              

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


              <button className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-4 py-3 block font-bold text-lg cursor-pointer">
                Reset Password
              </button>
            </form>

            <p className="register_link mt-6 text-center">
              Don&apos;t have an account?{' '}
              <Link className="font-bold text-blue-600" href="/register">
                Register here.
              </Link>
            </p>
            <p className="register_link mt-6 text-center">
              <Link className="font-bold text-blue-600" href="/login">
                Back to login.
              </Link>
            </p>



          </AnimatedBlock>
        </div>
      </div>
    </section>
  )
}

export default page