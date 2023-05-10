import React from 'react';
import Query from './Query';

const ClinicQuery = ({clinicContract, doctorContract, patientContract, account}) => {
  return (
    <div>
        <Query clinicContract = {clinicContract} doctorContract = {doctorContract} patientContract = {patientContract} account={account}/>
    </div>
  )
}

export default ClinicQuery
