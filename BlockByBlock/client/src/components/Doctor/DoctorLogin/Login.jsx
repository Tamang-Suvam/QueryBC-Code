import React, { useState } from 'react';
// import {  useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "universal-cookie";

export const Login = ({contract}) => {
  const [address, setDoctorAddress] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false);
  const role = "doctor";
  // const navigate = useNavigate();
  const cookies = new Cookies();
  
  const onSubmit = (e) =>{
    e.preventDefault()
    // contract.methods.checkDoctor(address, password).call().then( x => {
    //   if(x){
    //     alert("Successfully logged in!")
    //     navigate("/doctor_page")
    //   } else{
    //     alert("Failed to log in!!")
    //     return
    //   }
    // });
    if( !address || !password ){
      alert("Address or Password cannot be left empty!")
    } else {
       // set configurations
       const configuration = {
        method: "post",
        url: "http://localhost:4001/login",
        data: {
        address,
        password,
        role,
        },
       };
       // make the API call
        axios(configuration)
        .then((result) => {
        setLogin(true);
        alert(result.data.message);
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
        path: "/",
        });
        // redirect user to the auth page
        window.location.href = "/doctor_page";
        })
        .catch((error) => {
        alert(error.response.data.message);
        // error = new Error();
        });
            }
  }

  return (
    <div>
      <p>&nbsp;</p>
      <h1 className='text-center fs-2'>Doctor Login Page</h1>
      <p>&nbsp;</p>
      <form className="form-control form-control-lg" onSubmit={onSubmit}>
        <div className="mb-3">
            <label className="form-label fs-2">Enter your address</label>
            <input type="address" className="form-control fs-2" value={address} 
                onChange={event => setDoctorAddress(event.target.value)} required/>
        </div>
        <div className="form-group">
          <label className='fs-2'>Password</label>
          <input type="password" className="form-control fs-2" value={password} 
                 onChange={event => setPassword(event.target.value)} required/>
        </div>
        <div className="d-grid gap-2">
          <p>&nbsp;</p>
          <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Log In</button>
        </div>
      </form>
      {login ? (
          <p className="text-success text-center fs-3">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger text-center fs-3">You Are Not Logged in</p>
        )}
    </div>
  )
}

export default Login;