import React from 'react';
import ClinicRegister from './ClinicRegister';

export const CRegister = ({clinicContract, account}) => {
  return (
    <div>
        <ClinicRegister contract = {clinicContract} account = {account}/>
    </div>
  )
}

export default CRegister;
