import React from 'react'
import Landing_page from './components/landing_page/landing_page'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/url_form/form"
import Results from './components/result/Results';
import CodeBrowser from './components/code_browser/CodeBrowser';
const  App = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing_page/>}/>
            <Route path='/repository' element={<Form/>}/>
            <Route path='/repository/results' element={<Results/>}/>
            <Route path='/repository/browser' element={<CodeBrowser/>}/>
          </Routes>
        </BrowserRouter>
  )
}

export default  App