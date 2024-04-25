import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Update from './Update'
import Delete from './Delete'
import "bootstrap/dist/css/bootstrap.css";
const App = () => {
  return (
   <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/delete/:id' element={<Delete/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
