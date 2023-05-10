import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, InputGroup, Alert} from 'react-bootstrap';
import './docLogin.css'; 
import qehr from '../../../assets/QEHRs.png'
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export const Login = ({contract}) => {
  const [doctorName, setDoctorName] = useState('')
  const [address, setDoctorAddress] = useState('')
  const [password, setPassword] = useState('')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showFailureAlert, setShowFailureAlert] = useState(false)
  const navigate = useNavigate();
  
  const DoctorLogin = (e) =>{
    e.preventDefault()
    if( !address || !password ){
      alert("Address or Password cannot be left empty!")
    } else {
      contract.methods.checkDoctor(address, password).call().then( x => {
      if(x){
        setShowSuccessAlert(true);
        setShowFailureAlert(false);

        setTimeout(() => {
          navigate("/doctor_page", { state: { docName: doctorName, metamaskAddress: address } })
        }, 2000);
      } else{
        setShowSuccessAlert(false);
        setShowFailureAlert(true);
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
              <Form.Group controlId="formBasicName" className='mb-2'>
                <InputGroup>
                <InputGroup.Text className="inputgroup-text"><FaUser/></InputGroup.Text>
                <Form.Control type="text" placeholder="Doctor Name" className="form-control-lg" 
                                onChange={(e) => setDoctorName(e.target.value)}/>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className='mb-2'>
                <InputGroup>
                  <InputGroup.Text className="inputgroup-text"><FaEnvelope/></InputGroup.Text>
                  <Form.Control type="text" placeholder="Metamask Address" className="form-control-lg" 
                                onChange={(e) => setDoctorAddress(e.target.value)}/>
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
                      onClick={DoctorLogin}>
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
                Forgot <a href="/#">password?</a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login;