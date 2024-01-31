import React from 'react'
import { BrowserRouter as Router ,Route , Routes } from 'react-router-dom';
import AddData from './AddData';
import ShowData from './ShowData';
import Showfulldata from './Showfulldata';
function Layout() {
  return (
    <Router>
    <Routes>
        
        <Route path='/ShowData' Component={ShowData} />
        <Route path='/' Component={AddData} />
        <Route path='/Showfulldata' Component={Showfulldata} />
    </Routes>
   </Router>
  )
}

export default Layout