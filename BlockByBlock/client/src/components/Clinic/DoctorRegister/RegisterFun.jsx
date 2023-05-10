import React, {useState} from 'react';
import axios from "axios"
export const RegisterFun = () => {
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [department, setDepartment] = useState("");
    const role = "doctor";

    const AddDoctor = event => {
        event.preventDefault();
        if( !address || !name || !password ){
          alert("Address or Name or Password cannot be left empty!")
        } 
        else {
          // set configurations
        //   const configuration = {
        //       method: "post",
        //       url: "http://localhost:4001/register",
        //       data: {
        //       address,
        //       name,
        //       password,
        //       role,
        //       department,
        //       },
        //   };
        const configuration = {
            method: "post",
            url: "http://localhost:4001/register",
            data: {
            address,
            name,
            password,
            role,
            department,
            },
        };
            // make the API call
            axios(configuration)
            .then((result) => {
                setRegister(true);
            })
            .catch((error) => {
                console.error(error)
            });
        }
      //   contract.methods.addDoctor(doctorAddress, password).send({from: account})
      //   setDoctorAddress('')
      //   contract.events.DoctorAdded(function(error, event){ 
      //   if(event){
      //     alert("Doctor added successfully!")
      //   }
      //   if(error) {
      //     alert("Doctor couldn't be added!")
      //   }
      // })
    }

    return (
        <div>
            <h1 className='text-center fw-bolder'>Doctor Registration Portal</h1>
            <form className="form-control form-control-lg" onSubmit={AddDoctor}>
                {/* <div className="form-group">
                    <label className="form-label fs-2">Enter your public address</label>
                    <input type="address" className="form-control fs-2" id="doctorAddress" //value={doctorAddress} 
                        onChange={event => setDoctorAddress(event.target.value)}/>
                </div>
                <p>&nbsp;</p> */}
                <div className="form-group">
                    <label className="form-label fs-2">Enter Doctor's Email</label>
                    <input type="address" className="form-control fs-2" value={address} 
                        onChange={event => setAddress(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Enter Doctors's Name</label>
                    <input type="address" className="form-control fs-2" value={name} 
                        onChange={event => setName(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Enter Doctors's Department</label>
                    <input type="address" className="form-control fs-2" value={department} 
                        onChange={event => setDepartment(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Password</label>
                    <input type="password" className="form-control fs-2" value={password} 
                           onChange={event => setPassword(event.target.value)} required />
                </div>
                <div className="d-grid gap-2">
                  <p>&nbsp;</p>
                  <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Register</button>
                </div>
            </form>
            <p>&nbsp;</p>
            { register ? (
                            <p className="text-success text-center fs-3">You Are Registered Successfully</p>
                         ) : (
                            <p className="text-danger text-center fs-3">You Are Not Registered</p>
                         )
            }
        </div>
    )
}

export default RegisterFun