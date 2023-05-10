// // import React, { useState } from 'react';
// // import {  useNavigate } from 'react-router-dom';

// // export const ClinicLogin = ({contract}) => {
// //     // const [address, setClinicAddress] = useState('')
// //     const [password, setPassword] = useState('')
// //     const [login, setLogin] = useState(false);
// //     const navigate = useNavigate();

// //     const onSubmit = (e) =>{
// //       e.preventDefault()
// //       if( !password ){
// //         alert("Clinic ID or Password cannot be left empty!")
// //       } else {
// //         // contract.methods.checkClinic(address, password).call().then( x => {
// //           contract.methods.checkClinic(password).call().then( x => {
// //           if(x){
// //             setLogin(true)
// //             navigate("/clinic_page")
// //           } else{
// //             alert("Failed to log in!!")
// //           }
// //         });
// //       }
// //     }
  
// //     return (
// //       <div>
// //         <p>&nbsp;</p>
// //         <h1 className='text-center fs-2'>Clinic ClinicLogin Page</h1>
// //         <p>&nbsp;</p>
// //         <form className="form-control form-control-lg" onSubmit={onSubmit}>
// //           {/* <div className="mb-3">
// //               <label className="form-label fs-2">Enter your address</label>
// //               <input type="address" className="form-control fs-2" value={address} 
// //                   onChange={event => setClinicAddress(event.target.value)} required/>
// //           </div> */}
// //           <div className="form-group">
// //             <label className='fs-2'>Password</label>
// //             <input type="password" className="form-control fs-2" value={password} 
// //                    onChange={event => setPassword(event.target.value)} required/>
// //           </div>
// //           <div className="d-grid gap-2">
// //             <p>&nbsp;</p>
// //             <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Log In</button>
// //           </div>
// //         </form>
// //         {login ? (
// //             <p className="text-success text-center fs-3">Logged in Successfully</p>
// //           ) : (
// //             <p className="text-danger text-center fs-3">Log in Failed</p>
// //           )}
// //       </div>
// //     )
// // }

// // export default ClinicLogin;

// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import image from '../../../assets/loginPic.webp'
// import '../../../App.css'
// import { Form, Button, Container, Row, Col } from 'react-bootstrap'

// export default function ClinicLogin({contract}) {

//   const [address, setAddress] = useState('')
//   const [password, setPassword] = useState('')
//   const [login, setLogin] = useState(false);
//   const navigate = useNavigate();

//   const myStyle={
//     backgroundImage: `url(${image})`,
//     position: 'fixed',
//     top: '0',
//     left: '0',
//     width: '100vw',
//     height: '100vh',
//     backgroundSize: 'cover',
//   }

//   const handleClick = e  => {
//     e.preventDefault()
//     navigate("/clinic_registration")
//   }

//   const ClinicLogin = (e) =>{
//     e.preventDefault()

//     if( !password ){
//       alert("Clinic ID or Password cannot be left empty!")
//     } else {
//         // contract.methods.checkClinic(address, password).call().then( x => {
//         contract.methods.checkClinic(address, password).call().then( x => {
//         if(x){
//           setLogin(true)
//           navigate("/clinic_page")
//         } else{
//           alert("Failed to log in!!")
//         }
//       });
//     }
//   }

//   return (

