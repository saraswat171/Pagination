import React, { useState } from 'react'

import './AddData.css'


import axios from 'axios'

function AddData() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [salary , setSalary]=useState();


   

    
    const handleSubmit = async (e) => {
        e.preventDefault();
  
        const data = { name, email,designation , salary};
        
          
        
            try {
                const response = await axios.post('http://localhost:8080/usersinfo', data);
                console.log("res", response);
                if (response.status === 200) {
                    console.log(response.data)
                    setName('');
                    setEmail('');
                    setDesignation('');
                    setSalary('');
                    
                }
            }
            catch (error) {
                alert(error)
                console.error('Error:', error);

            }
               

        }
       
           


    

    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <div className='hero-left'>
                    <div className='hero-head'>
                        <h1>New User Sign Up Here!</h1>
                        <p>Welcome! Sign Up for better experience.</p>
                    </div>
                    <div className='hero-input'>
                        <div className='email-content'>
                            <div className='mailbox'>
                               
                                <input type='text' name='name' id='name' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required></input>
                            </div>
                        </div>
                    </div>
                    <div className='hero-input'>
                        <div className='email-content'>
                            <div className='mailbox'>
                               
                                <input type='email' name='email' id='email' placeholder='Email Address'  value={email} onChange={(e) => setEmail(e.target.value)} required ></input>
                            </div>
                        </div>
                    </div>

                    <div className='hero-input'>
                        <div className='email-content'>
                            <div className='mailbox'>
                                
                                <input type='text' name='password' id='passwors' placeholder='Designation' value={designation} onChange={(e) => setDesignation(e.target.value)} required></input>
                               
                            </div>
                        </div>
                    </div>
                    <div className='hero-input'>
                        <div className='email-content'>
                            <div className='mailbox'>
                                
                                <input type='number' name='password' id='passwors' placeholder='salary' value={salary} onChange={(e) => setSalary(e.target.value)} required></input>
                               
                            </div>
                        </div>
                    </div>



                    <button className='signin' type='submit'  >ADD DATA</button>
                </div>
            </form>
           
           
        </div>
    )
    }

export default AddData