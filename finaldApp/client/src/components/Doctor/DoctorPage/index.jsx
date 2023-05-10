import React from 'react'
import DocPage from './DocPage'

const DoctorPage = ({doctorContract, patientContract}) => {
  return (
    <div>
      <DocPage doctorContract={doctorContract} patientContract={patientContract}/>
    </div>
  )
}

export default DoctorPage
