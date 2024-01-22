import React from 'react'
import { Button } from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../Firebase.js'
import { useDispatch } from 'react-redux'
import { signInFailure, signInSuccess } from '../redux/user/user.slice'
import { useNavigate } from 'react-router-dom'
function Oauth() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handlegoogle=async()=>{
        const auth=getAuth(app)
        const provider=new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'})
        try {

            const resultFromGoogle=await signInWithPopup(auth,provider)
           const res=await fetch('/api/auth/google',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              name:resultFromGoogle.user.displayName,
               email:resultFromGoogle.user.email,
               googlePhotoUrl:resultFromGoogle.user.photoURL
            }),

           })
           const data=await res.json();
           if(data.success==false)
           {
            dispatch(signInFailure(data.message))
           }
           if(res.ok)
           {
            dispatch(signInSuccess(data))
            navigate("/")
           }
        } catch (error) {
            console.log(error)
          
        }

    }
  return (
    
     <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handlegoogle}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'></AiFillGoogleCircle>
      Continue with Google
     </Button>
    
  )
}

export default Oauth
