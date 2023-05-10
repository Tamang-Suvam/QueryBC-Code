import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import clinicImg from '../../assets/hospital.jpeg'
import doctorImg from '../../assets/doctor.jpeg'
import patientImg from '../../assets/patient.jpeg'
import './Start.css'

const Start= () => {
  const navigate = useNavigate()

  const handleClinicClick = e => {
    e.preventDefault()
    navigate('/clinic_desc')
  }

  const handleDoctorClick = e => {
    e.preventDefault()
    navigate('/doctor_login')
  }

  const handlePatientClick = e => {
    e.preventDefault()
    navigate('/patient_login')
  }

  return (
    <div className='hero-image1'>
        <div className="container text-primary fs-1">
          <div className="row">
            <div className="col-md-4 mb-3">
              <Card className="card1" style={{ backgroundColor: 'transparent' }}>
              <Card.Img className='img' variant="top" src={clinicImg} style={{ backgroundBlendMode: 'overlay' }}/>
                <Card.Body>
                  <Card.Title style = {{fontWeight: 'bold'}}>Clinic</Card.Title>
                  <Card.Text className='text-white'>
                    Clinic Page
                  </Card.Text>
                  <Button variant="outline-dark" onClick={handleClinicClick}>Go</Button>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4 mb-3">
              <Card className="card1" style={{ backgroundColor: 'transparent' }}>
                <Card.Img className='img' variant="top" src={patientImg} style={{ backgroundBlendMode: 'overlay' }}/>
                <Card.Body>
                  <Card.Title  style = {{fontWeight: 'bold'}}>Patient</Card.Title>
                  <Card.Text className='text-white'>
                    Patient Page
                  </Card.Text>
                  <Button variant="outline-dark" onClick={handlePatientClick}>Go</Button>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4 mb-3">
              <Card className='card1' style={{ backgroundColor: 'transparent' }}>
                <Card.Img className='img' variant="top" src={doctorImg} />
                <Card.Body>
                  <Card.Title  style = {{fontWeight: 'bold'}}>Doctor</Card.Title>
                  <Card.Text className='text-white'>
                    Doctor Page
                  </Card.Text>
                  <Button variant="outline-dark" onClick={handleDoctorClick}>Go</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Start