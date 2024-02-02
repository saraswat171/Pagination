import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowData.css'
import { useNavigate } from 'react-router-dom'
import Editpage from './Editpage';
import DesignationFilter from './Components/DesignationFilter';

const ShowData = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [flag, setFlag] = useState('name');
  const [cnt, setCnt] = useState(1);

  const [items, setItems] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState('');


  const navigate = useNavigate();


  useEffect(() => {
    fetchData();
  }, [page, size, flag, selectedDesignation]);

  const fetchData = async () => {
    try {
      let url = `http://localhost:8080/userData?page=${page}&size=${size}&flag=${flag}`;

        
      if (selectedDesignation) {

        url += `&designation=${selectedDesignation}`;
      }

      const response = await axios.get(url);

      setData(response.data.Info);
      const c = Math.ceil(response.data.Count / size);
      setCnt(c);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageSizeChange = (e) => {
    setSize(parseInt(e.target.value));
    setPage(1);
  };
  const handleSalarysortChange = (e) => {
    setFlag(e.target.value);

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
    setItems(item);
    console.log('itemmsss', items)
  }

  const handleDelete = async (item) => {
    const id = item._id;
    console.log('id delete', id)
    try {
      const response = await axios.delete(`http://localhost:8080/deleteUser/${id}`);
      console.log("res", response);
      if (response.status === 200) {
        fetchData();
        const deletedData = data.filter((del) => del._id === id);
        setData(deletedData)
        setItems(null);
      }
    }
    catch (error) {
      alert(error)
      console.error('Error:', error);

    }
  }
  const handleUpdateCallback = (updatedData) => {
    setData((prevData) => {
      const index = prevData.findIndex((item) => item._id === updatedData._id);
      const updatarray = [...prevData];
      updatarray[index] = updatedData;
      return updatarray;
    })
  }
  const handleFilterChange = (designation) => {
    setSelectedDesignation(designation);

  };
  const handleaddClick = () => {
    navigate('/')
  }

  return (
    <div className='showdiv'>
      <div className='showdata'>
        <div className='showdata-head' >
          <h1 className='showdata-head1'>Employees Data</h1>
        </div >
        <div className='showdata-upper'>

          <div className='showdata-btn'>
            <button className='signoff' type='submit' onClick={handleaddClick} >+ADD DATA</button>
          </div>
          <div className=' showdata-data'>
            <label className='textcolor'>sort by : </label>
            <select className='select' value={flag} onChange={handleSalarysortChange}>
              <option value='salary' >Salary </option>
              <option value='name'>Name</option>

            </select>
          </div>

          <div className=' showdata-data'>
            <DesignationFilter onFilterChange={handleFilterChange} />
          </div>
        </div>

        <table>
          <tr>
            <th >Name</th>
            <th>Designation</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>

          {data.map((item) => (
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

        <div className='showdiv-lower'>
          <div className='setlimit'>
            <label className='textcolor'>No. of Data : </label>
            <select className='select' value={size} onChange={handlePageSizeChange}>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>

            </select>
          </div>



          <div>

            <button disabled={page === 1} onClick={() => setPage(page - 1)} className='textcolor btn1'>
              Previous
            </button>
            <span className='textcolor'>  {page} </span>
            <button disabled={page === cnt} onClick={() => setPage(page + 1)} className='textcolor btn1' >Next</button>
          </div>
        </div>
        {items &&
          <div >

            <Editpage

              data={items}
              setItems={setItems}
              onUpdate={handleUpdateCallback} />

          </div>
        }




      </div>
    </div>
  );
};

export default ShowData;