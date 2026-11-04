import React from 'react'
import Landing_page from './components/landing_page/landing_page'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/url_form/form"
import Results from './components/result/Results';
const  App = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing_page/>}/>
            <Route path='/repository' element={<Form/>}/>
            <Route path='/repository/results' element={<Results/>}/>
          </Routes>
        </BrowserRouter>
  )
}

export default  App