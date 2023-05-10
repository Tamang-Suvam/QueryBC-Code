import React from 'react';
import DoctorRegister from './DoctorRegister';
import NavbarClinic from './NavbarClinic';
import ViewDoctors from './ViewDoctors';
import ViewPatients from './ViewPatients';

export const Clinic = ({contract, account}) => {
  return (
    <div>
        <NavbarClinic account = {account}/>
        <DoctorRegister />
        <ViewDoctors />
        <ViewPatients />
    </div>
  )
}

export default Clinic;