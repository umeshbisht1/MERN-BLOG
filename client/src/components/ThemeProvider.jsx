import React, { Children } from 'react'
import {  useSelector } from 'react-redux'
function ThemeProvider({children}) {
    const {theme}=useSelector(state=>state.theme)
   
  return (
    <div className={theme}>
     <div className=" bg-white  text-grey-200  dark:text-white
      dark:bg-[rgb(16,23,42)] min-h-screen">
          {children}
     </div>
    </div>
  )
}

export default ThemeProvider
