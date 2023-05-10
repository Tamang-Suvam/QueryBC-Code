import React from 'react'
import DocFun from './DocFun'

export const DocFunctions = ({contract, account}) => {
  return (
    <> 
        <DocFun contract={contract} account={account}/>
    </>
  )
}

export default DocFunctions;
