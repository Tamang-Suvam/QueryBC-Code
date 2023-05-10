import React from 'react'
import RegisterFun from './RegisterFun'

export const DoctorRegister = ({clinicContract, account}) => {
  return (
    <div>
        <RegisterFun contract = {clinicContract} account = {account}/>
    </div>
  )
}

export default DoctorRegister;