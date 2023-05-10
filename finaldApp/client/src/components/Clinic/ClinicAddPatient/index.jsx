import React from 'react'
import AddPat from './AddPat'

const ClinicAddPatient = ({clinicContract, account}) => {
  return (
    <div>
      <AddPat contract={clinicContract} account={account}/>
    </div>
  )
}

export default ClinicAddPatient
