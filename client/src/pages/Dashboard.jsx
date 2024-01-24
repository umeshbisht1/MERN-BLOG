import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSlidebar from '../components/DashSlidebar';
import Profile from '../components/Profile';
function Dashboard() {
  const location =useLocation();
  const [tab,setTab]=useState('');
  useEffect(()=>{
    const urlprams=new URLSearchParams(location.search)
    const tabFromUrl=urlprams.get('tab');
    if(tabFromUrl)
    {
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row '>
     
     <div className="md:w-56">
      <DashSlidebar/>
      </div>  
     <div className="">
     {tab==='profile'&& <Profile/>}
     </div>
    </div>
  )
}

export default Dashboard
