'use client'
import { useState } from 'react'
import AnimatedBlock from '@/components/shared/MotionParent'
import { Eye, EyeClosed } from 'lucide-react'
import { useRegisterMutation } from '@/lib/api/affiliateApi'
import { toast } from 'react-toastify'
import Link from 'next/link'



export default function RegisterPage() {
  
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword:'' })
  const [code, setCode] = useState('')
  const [showPass,setShowPass] = useState(false)
  const [showConfirmPass,setShowConfirmPass] = useState(false)

  const [register, {isLoading}] = useRegisterMutation()




  const handleSubmit = async (e) => {
    e.preventDefault()
    // const res = await fetch('/api/affiliates/register', {
    //   method: 'POST',
    //   body: JSON.stringify(form),
    // })

    if(form.password !== form.confirmPassword){
      return toast.error("Password and Confrim Password do not matched!")
    }

    try {
      const apiRes = await register(form).unwrap();
    
      console.log("apiRes",apiRes)
      setCode(apiRes.affiliateCode)
      toast.success(apiRes.message)




    } catch (error) {
      console.log("Error", error)
      toast.error(error.data.message)
    }

  }


  return (
    <section className="py-6 md:py-10">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16">
          
          <AnimatedBlock direction="up">
            <h1 className="text-2xl font-bold text-center mb-2">Create Your Affiliate Account</h1>
            <p className="text-lg font-medium mb-10 text-center">Sign up to start affiliating!</p>
          </AnimatedBlock>

          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              className="border p-2 w-full"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="border p-2 w-full"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />


            <div className="relative">
              <input
                className="border p-2 w-full"
                type={showPass ? 'text' : "password" }
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {!showPass && <Eye className="absolute right-1 top-2.5 cursor-pointer" onClick={e => setShowPass(true)} size={24} />}
              {showPass && <EyeClosed className="absolute right-1 top-2.5 cursor-pointer" onClick={e => setShowPass(false)} size={24} />} 
            </div>

            <div className="relative">
              <input
                className="border p-2 w-full"
                type={showConfirmPass ? 'text' : "password" }
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              />

              {!showConfirmPass && <Eye className="absolute right-1 top-2.5 cursor-pointer" onClick={e => setShowConfirmPass(true)} size={24} />}
              {showConfirmPass && <EyeClosed className="absolute right-1 top-2.5 cursor-pointer" onClick={e => setShowConfirmPass(false)} size={24} />} 
            </div>


            
            <button className="bg-black text-white p-2 w-full border rounded hover:bg-white hover:text-black cursor-pointer">Register</button>
          </form>
          {code && (
            <div className="mt-4 bg-green-100 p-2 rounded">
              Your affiliate code: <strong>{code}</strong><br />
              Your link: <code>{`?ref=${code}`}</code>
            </div>
          )}

            <p className="register_link mt-6 text-center">
              Don&apos;t have an account?{' '}
              <Link className="font-bold text-blue-600" href="/affiliate/login">
                Back to Login.
              </Link>
            </p>



        </div>

      </div>
    </section>
  );
}
