import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import {signInStart,signInSuccess,signInFailure} from '../redux/user/user.slice.js'
import {useDispatch,useSelector} from 'react-redux'
import Oauth from "../components/Oauth.jsx";

export default function Signin() {
  const [formData,setFormdata]=useState({});

  const dispatch=useDispatch();
  const loading=useSelector(state=>state.user.loading)
  const errormessage=useSelector(state=>state.user.errror)
  const navigate=useNavigate();
  const handleChange=(e)=>{
   setFormdata({...formData,[e.target.id]:e.target.value.trim()})
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
   dispatch(signInStart())
    if(!formData.email||!formData.password)
    {
      dispatch(signInFailure("please fill all the feilds"));
    }
    try {
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(data.success===false)
      {
        dispatch(signInFailure(data.message));
      }
    
      if(res.ok)
      {
        navigate("/")
        dispatch(signInSuccess(data));
      }
     
      console.log(data);
    } catch (error) {
     dispatch(signInFailure(error.message))
    }
  }


  return (
    <div className="min-h-screen mt-20">
    <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      <div className="flex-1">
        <Link to="/" className=" font-bold dark:text-white text-4xl">
          <span
            className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 
                        rounded-lg text-white"
          >
            Sahand's
          </span>
          Blog
        </Link>
        <p className="mt-4">
          This is demo project you can signup with your email and password or
          with the google
        </p>
      </div>
      <div className="flex-1">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="div">
            <Label value="Your email"></Label>
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
            ></TextInput>
          </div>
          <div className="div">
            <Label value="Your password"></Label>
            <TextInput
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
            ></TextInput>
          </div>
          <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
           {
            loading?(<><Spinner size='sm'/>
            <span className="pl-3">Loading....</span></>):"Sign In"
           }
          </Button>
         <Oauth></Oauth>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Don't Have an account?</span>
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </div>
        {
          errormessage&&
          <Alert className="mt-5" color='failure'>
            {errormessage}
          </Alert>
        }
      </div>
    </div>
  </div>
  )
}
