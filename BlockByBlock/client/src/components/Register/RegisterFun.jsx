import React, {useState} from 'react';

export const RegisterFun = ({contract, account}) => {
    const [doctorAddress, setDoctorAddress] = useState('')
    const [password, setPassword] = useState('')

    const AddDoctor = event => {
        event.preventDefault();
        contract.methods.addDoctor(doctorAddress, password).send({from: account})
        setDoctorAddress('')
        contract.events.DoctorAdded(function(error, event){ 
        if(event){
          alert("Doctor added successfully!")
        }
        if(error) {
          alert("Doctor couldn't be added!")
        }
      })
    }

    return (
        <div>
            <h1 className='text-center fw-bolder'>Doctor Registration Portal</h1>
            <form className="form-control form-control-lg" onSubmit={AddDoctor}>
                <div className="form-group">
                    <label className="form-label fs-2">Enter your public address</label>
                    <input type="address" className="form-control fs-2" id="doctorAddress" //value={doctorAddress} 
                        onChange={event => setDoctorAddress(event.target.value)}/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Password</label>
                    <input type="password" className="form-control fs-2" value={password} 
                           onChange={event => setPassword(event.target.value)} required />
                </div>
                <div className="d-grid gap-2">
                  <p>&nbsp;</p>
                  <button type="submit" className="btn btn-success btn-lg btn-block fs-2">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterFun