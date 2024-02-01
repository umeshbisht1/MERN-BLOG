import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSlidebar from '../components/DashSlidebar';
import Profile from '../components/Profile';
import Dashpost from '../components/Dashpost';
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
    
     {tab==='profile'&& <Profile/>}
     {
      tab=='post' && <Dashpost/>
     }
     
    </div>
  )
}

export default Dashboard
