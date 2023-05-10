import React from 'react';
import '../../App.css';
import hospitalImage from "../../assets/hospital.jpeg";
import doctorImage from "../../assets/doctor.jpeg";
import patientImage from "../../assets/patient.jpeg";
import { useNavigate } from 'react-router-dom';
import myImage from '../../assets/EHR.jpg';

const StartUsing = () => {
  const navigate = useNavigate();

  const handleClinicClick = event => {
      event.preventDefault();
      navigate("/clinic_registration")
  }

  const handleDoctorClick = event => {
    event.preventDefault();
    navigate("/doctor_login")
  }

  const handlePatientClick = event => {
    event.preventDefault();
    navigate("/patient_login")
  }

  const myStyle={
    backgroundImage: `url(${myImage})`,
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
  }

  return (
      <div style={myStyle}>
        <br />
        <br />
        <br />
        <h1 className='text-center display-1 text-success fw-bold'> Choose Your Role </h1>
        <br /><br />
        <div className='rowC'>
          <div className='colC'>
            <img className='image' style = {{borderRadius: '50%'}} src={hospitalImage} alt="img not found"/>
            <button className='imageCaption myOwn' onClick={handleClinicClick}>Clinic</button>
          </div>
          <div className='colC'>
            <img className='image' style = {{borderRadius: '50%'}} src={doctorImage} alt="img not found"/>
            <button className='imageCaption myOwn' onClick={handleDoctorClick}>Doctor</button>
          </div>
          <div className='colC'>
            <img className='image' style = {{borderRadius: '50%'}} src={patientImage} alt="img not found"/>
            <button className='imageCaption myOwn' onClick={handlePatientClick}>Patient</button>
          </div>
          </div>
      </div>
  )
}

export default StartUsing;