//     <>
//     <div style={myStyle}>
//     <div className="Auth-form-container container">
//       <form className="Auth-form">
//         <div className="Auth-form-content">
//           <h3 className="Auth-form-title fs-2">Sign In</h3>
//           <div className="text-center fs-2">
//             Not registered yet?{" "}
//             <span className="link-primary" onClick={handleClick}>
//               Sign Up
//             </span>
//           </div>
//           <div className="form-group mt-3 fs-2">
//             <label>Clinic address</label>
//             <input
//               type="address"
//               className="form-control mt-1 fs-2"
//               placeholder="Enter address"
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//           <div className="form-group mt-3 fs-2">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control mt-1 fs-2"
//               placeholder="Enter password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="d-grid gap-2 mt-3">
//             <button type="submit" className="btn btn-outline-primary fs-2"
//                     onClick={ClinicLogin}>
//               Submit
//             </button>
//           </div>
//           <p className="forgot-password text-right mt-2 fs-2">
//             Forgot <a href="#">password?</a>
//           </p>
//         </div>
//       </form>
//     </div>
//    </div> 
//   </> 
// //   <div className="bg-image">
// //   <Container className="h-100">
// //     <Row className="justify-content-center align-items-center h-100">
// //       <Col md={6} lg={4}>
// //         <div className="login-form">
// //           <h3 className="text-center mb-4">ClinicLogin</h3>
// //           <Form>
// //             <Form.Group controlId="formBasicEmail">
// //               <Form.Label>Email address</Form.Label>
// //               <Form.Control type="email" placeholder="Enter email" />
// //             </Form.Group>

// //             <Form.Group controlId="formBasicPassword">
// //               <Form.Label>Password</Form.Label>
// //               <Form.Control type="password" placeholder="Password" />
// //             </Form.Group>

// //             <Button variant="primary" type="submit" className="w-100 mt-3">
// //               Submit
// //             </Button>
// //           </Form>
// //         </div>
// //       </Col>
// //     </Row>
// //   </Container>
// // </div>
//   )
// }

// import React from 'react';
// import { Container, Form, Button } from 'react-bootstrap';
// import './login.css';

// const SignUp = () => {
//   return (
//     <div className="signup">
//       <Container>
//         <div className="signup-form">
//           <h2 className="text-center">Sign Up</h2>
//           <Form>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" />
//             </Form.Group>

//             <Form.Group controlId="formBasicCheckbox">
//               <Form.Check type="checkbox" label="Check me out" />
//             </Form.Group>

//             <Button variant="primary" type="submit" block>
//               Sign Up
//             </Button>
//           </Form>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, InputGroup, Alert} from 'react-bootstrap';
import './login.css'; 
import qehr from '../../../assets/QEHRs.png'
import { FaEnvelope, FaLock } from "react-icons/fa";

function ClinicLogin({ contract }) {

  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showFailureAlert, setShowFailureAlert] = useState(false)
  const navigate = useNavigate();

  const ClinicLogin = (e) =>{
    e.preventDefault()

    if( !address || !password ){
      alert("Clinic Address or Password cannot be left empty!")
    } else {
        contract.methods.checkClinic(address, password).call().then( x => {
        if(x){
          setShowSuccessAlert(true);
          setShowFailureAlert(false);

          setTimeout(() => {
            navigate("/clinic_page")
          }, 2000);

        } else{
          setShowSuccessAlert(false);
          setShowFailureAlert(true);
          // alert("Failed to log in!!")
        }
      });
    }
  }

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} lg={5} xl={4} className="login-form">
            <div className="brand">
              <img src={qehr} alt="logo" />
            </div>
            <h4 className="mb-4">Sign In to Your Account</h4>
            <Form>
              <Form.Group controlId="formBasicEmail" className='mb-2'>
              <InputGroup>
                <InputGroup.Text className="inputgroup-text"><FaEnvelope/></InputGroup.Text>
                <Form.Control type="text" placeholder="Address" className="form-control-lg" 
                              onChange={(e) => setAddress(e.target.value)}/>
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
                      onClick={ClinicLogin}>
                Sign In
              </Button>

              {showSuccessAlert && (
                <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                  Login successful!
                </Alert>
              )}

              {showFailureAlert && (
                <Alert variant="danger" onClose={() => setShowFailureAlert(false)} dismissible>
                  Login failed! Please check your username and password and try again.
                </Alert>
              )}
              <p className="forgot-password text-right mt-2">
                Forgot <a href="/clinic_registration">password?</a>
              </p>
            </Form>
            <p className="text-muted mt-3">Don't have an account? <a href="/clinic_registration">Sign Up</a></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ClinicLogin;
