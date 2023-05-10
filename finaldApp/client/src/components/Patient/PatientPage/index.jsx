import React from 'react'
import PatFunc from './PatFunc'

const PatientFunctions = ({clinicContract, doctorContract, patientContract}) => {
  return (
    <div>
      <PatFunc clinicContract={clinicContract} doctorContract={doctorContract} patientContract={patientContract}/>
    </div>
  )
}

export default PatientFunctions
