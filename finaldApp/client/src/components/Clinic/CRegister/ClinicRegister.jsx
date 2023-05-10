// import React , { useState } from 'react';

// export default function ClinicRegister({contract, account}) {
//     const [name, setName] = useState("");
//     // const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [register, setRegister] = useState(false);

//     const AddClinic = (e) => {
//         e.preventDefault();
//         if( !password ){
//             alert("Email or Password cannot be empty!")
//         } else {
//             contract.methods.addClinic(name, password).send({from: account})
//             contract.events.ClinicAdded(function(error, event){ 
//             if(event){
//               console.log(event.returnValues.clinicName)
//               setRegister(true)
//               return
//             }
//             if(error) {
//               alert("Clinic couldn't be added!")
//             }
//           }) 
//         }
//   }


//     return (
//         <div>
//             <h1 className='text-center fw-bolder'>Clinic Registration Portal</h1>
//             <form className="form-control form-control-lg" onSubmit={AddClinic}>
//                 {/* <div className="form-group">
//                     <label className="form-label fs-2">Enter Clinic Address</label>
//                     <input type="address" className="form-control fs-2" value={email} 
//                         onChange={event => setEmail(event.target.value)} required/>
//                 </div> */}
//                 <p>&nbsp;</p>
//                 <div className="form-group">
//                     <label className="form-label fs-2">Enter Clinic Name</label>
//                     <input type="address" className="form-control fs-2" value={name} 
//                         onChange={event => setName(event.target.value)} required/>
//                 </div>
//                 <p>&nbsp;</p>
//                 <div className="form-group">
//                     <label className="form-label fs-2">Password</label>
//                     <input type="password" className="form-control fs-2" value={password} 
//                            onChange={event => setPassword(event.target.value)} required />
//                 </div>
//                 <div className="d-grid gap-2">
//                   <p>&nbsp;</p>
//                   <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Register</button>
//                 </div>
//             </form>
//             <p>&nbsp;</p>
//             { register ? (
//                             <p className="text-success text-center fs-3">Clinic Registered Successfully</p>
//                          ) : (
//                             <p className="text-danger text-center fs-3">Clinic Not Registered</p>
//                          )
//             }
//         </div>
//     )
// }

// import React, { useState } from "react"
// import {  useNavigate } from 'react-router-dom'
// // import inputImage from '../../../assets/loginPic.webp'
// import { Container, Row, Col, Form, Button } from "react-bootstrap";

// export default function ClinicRegister({contract, account}) {
//   const [name, setName] = useState(" ")
//   const [Address, setAddress] = useState(" ")
//   const [password, setPassword] = useState(" ")
//   const [register, setRegister] = useState(false)
//   const [location, setLocation] = useState(" ")
//   const navigate = useNavigate()

//   const handleClick = e => {
//     e.preventDefault()
//     navigate("/clinic_login")
//   }

//   // The function below is for registration of the clinic into the system
//   const AddClinic = (e) => {
//       e.preventDefault();
      
//       if( !name || !password ){
//           alert("Clinic name or password cannot be empty!")
//       } else {
//           // Trying for encryption now
//           contract.methods.addClinic(name.toUpperCase(), location.toUpperCase(), password).send({from: account})
//           contract.events.ClinicAdded(function(error, event){ 
          
//             if(event){
//               setRegister(true)
//               return
//             }
//             if(error) {
//               alert("Clinic couldn't be added!")
//             }
//           }) 
//       }
//   }

//   const myStyle={
//     // backgroundImage: `url(${inputImage})`,
//     position: 'fixed',
//     top: '0',
//     left: '0',
//     width: '100vw',
//     height: '100vh',
//     backgroundSize: 'cover',
//   }

