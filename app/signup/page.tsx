"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignupPage = () => {
   const router = useRouter()
   
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading,setLoading]= useState(false)

  // function for signup
  const signup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log('signup success', response.data)
      toast.success('Signup successful')
      router.push('/login')
    } catch (error:any) {
      console.log('signup failed')
      toast.error('Signup failed', error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className='bg-red-400 w-full flex flex-col gap-4'>
      <h1>{loading ? "Loading..." : "Signup"}</h1>

      <input 
        type="text" 
        id='username' 
        value={user.username} 
        onChange={(e) => setUser({ ...user, username: e.target.value })} 
        placeholder='Username' 
        className='text-black'
      />

      <input 
        type="text" 
        id='email' 
        value={user.email} 
        onChange={(e) => setUser({ ...user, email: e.target.value })} 
        placeholder='Email' 
         className='text-black'
      />

      <input 
        type="password" 
        id='password' 
        value={user.password} 
        onChange={(e) => setUser({ ...user, password: e.target.value })} 
        placeholder='Password'
         className='text-black' 
      />

      <button 
        onClick={signup} 
        className='bg-green-500 text-2xl' 
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>

      <Link href={'/login'}>Visit login</Link>
    </div>
  )
}

export default SignupPage
