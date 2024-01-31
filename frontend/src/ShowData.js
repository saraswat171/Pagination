import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowData.css'
import { useNavigate } from 'react-router-dom'

const ShowData = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const navigate =useNavigate();
 
           
  useEffect(() => {
    fetchData();
  }, [page, size]);

  const fetchData = async () => {
    
    try {
      const response = await axios.get(`http://localhost:8080/userData?page=${page}&size=${size}`);
      console.log('response.data.Info:',response.data.Info)
      setData(response.data.Info);
      console.log('data to show', data[0]._id)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageSizeChange = (e) => {
    setSize(parseInt(e.target.value));
    setPage(1); 
  };
  const handleClick=(item)=>{
    console.log(item)

    const User1Info = {
     name : item.name,
     designation: item.designation,
     email: item.email,
     salary: item.salary,
    };

    navigate('/Showfulldata', { state: { User1Info } });
      
  }

  return (
    <div className='showdata'>
     <div className='setlimit'>
     <label>No. of Data : </label>
      <select className='select' value={size} onChange={handlePageSizeChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
       
      </select>
     </div>

     

<table>
  <tr>
    <th >Name</th>
    <th>Designation</th>
  </tr>
  <tr>
    <td   >{data.map((item) => (
        <div key={item._id} className='linkto' onClick={()=>handleClick(item)}>
          
          {item.name}
        </div>
      ))}</td>
       <td>{data.map((item) => (
        <div key={item._id}>
         
          {item.designation}
        </div>
      ))}</td>
    
  </tr>
  <tr>
   
   
  </tr>
</table>





<div>
  
<button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <span> Page {page} </span>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
</div>
  );
};

export default ShowData;