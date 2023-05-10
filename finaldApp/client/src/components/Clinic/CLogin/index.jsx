import React from 'react';
import ClinicLogin from './ClinicLogin';

export const CLogin = ({clinicContract}) => {
  return (
    <div>
        <ClinicLogin contract = {clinicContract}/>
    </div>
  )
}

export default CLogin;