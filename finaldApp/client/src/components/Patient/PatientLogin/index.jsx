import React from 'react';
import Login from './Login';

export const PatientLogin = ({patientContract}) => {
  return (
    <div>
        <Login contract = {patientContract}/>
    </div>
  )
}

export default PatientLogin;
