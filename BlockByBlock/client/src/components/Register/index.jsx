import React from 'react'
import RegisterFun from './RegisterFun'

export const Register = ({contract, account}) => {
  return (
    <div>
        <RegisterFun contract={contract} account = {account}/>
    </div>
  )
}

export default Register