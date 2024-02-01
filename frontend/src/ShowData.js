import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowData.css'
import { useNavigate } from 'react-router-dom'
import Editpage from './Editpage';

const ShowData = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  // const [edit, setEdit] = useState(false);
  const [items, setItems] = useState(null);
  
 
  const navigate = useNavigate();


  useEffect(() => {
    fetchData();
  }, [page, size]);

  const fetchData = async () => {

    try {
      const response = await axios.get(`http://localhost:8080/userData?page=${page}&size=${size}`);
      console.log('response.data.Info:', response.data.Info)
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
  const handleClick = (item) => {
    console.log(item)

    const User1Info = {
      id: item._id,
      name: item.name,
      designation: item.designation,
      email: item.email,
      salary: item.salary,
    };

    navigate('/Showfulldata', { state: { User1Info } });
    setItems(User1Info);
  }
  const handleUpdate = (item) => {
    // setEdit(true);
    // console.log('itemmsss', item)

    setItems(item);
    console.log('itemmsss', items)
   
    // console.log(edit);
  }

  const handleDelete = async (item) => {
    const id = item._id;
    console.log('id delete', id)
    try {
      const response = await axios.delete(`http://localhost:8080/deleteUser/${id}`);
      console.log("res", response);
      if (response.status === 200) {
        fetchData();
        const deletedData= data.filter((del)=>del._id===id);
        setData(deletedData)
        setItems(null);
      }
    }
    catch (error) {
      alert(error)
      console.error('Error:', error);

    }
  }
  const handleUpdateCallback =(updatedData)=>{
    setData((prevData)=>{
      const index = prevData.findIndex((item)=>item._id === updatedData._id);
      const updatarray=[...prevData];
      updatarray[index]=updatedData;
      return updatarray;
    })
  }

  return (
    <div className='showdata'>
      <div className='setlimit'>
        <label>No. of Data : </label>
        <select className='select' value={size} onChange={handlePageSizeChange}>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>

        </select>
      </div>



      <table>
        <tr>
          <th >Name</th>
          <th>Designation</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>

        {data.map((item)=>(
          <tr key={item._id}>
            <td className='linkto' onClick={() => handleClick(item)}> 
            {item.name}
            </td>
            <td > 
            {item.designation}
            </td>
            <td className='linkto' onClick={() => handleUpdate(item)}> 
            Edit
            </td>
            <td className='linkto' onClick={() => handleDelete(item)}> 
            Delete
            </td>

          </tr>
        ))}
   
      </table>





      <div>

        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
     {items &&
      <div >

<Editpage 

data={items}
setItems={setItems}
onUpdate={handleUpdateCallback}/>

</div>
     }
     



    </div>
  );
};

export default ShowData;