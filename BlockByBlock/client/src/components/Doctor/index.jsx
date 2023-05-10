import React from 'react';
import DocFunctions from './DocFunctions';
import NavbarDoctor from './NavbarDoctor';

export const Doctor = ({contract, account}) => {
  return (
    <div>
        <NavbarDoctor />
        <DocFunctions contract={contract} account={account} />
    </div>
  )
}

export default Doctor;