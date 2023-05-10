import React, { useState } from 'react';
import axios from "axios";
import Cookies from "universal-cookie";

export const ClinicLogin = () => {
    const [address, setClinicAddress] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false);
    const role = "clinic";
    const cookies = new Cookies();
    
    const onSubmit = (e) =>{
      e.preventDefault()
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
          window.location.href = "/clinic_page";
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
        <h1 className='text-center fs-2'>Clinic Login Page</h1>
        <p>&nbsp;</p>
        <form className="form-control form-control-lg" onSubmit={onSubmit}>
          <div className="mb-3">
              <label className="form-label fs-2">Enter your address</label>
              <input type="address" className="form-control fs-2" value={address} 
                  onChange={event => setClinicAddress(event.target.value)} required/>
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
            <p className="text-success text-center fs-3">Logged in Successfully</p>
          ) : (
            <p className="text-danger text-center fs-3">Log in Failed</p>
          )}
      </div>
    )
}

export default ClinicLogin;
