import React from 'react'
import { useState } from 'react';

export const QueryFun = ({contract}) => {
  const [patientId, setpatientId] = useState(null)
  const [result, setResult] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    contract.methods.getRecords(patientId).call().then( x => {
      setResult(x);
    });
  }

  return (
    <div>
        <h1 className='text-center'>Query Patient Details</h1>
        <form className="form-group form-control-lg" onSubmit={handleSubmit}>
            <label htmlFor="formGroupExampleInput fs-2">Enter PatientId</label>
            <input type="text" className="form-control fs-2" id="formGroupExampleInput" placeholder="PatientId" 
             onChange={event => setpatientId(event.target.value)} />
            <div className="d-grid gap-2">
                  <p>&nbsp;</p>
                  <button type="submit" className="btn btn-success btn-lg btn-block fs-2">Enter</button>
            </div>
      </form>
          <p>&nbsp;</p>
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col" className='fs-2 text-center'>S.No.</th>
                <th scope="col" className='fs-2 text-center'>PatientID</th>
                <th scope="col" className='fs-2 text-center'>DoctorID</th>
                <th scope="col" className='fs-2 text-center'>Symptoms</th>
                <th scope="col" className='fs-2 text-center'>Prescriptions</th>
              </tr>
            </thead>
            {result.map((val, index) => {
              return (
                <tbody>
                <tr key={index}>
                  <td className='fs-2 text-center'>{index + 1}</td>
                  <td className='fs-2 text-center'>{val.patientId}</td>
                  <td className='fs-2 text-center'>{val.doctorId}</td>
                  <td className='fs-2 text-center'>{val.symptoms}</td>
                  <td className='fs-2 text-center'>{val.diagnostic}</td>
                </tr>
                </tbody>
              )
            })}
          </table>
    </div>
  )
}

export default QueryFun;
