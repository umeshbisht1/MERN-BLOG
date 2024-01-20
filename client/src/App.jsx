import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import About from './pages/About.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Project from './pages/Project.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/about' element={<About />}></Route>
    <Route path='/signin' element={<Signin />}></Route>
    <Route path='/signup' element={<Signup />}></Route>
    <Route path='/dashborad' element={<Dashboard/>}></Route>
    <Route path='/project' element={<Project />}></Route>
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
