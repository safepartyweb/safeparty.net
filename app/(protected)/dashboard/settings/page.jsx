'use client'
import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import BlackButton from '@/components/BlackButton'
import { useEditCustomerMutation } from '@/lib/api/customerApi'
import Loader from '@/components/Loader'
import { toast } from 'react-toastify'




const page = () => {
  const router = useRouter();
  const user = useSelector(state => state.auth.userInfo);
  if (!user) {
    // Optional: show a loading state or redirect
    if (typeof window !== 'undefined') {
      router.push('/login'); // or return <Loader />
    }
    return null;
  }
  const [fullName, setFullName] = useState(user.fullName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [address, setAddress] = useState(user.address)
  const [city, setCity] = useState(user.city)
  const [state, setState] = useState(user.state)
  const [postalCode, setPostalCode] = useState(user.postalCode)
  const [country, setCountry] = useState(user.country)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newConfirmPassword, setNewConfirmPassword] = useState('')
  const [showPass,setShowPass] = useState(false)
  const [showNPass,setShowNPass] = useState(false)
  const [showNCPass,setShowNCPass] = useState(false)

  const[showEdit, setShowEdit ] = useState(false)
  const[showEditPass, setShowEditPass ] = useState(false)

  const [editCustomer,{isLoading}] = useEditCustomerMutation();

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      fullName,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      country,

    }

    try {
      const apiRes = await editCustomer(data)
      console.log("apiRes", apiRes)
      toast.success("Information updated succesfully!")
      setShowEdit(false);
      // setFullName('')
      // setEmail('')
      // setPhone('')
      // setAddress('')
      // setCity('')
      // setState('')
      // setPostalCode('')
      // setCountry('')
    } catch (error) {
      console.log("error", error)
      toast.error("Something went wrong!")
    }

  }

  const editPassHandler = async (e) => {
    e.preventDefault();
    // console.log("Pass Form submitted!")

    if(newPassword !== newConfirmPassword){
      return toast.error("New password and confirm password did not match!")
    }

    const data = {
      password,
      newPassword

    }

    try {
      const apiRes = await editCustomer(data).unwrap();
      console.log("EapiResrror:", apiRes);
      toast.success("Password changed successfully!");
      setShowEditPass(false);
      setPassword('');
      setNewPassword('');
      setNewConfirmPassword('');
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.data?.message || "Something went wrong");
    }
    
    



  }




  
  



  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className='text-xl font-bold'>{showEdit ? 'Edit Info:' : 'Your Info:' }</h1>
        {!showEdit && (
          <button className='group relative flex items-center gap-1 border rounded cursor-pointer hover:bg-siteBlack hover:text-white px-3 py-2' onClick={e => setShowEdit(true)} >
            <div className="relative w-8 h-8">
              <Image
                src="/images/pencil.svg"
                alt="Edit Icon"
                fill
                className="object-contain block group-hover:hidden"
              />
              
              <Image
                src="/images/pencil-hover.svg"
                alt="Edit Icon Hover"
                fill
                className="object-contain hidden group-hover:block"
              />
            </div>
            Edit Info
          </button>
        )}
      </div>

      {!showEdit && (
        <div className="info text-lg ">
          <p className=""><span className="font-medium">Name:</span>  {fullName}</p>
          <p className=""><span className="font-medium">Email:</span>  {email}</p>
          <p className=""><span className="font-medium">Phone:</span>  {phone}</p>
          <p className=""><span className="font-medium">Address:</span> {address}, {city}, {state} {country} {postalCode} </p>
        </div>
      )}

      {showEdit && (      

        <div className="info text-lg mt-6">
          
          <form onSubmit={editSubmitHandler} className='flex flex-col gap-4'>
            <p className="">
              <span className=" min-w-[120px] inline-block font-medium">Name: </span>
              <input className="rounded border px-2 py-1" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </p>

            <p className="">
              <span className=" min-w-[120px] inline-block font-medium">Email: </span>
              <input className="rounded border px-2 py-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </p>

            <p className="">
                <span className=" min-w-[120px] inline-block font-medium">Phone: </span>
                <input className="rounded border px-2 py-1" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </p>

            <p className="">
                <span className=" min-w-[120px] inline-block font-medium">Address: </span>
                <input className="rounded border px-2 py-1" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </p>

            <p className="">
                <span className=" min-w-[120px] inline-block font-medium">City: </span>
                <input className="rounded border px-2 py-1" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </p>

            <p className="">
                <span className=" min-w-[120px] inline-block font-medium">State: </span>
                <input className="rounded border px-2 py-1" type="text" value={state} onChange={(e) => setState(e.target.value)} />
            </p>

            <p className="">
                <span className=" min-w-[120px] inline-block font-medium">Postal Code: </span>
                <input className="rounded border px-2 py-1" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </p>


            <p className="">
                <span className="font-medium min-w-[120px] inline-block ">Country: </span>
                {/* <input className="rounded border px-2 py-1" type="text" value={country} onChange={(e) => setCountry(e.target.value)} /> */}
                <select
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value) }
                    className="rounded border px-2 py-1"
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



            </p>

            <div className="flex gap-4">
              <div onClick={e => setShowEdit(false)}><BlackButton>Cancel </BlackButton></div>
              <button className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer'>Update</button>
            </div>

          </form>
        </div>

      )}

      <div className="password mt-10">
        {!showEditPass && (
          <button onClick={e => setShowEditPass(true)} className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer'>Change Password</button>
        )}

        {showEditPass && (
          
          <form onSubmit={editPassHandler} className='mt-6 flex flex-col gap-4'>
              <h2 className="text-lg font-bold">Change your password:</h2>
              <div className="">
                  <span className=" min-w-[120px] inline-block font-medium">Old Password: </span>

                  <div className="relative max-w-[350px] w-full">
                    <input className="w-full rounded border px-2 py-1" type={showPass ? 'text' : "password" } value={password} onChange={(e) => setPassword(e.target.value)} />
                    {!showPass && <Image onClick={e => setShowPass(true)} className='absolute right-[5px] top-[5px] z-[50] cursor-pointer' src='/images/eye.svg' alt="Eye" width={24} height={24} />}
                    {showPass && <Image onClick={e => setShowPass(false)} className='absolute right-[5px] top-[5px] z-[50] cursor-pointer' src='/images/eye-closed.svg' alt="Eye" width={24} height={24} />}                 
                  </div>

              </div>

              <div className="">
                  <span className=" min-w-[120px] inline-block font-medium">New Password: </span>
                  
                  <div className="relative max-w-[350px] w-full">
                    <input className="w-full rounded border px-2 py-1" type={showNPass ? 'text' : "password" } value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    {!showNPass && <Image onClick={e => setShowNPass(true)} className='absolute right-[5px] top-[5px] z-[50] cursor-pointer' src='/images/eye.svg' alt="Eye" width={24} height={24} />}
                    {showNPass && <Image onClick={e => setShowNPass(false)} className='absolute right-[5px] top-[5px] z-[50] cursor-pointer' src='/images/eye-closed.svg' alt="Eye" width={24} height={24} />}                 
                  </div>
                  
              </div>

              <div className="">
                  <span className=" min-w-[120px] inline-block font-medium">Confirm New Password: </span>
                  
                  <div className="relative max-w-[350px] w-full">
                  <input className="w-full rounded border px-2 py-1" type={showNCPass ? 'text' : "password" } value={newConfirmPassword} onChange={(e) => setNewConfirmPassword(e.target.value)} />

                    {!showNCPass && <Image onClick={e => setShowNCPass(true)} className='absolute right-[5px] top-[5px] z-[50] cursor-pointer' src='/images/eye.svg' alt="Eye" width={24} height={24} />}
                    {showNCPass && <Image onClick={e => setShowNCPass(false)} className='absolute right-[5px] top-[5px] z-[50] cursor-pointer' src='/images/eye-closed.svg' alt="Eye" width={24} height={24} />}                 
                  </div>

              </div>

              <div className='flex gap-4'>
                <div onClick={e => setShowEditPass(false)}><BlackButton>Cancel </BlackButton></div>
                <button className='bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer'>Update Password</button>
              </div>


          </form>
        )}
      </div>


    </>
  )
}

export default page