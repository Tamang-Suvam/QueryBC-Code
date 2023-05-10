import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, InputGroup, Alert} from 'react-bootstrap'
import './addPat.css'
import qehr from '../../../assets/QEHRs.png'
import { FaEnvelope, FaUser, FaLock, FaAddressBook } from "react-icons/fa"

const AddPat = ({contract, account}) => {
    const [address, setAddress] = useState("")
    const [clinicAddress, setClinicAddress] = useState("")
    const [name, setName] = useState("")
    const [department, setDepartment] = useState("")
    const [password, setPassword] = useState("")
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showFailureAlert, setShowFailureAlert] = useState(false)

    const AddPatient = async event => {
        event.preventDefault();
        if( !address || !name || !password ){
            alert("Address or Name or Password cannot be left empty!")
        } 
        else {
            console.log(account)
            await contract.methods.clinicAddPatient(address, name, clinicAddress, department.toUpperCase(), password).send({from: account})
            contract.events.PatientAdded(function(error, event){ 
            if(event){
                setShowSuccessAlert(true);
                setShowFailureAlert(false);
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
                <div className="brand mt-2">
                    <img src={qehr} alt="logo" />
                </div>
                <h4 className="mb-4">Sign Up Patient to QEHRs</h4>
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

                    <Form.Group controlId="formBasicEmail" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaEnvelope/></InputGroup.Text>
                    <Form.Control type="text" placeholder="Clinic Metamask Address" className="form-control-lg"
                                    onChange={(e) => setClinicAddress(e.target.value)}/>
                    </InputGroup>
                    </Form.Group>
    
                    <Form.Group controlId="formBasicAddress" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaAddressBook/></InputGroup.Text>
                    <Form.Control type="text" placeholder="Department" className="form-control-lg"
                                    onChange={(e) => setDepartment(e.target.value)}/>
                    </InputGroup>
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword" className='mb-2'>
                    <InputGroup>
                        <InputGroup.Text className="inputgroup-text"><FaLock/></InputGroup.Text>
                    <Form.Control type="password" placeholder="Password" className="form-control-lg"
                                    onChange={(e) => setPassword(e.target.value)}/>
                    </InputGroup>
                    </Form.Group>
    
                    <Button variant="primary" type="submit" block className="btn-lg mb-3"
                            onClick={AddPatient}>
                    Add Patient
                    </Button>
    
                    {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Patient Registration successfull!
                    </Alert>
                    )}
                    {showFailureAlert && (
                    <Alert variant="danger" onClose={() => setShowFailureAlert(false)} dismissible>
                        Patient Registration failed! Enter only the valid credentials and try again.
                    </Alert>
                    )}
                </Form>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default AddPat
