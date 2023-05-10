import React, {useState} from 'react'
import { Form, Button, Container, Row, Col, InputGroup, Alert } from 'react-bootstrap'
import './docregister.css'
import qehr from '../../../assets/QEHRs.png'
import { FaEnvelope, FaUser, FaLock, FaClinicMedical, FaAddressCard } from "react-icons/fa";

export const RegisterFun = ({contract, account}) => {
    const [doctorAddress, setDoctorAddress] = useState('')
    const [doctorName, setDoctorName] = useState('')
    const [clinicName, setClinicName] = useState('')
    const [doctorDepartment, setDoctorDepartment] = useState('')
    const [password, setPassword] = useState('')
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showFailureAlert, setShowFailureAlert] = useState(false)

    const AddDoctor = async event => {
        event.preventDefault();
        if( !doctorAddress || !doctorName || !doctorDepartment|| !password ){
          alert("Doctor ID or Name or Department or Password cannot be empty!")
        } 
        else {
            await contract.methods.clinicAddDoctor(doctorAddress, doctorName, clinicName.toUpperCase(), account, doctorDepartment.toUpperCase(), password).send({from: account})
            contract.events.DoctorAdded(function(error, event){ 
            if(event){
              setShowSuccessAlert(true);
              setShowFailureAlert(false);
              return
            }
            if(error) {
              setShowSuccessAlert(false);
              setShowFailureAlert(true);
            }
          }) 
        }
    }

    return (
        // <div>
        //     <h1 className='text-center fw-bolder'>Doctor Registration Portal</h1>
        //     <form className="form-control form-control-lg" onSubmit={AddDoctor}>
        //         <div className="form-group">
        //             <label className="form-label fs-2">Enter Doctor's ID</label>
        //             <input type="address" className="form-control fs-2" value={doctorAddress} 
        //                 onChange={event => setDoctorAddress(event.target.value)} required/>
        //         </div>
        //         <p>&nbsp;</p>
        //         <div className="form-group">
        //             <label className="form-label fs-2">Enter Doctors's Name</label>
        //             <input type="text" className="form-control fs-2" value={doctorName} 
        //                 onChange={event => setDoctorName(event.target.value)} required/>
        //         </div>
        //         <p>&nbsp;</p>
        //         <div className="form-group">
        //             <label className="form-label fs-2">Enter Clinic Name</label>
        //             <input type="text" className="form-control fs-2" value={clinicName} 
        //                 onChange={event => setClinicName(event.target.value)} required/>
        //         </div>
        //         <p>&nbsp;</p>
        //         <div className="form-group">
        //             <label className="form-label fs-2">Enter Doctors's Department</label>
        //             <input type="text" className="form-control fs-2" value={doctorDepartment} 
        //                 onChange={event => setDoctorDepartment(event.target.value)} required/>
        //         </div>
        //         <p>&nbsp;</p>
        //         <div className="form-group">
        //             <label className="form-label fs-2">Password</label>
        //             <input type="password" className="form-control fs-2" value={password} 
        //                    onChange={event => setPassword(event.target.value)} required />
        //         </div>
        //         <div className="d-grid gap-2">
        //           <p>&nbsp;</p>
        //           <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Register</button>
        //         </div>
        //     </form>
        //     <p>&nbsp;</p>
        //     { register ? (
        //                     <p className="text-success text-center fs-6">Doctor Registered Successfully</p>
        //                  ) : (
        //                     <p className="text-danger text-center fs-6">Doctor Not Registered</p>
        //                  )
        //     }
        // </div>
    //     <Form onSubmit={AddDoctor}>
    //       <Form.Group controlId="formAddress">
    //         <Form.Label>Doctor Metamask Address</Form.Label>
    //         <Form.Control
    //           type="text"
    //           placeholder="Enter Metamask Address"
    //           value={doctorAddress}
    //           onChange={(event) => setDoctorAddress(event.target.value)}
    //         />
    //       </Form.Group>

    //       <Form.Group controlId="formName">
    //         <Form.Label>Name</Form.Label>
    //         <Form.Control
    //           type="text"
    //           placeholder="Enter Doctor Name"
    //           value={doctorName}
    //           onChange={(event) => setDoctorName(event.target.value)}
    //         />
    //       </Form.Group>

    //       <Form.Group controlId="formClinicName">
    //         <Form.Label>Clinic Name</Form.Label>
    //         <Form.Control
    //           type="text"
    //           placeholder="Enter specialty"
    //           value={clinicName}
    //           onChange={(event) => setClinicName(event.target.value)}
    //         />
    //       </Form.Group>

    //       <Form.Group controlId="formDepartment">
    //         <Form.Label>Department</Form.Label>
    //         <Form.Control
    //           type="text"
    //           placeholder="Enter phone number"
    //           value={doctorDepartment}
    //           onChange={(event) => setDoctorDepartment(event.target.value)}
    //         />
    //       </Form.Group>

    //       <Form.Group controlId="formPassword">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control
    //           type="password"
    //           placeholder="Enter phone number"
    //           value={password}
    //           onChange={(event) => setPassword(event.target.value)}
    //         />
    //       </Form.Group>
    //       <Button variant="primary" type="submit">
    //         Submit
    //       </Button>
    // </Form>

    <div className="registration-page gradient-background">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} lg={5} xl={4} className="registration-form">
            <div className="brand mt-2">
              <img src={qehr} alt="logo" />
            </div>
            <h4 className="mb-4">Signing Up Doctor to QEHRs</h4>
            <Form>

              <Form.Group controlId="formBasicName" className='mb-2'>
              <InputGroup>
                <InputGroup.Text className="inputgroup-text"><FaUser/></InputGroup.Text>
                <Form.Control type="text" placeholder="Doctor Name" className="form-control-lg" 
                              onChange={(e) => setDoctorName(e.target.value)}/>
              </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicAddress" className='mb-2'>
              <InputGroup>
                <InputGroup.Text className="inputgroup-text"><FaEnvelope/></InputGroup.Text>
                <Form.Control type="text" placeholder="Doctor Metamask Address" className="form-control-lg"
                              onChange={(e) => setDoctorAddress(e.target.value)}/>
              </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicClinicName" className='mb-2'>
              <InputGroup>
                <InputGroup.Text className="inputgroup-text"><FaClinicMedical/></InputGroup.Text>
                <Form.Control type="text" placeholder="Clinic Name" className="form-control-lg"
                              onChange={(e) => setClinicName(e.target.value)}/>
              </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicDepartment" className='mb-2'>
              <InputGroup>
                <InputGroup.Text className="inputgroup-text"><FaAddressCard/></InputGroup.Text>
                <Form.Control type="text" placeholder="Department" className="form-control-lg"
                              onChange={(e) => setDoctorDepartment(e.target.value)}/>
              </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className='mb-2'>
                <InputGroup>
                  <InputGroup.Text className="inputgroup-text"><FaLock/></InputGroup.Text>
                <Form.Control type="password" placeholder="Password" className="form-control-lg"
                              onChange={(e) => setPassword(e.target.value)}/>
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" block className="btn-lg"
                      onClick={AddDoctor}>
                Register
              </Button>

              {showSuccessAlert && (
                <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                  Doctor Registration successful!
                </Alert>
              )}
              {showFailureAlert && (
                <Alert variant="danger" onClose={() => setShowFailureAlert(false)} dismissible>
                  Doctor Registration failed! Enter only the valid credentials and try again.
                </Alert>
              )}
            </Form>
            {/* <p className="mt-3 mb-0 text-center">
                Already have an account? <a href="/clinic_login">Sign In</a>
            </p> */}
          </Col>
        </Row>
      </Container>
    </div>

    )
}

export default RegisterFun