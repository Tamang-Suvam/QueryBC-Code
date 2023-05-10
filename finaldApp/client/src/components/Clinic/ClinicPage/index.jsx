import React from 'react'
import Page from './Page'

const ClinicPage = ({doctorContract, patientContract}) => {
  return (
    <div>
      <Page doctorContract={doctorContract} patientContract={patientContract}/>
    </div>
  )
}

export default ClinicPage
