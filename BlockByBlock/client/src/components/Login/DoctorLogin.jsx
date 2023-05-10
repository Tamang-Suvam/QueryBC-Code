import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

export const DoctorLogin = ({contract}) => {
  const [doctorAddress, setDoctorAddress] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const onSubmit = (e) =>{
    e.preventDefault()
    contract.methods.checkDoctor(doctorAddress, password).call().then( x => {
      if(x){
        alert("Successfully logged in!")
        navigate("/doctors_page")
      } else{
        alert("Failed to log in!!")
      }
    });
  }

  return (
    <div>
      <form className="form-control form-control-lg" onSubmit={onSubmit}>
        <div className="mb-3">
            <label className="form-label fs-2">Enter your public address</label>
            <input type="address" className="form-control fs-2" id="doctorAddress" //value={doctorAddress} 
                onChange={event => setDoctorAddress(event.target.value)}/>
        </div>
        <div className="form-group">
          <label className='fs-2'>Password</label>
          <input type="password" className="form-control fs-2" value={password} 
                 onChange={event => setPassword(event.target.value)}  />
        </div>
        <div className="d-grid gap-2">
          <p>&nbsp;</p>
          <button type="submit" className="btn btn-success btn-lg btn-block fs-2">Log In</button>
        </div>
      </form>
    </div>
  )
}

export default DoctorLogin;