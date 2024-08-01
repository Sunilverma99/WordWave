import React, { useState } from 'react'
import {Label ,TextInput ,Button } from "flowbite-react"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/user/userSlice';
import {useDispatch } from 'react-redux'
import OAuth from '../components/OAuth';
import useScrollToTop from "../components/useScrollToTop.jsx"
function Signin() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useScrollToTop();
    const handleSubmit = async (e) => {
      e.preventDefault(); // Corrected typo here
      if (email === "" || password === "") {
        toast.error("Please fill all the fields");
      }
     else if (password.length < 6) {
        toast.error("Incorrect password");
        
      }
    
      try {
        const res = await fetch('/api/auth/signIn', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        });
        const data = await res.json();
        if ( res.status===200 && res.ok) {
          toast.success("You are Logged in successfully");
          dispatch(setUser(data));
          navigate('/');
        } else {
          toast.error(data.message || "Something went wrong");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    
    
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-5  flex-col md:flex-row md:items-center gap-6'>
         <div className='flex-1'>
         <Link to='/' className=' text-5xl text-black   font-bold dark:text-white'>
    <img src="https://www.marklytics.co.uk/wp-content/uploads/2023/12/logomark0.png" alt="" />
  </Link>
  <p className='m-4 text-teal-800 text-xl italic'>Discover exclusive content! Sign up now with your email or Google account to start exploring our blogs.</p>
  </div>
         <div className='flex-1'>
          <form onSubmit={handleSubmit}  className='flex flex-col gap-4' >
            <Label >Your Email</Label>
           <TextInput 
              type='text'
              placeholder="name@company.com"
              id='email'
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Label >Your Password</Label>
           <TextInput 
              type='password'
              placeholder="Password"
              id='password'
              onChange={(e)=>setPassword(e.target.value)}
            />
             <Button type='submit' outline  gradientDuoTone="purpleToPink" >
        Sign in
      </Button >
      <OAuth/>
      <div className='flex gap-2'>
        <span>Have an account ?</span>
        <Link to='/sign-up'>Sign-up</Link>
      </div>
      
          </form>
         </div>
      </div>
    </div>
  )
}

export default Signin;