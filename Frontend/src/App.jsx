import React from 'react'
import Landing_page from './components/landing_page/landing_page'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const  App = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing_page/>}/>
          </Routes>
        </BrowserRouter>
  )
}

export default  App