import React from 'react'
import './AddData.css'
import { useLocation } from 'react-router-dom';
import './Showfulldata.css'

function Showfulldata() {
    const location = useLocation();
    const { User1Info } = location.state || {};
   

  
    


    
    
  if (!User1Info) {

    return <div>No  information available.</div>;
  }
 




  return (
    <div  className='userdatadiv'>
      <div className='singleuser'>
              <h1 className='singlehead'>Details</h1>
              <h2>Name of User: {User1Info.name}</h2>
              <h2>Designation: {User1Info.designation}</h2>
              <h2>Email: {User1Info.email}</h2>
              <h2>Salary: {User1Info.salary}</h2>
              
    </div>


   

    </div>
  )
}

export default Showfulldata 