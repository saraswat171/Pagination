import React, { useEffect } from 'react';
import axios from 'axios'
function Editpage({data, setItems , onUpdate}) {
 
    
    const handleupdateSubmit = async (e) => {
        e.preventDefault();
        
        const updata = { ...data };
        
        console.log('idid to update', data._id)
        const id = data._id;
        try {
            const response = await axios.put(`http://localhost:8080/update/${id}`, updata);
            console.log("res", response);
            if (response.status === 200) {
                console.log(response.data)
                onUpdate(updata)
                setItems(null)
                
                
            }
        }
        catch (error) {
            alert(error)
            console.error('Error:', error);
            
        }
        
        
    }
    useEffect(()=>{
        console.log(data)
    },[data])
    
    if(!data) return ;
    const handleOnChange=(e)=>{
        
        const value=e.target.value;
        const name =e.target.name;
       console.log('value', value)

        setItems((prevData)=>{
           return {...prevData , [name]:value}
        })
        
       

    }

  return (
    <div className='updatediv'>    <div className='register'>
    <form  onSubmit={handleupdateSubmit} >
      
        <div className='hero-left'>
            <div className='hero-head'>
                <h1>Update your Details here!</h1>
                <p>Welcome! for better experience.</p>
            </div>
            <div className='hero-input'>
                <div className='email-content'>
                    <div className='mailbox'>
                       
                        <input type='text' name='name' id='name' value={data.name}   onChange={handleOnChange} placeholder='Enter your name'  required></input>
                     
                    </div>
                </div>
            </div>
            <div className='hero-input'>
                <div className='email-content'>
                    <div className='mailbox'>
                       
                        <input type='email' name='email' id='email' value={data.email} onChange={handleOnChange} placeholder='Email Address'   required ></input>
                        
                    </div>
                </div>
            </div>

            <div className='hero-input'>
                <div className='email-content'>
                    <div className='mailbox'>
                        
                        <input type='text' name='designation' id='passwors' value={data.designation} onChange={handleOnChange} placeholder='Designation'  required></input>
                    
                       
                    </div>
                </div>
            </div>
            <div className='hero-input'>
                <div className='email-content'>
                    <div className='mailbox'>
                        
                        <input type='number' name='salary' id='passwors' value={data.salary} onChange={handleOnChange} placeholder='salary'  required></input>
                      
                       
                    </div>
                </div>
            </div>



            <button className='signin' type='submit' >UPDATE DATA</button>
        </div>
    </form>
   
   
</div></div>
  )
}

export default Editpage