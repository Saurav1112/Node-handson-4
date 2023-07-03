import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const[formdata, setFormdata] = useState({EmailAdress:"",Password:""})
    const[formSubmission, setFormsubmission] = useState([])

    const handleOnchange = (event)=>{
        const  {name, value} = event.target
        setFormdata({...formdata , [name]:value})
    }

    const handleOnSubmit  = (event)=>{
            event.preventDefault()
            setFormsubmission([...formSubmission, formdata])
            setFormdata({EmailAdress:"",Password:""}) 

            //Sending the Login request//
             axios.post('http://localhost:5000/login?email=' + formdata.EmailAdress + '&password=' + formdata.Password)
            .then((response) => {
            console.log(response.data);
            })
            .catch((error) => {
            console.error(error);
            });

    }

  return (
    <>
    
    <h1>All in One Store</h1>

    <div className='Image-Container'>
    <img src='https://png.pngtree.com/png-vector/20220610/ourmid/pngtree-lock-icon-on-white-background-png-image_4859938.png'
    alt='Not-Found' className='Login-Image'/></div>

    <h2>Login</h2>

   <div className='Login-Container'>
    <form onSubmit={handleOnSubmit} className='Login-Form'>
 
    <div className='Login-Section'>
    <label>
        Email Address
    <input type='email' name='EmailAdress' placeholder='Email Address' value={formdata.EmailAdress} required onChange={handleOnchange}/>
    </label>

    
    <label className='Login-Password-Section'>
       Password
    <input type='password' name='Password' placeholder='Password' value={formdata.Password} required onChange={handleOnchange}/>
    </label>
 

    <button className='Login-Button'>LOGIN</button></div>
</form></div>
<Link to="./Signup" className='lin5'>Don't have an account? Sign Up</Link>
    </>
  )
}

export default Login