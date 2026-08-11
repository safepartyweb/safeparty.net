"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnimatedBlock from "@/components/shared/MotionParent";
import { useRegisterMutation } from "@/lib/api/customerApi";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";


export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const [register, {isLoading}] = useRegisterMutation()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    console.log("formData", formData)
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('city', formData.city);
    data.append('state', formData.state);
    data.append('postalCode', formData.postalCode);
    data.append('country', formData.country);
    data.append('password', formData.password);

    try {
      setShowLoader(true)
      const apiRes = await register(data).unwrap()
      console.log("apiRes", apiRes)
      if (apiRes.status === 201) {
        toast.success("Registration successful!")
        setTimeout(() => {
          router.push("/login");
        },1500)
        
      }
    } catch (err) {
      console.log("Error", err)
      toast.error("Something went wrong!")
      // setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setShowLoader(false);
    }

    
  };

  return (
    <section className="py-6 md:py-10">
      {showLoader && <Loader />}
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16">
          
          <AnimatedBlock direction="up">
            <h1 className="text-2xl font-bold text-center mb-2">Create Your Account</h1>
            <p className="text-lg font-medium mb-10 text-center">Sign up to start shopping!</p>
          </AnimatedBlock>

          <AnimatedBlock direction="up">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>Full Name</label>
                
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />

              </div>

              <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>Email</label>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />

              </div>

              <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>Phone</label>
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />

              </div>

              <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>Address</label>
                <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />
              </div>

              <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>City</label>
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />
              </div>

              <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>State</label>
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />
              </div>

              <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>Postal Code</label>
                <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />
              </div>
              
              {/* <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>Country</label>
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />
              </div> */}
              
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-lg font-medium">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="py-2 px-4 rounded border border-siteBlack w-full"
                >
                  <option value="">Select a country</option>
                  {[
                    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria",
                    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
                    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
                    "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China",
                    "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
                    "Dominica", "Dominican Republic", "DR Congo", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
                    "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
                    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
                    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
                    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
                    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
                    "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
                    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
                    "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
                    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of the Congo",
                    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino",
                    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
                    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
                    "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
                    "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
                    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
                    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
                  ].map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>



              <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>Password</label>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />
              </div>

              <div className='flex flex-col gap-1 mb-4'>
                <label className='text-lg font-medium'>Retype Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="py-2 px-4 rounded border border-siteBlack w-full" />
              </div>

              {error && <p className="text-red-600">{error}</p>}

              

              <button type="submit" className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 block font-bold font-lg cursor-pointer' >Register</button>



            </form>
          </AnimatedBlock>

          <p className="mt-6 text-center">
            Already have an account?{" "}
            <Link className="text-bold" href="/login">
              Login here.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