//   return (
//     <>
//       <div style={myStyle}>
//         <div className="Auth-form-container">
//           <form className="Auth-form">
//             <div className="Auth-form-content">
//               <h3 className="Auth-form-title fs-2">Sign Up</h3>
//               <div className="text-center fs-2">
//                 Already registered?{" "}
//                 <span className="link-primary" onClick={handleClick}>
//                   Sign In
//                 </span>
//               </div>
//               <div className="form-group mt-3 fs-2">
//                 <label>Clinic Name</label>
//                 <input
//                   type="text"
//                   className="form-control mt-1 fs-2"
//                   placeholder="Clinic Name (hyphen) separated"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group mt-3 fs-2">
//                 <label>Clinic Public Metamask Address</label>
//                 <input
//                   type="address"
//                   className="form-control mt-1 fs-2"
//                   placeholder="e.g 0x53D411001529BcEC9fcce19D37B0704A51854F38"
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//               </div>
//               <div className="form-group mt-3 fs-2">
//                 <label>Clinic Location</label>
//                 <input
//                   type="text"
//                   className="form-control mt-1 fs-2"
//                   placeholder="e.g Puttaparthi, Andhra Pradesh"
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </div>
//               <div className="form-group mt-3 fs-2">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   className="form-control mt-1 fs-2"
//                   placeholder="Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <div className="d-grid gap-2 mt-3 fs-2">
//                 <button type="submit" className="btn btn-outline-primary fs-2"
//                         onClick={AddClinic}>
//                   Submit
//                 </button>
//               </div>
//               <p className="text-center mt-2 fs-5">
//                 Forgot <a href="#">password?</a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//     // <div className="bg-image">
//     //   <Container className="h-100">
//     //     <Row className="justify-content-center align-items-center h-100">
//     //       <Col md={8} lg={6}>
//     //         <div className="registration-form">
//     //           <h3 className="text-center mb-4">Create an account</h3>
//     //           <Form>
//     //             <Row>
//     //               <Col>
//     //                 <Form.Group controlId="formBasicFirstName">
//     //                   <Form.Label>First name</Form.Label>
//     //                   <Form.Control type="text" placeholder="Enter first name" />
//     //                 </Form.Group>
//     //               </Col>
//     //               <Col>
//     //                 <Form.Group controlId="formBasicLastName">
//     //                   <Form.Label>Last name</Form.Label>
//     //                   <Form.Control type="text" placeholder="Enter last name" />
//     //                 </Form.Group>
//     //               </Col>
//     //             </Row>

//     //             <Form.Group controlId="formBasicEmail">
//     //               <Form.Label>Email address</Form.Label>
//     //               <Form.Control type="email" placeholder="Enter email" />
//     //             </Form.Group>

//     //             <Form.Group controlId="formBasicPassword">
//     //               <Form.Label>Password</Form.Label>
//     //               <Form.Control type="password" placeholder="Password" />
//     //             </Form.Group>

//     //             <Button variant="primary" type="submit" className="w-100 mt-3">
//     //               Create account
//     //             </Button>
//     //           </Form>
//     //         </div>
//     //       </Col>
//     //     </Row>
//     //   </Container>
//     // </div>
//   )
// }

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Alert} from 'react-bootstrap';
import './register.css'; 
import qehr from '../../../assets/QEHRs.png'
import { FaEnvelope, FaUser, FaLock, FaAddressBook } from "react-icons/fa";

function ClinicRegister({contract, account}) {
  const [name, setName] = useState(" ")
  const [address, setAddress] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showFailureAlert, setShowFailureAlert] = useState(false)
  const [location, setLocation] = useState(" ")

  const AddClinic = async (e) => {
    e.preventDefault();
    
    if( !name || !password ){
        alert("Clinic name or password cannot be empty!")
    } else {
        await contract.methods.addClinic(name.toUpperCase(), address, location.toUpperCase(), password).send({from: account})
        contract.events.ClinicAdded(function(error, event){ 
        
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
    <div className="registration-page gradient-background">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} lg={5} xl={4} className="registration-form">
            <div className="brand mt-5">
              <img src={qehr} alt="logo" />
            </div>
            <h4 className="mb-4">Sign Up to QEHRs</h4>
            <Form>

              <Form.Group controlId="formBasicName" className='mb-2'>
              <InputGroup>
                <InputGroup.Text className="inputgroup-text"><FaUser/></InputGroup.Text>
                <Form.Control type="text" placeholder="Name" className="form-control-lg" 
                              onChange={(e) => setName(e.target.value)}/>
              </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className='mb-2'>
              <InputGroup>
                <InputGroup.Text className="inputgroup-text"><FaEnvelope/></InputGroup.Text>
                <Form.Control type="text" placeholder="Metamask Address" className="form-control-lg"
                              onChange={(e) => setAddress(e.target.value)}/>
              </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicAddress" className='mb-2'>
              <InputGroup>
                <InputGroup.Text className="inputgroup-text"><FaAddressBook/></InputGroup.Text>
                <Form.Control type="text" placeholder="Location" className="form-control-lg"
                              onChange={(e) => setLocation(e.target.value)}/>
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
                      onClick={AddClinic}>
                Sign Up
              </Button>

              {showSuccessAlert && (
                <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                  Clinic Registration successful!
                </Alert>
              )}
              {showFailureAlert && (
                <Alert variant="danger" onClose={() => setShowFailureAlert(false)} dismissible>
                  Clinic Registration failed! Enter only the valid credentials and try again.
                </Alert>
              )}
            </Form>
            <p className="mt-3 mb-0 text-center">
                Already have an account? <a href="/clinic_login">Sign In</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ClinicRegister;