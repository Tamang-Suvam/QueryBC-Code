import React from 'react'
import DocQuery from './DocQuery'

const DoctorQuery = ({patientContract}) => {
  return (
    <div>
      <DocQuery contract={patientContract}/>
    </div>
  )
}

export default DoctorQuery
