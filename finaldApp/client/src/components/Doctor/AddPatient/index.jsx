import React from 'react'
import AddPat from './AddPat'

const AddPatient = ({doctorContract, account}) => {
  return (
    <div>
      <AddPat contract={doctorContract} account={account}/>
    </div>
  )
}

export default AddPatient
