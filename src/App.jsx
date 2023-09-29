import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Details from './Routes/Details'
import Home from './Routes/Home'

function App() {
  
  return (
    <>
    <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/detail/:id' element={<Details/>}/>
    </Routes>
    </>
  )
}

export default App
