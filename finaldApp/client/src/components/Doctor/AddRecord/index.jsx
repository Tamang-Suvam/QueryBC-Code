import React from 'react'
import AddPatRecord from './AddPatRecord'

const AddRecord = ({doctorContract, account}) => {
  return (
    <div>
      <AddPatRecord contract={doctorContract} account={account} />
    </div>
  )
}

export default AddRecord
