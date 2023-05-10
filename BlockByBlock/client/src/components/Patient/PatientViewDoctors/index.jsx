import React from 'react';
import Doctors from './Doctors';

export const PatientViewDoctors = ({contract}) => {
  return (
    <div>
        <Doctors contract={contract}/>
    </div>
  )
}

export default PatientViewDoctors;
