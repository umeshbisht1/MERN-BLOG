import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
function Signup() {
  const [formData,setFormdata]=useState({});
  const [errormessage,setErrorMessage]=useState(null);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();
  const handleChange=(e)=>{
   setFormdata({...formData,[e.target.id]:e.target.value.trim()})
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    if(!formData.username||!formData.email||!formData.password)
    {
      setErrorMessage("please fill all the feilds");
    }
    try {
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(data.success===false)
      {
        setErrorMessage(data.message)
      }
      navigate("/")
      setLoading(false);
      console.log(data);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
              Umesh's
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
              <Label value="Your Username"></Label>
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              ></TextInput>
            </div>
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
              <span className="pl-3">Loading....</span></>):"Sign Up"
             }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
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
  );
}

export default Signup;
