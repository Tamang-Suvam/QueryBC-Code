import React, { useState } from 'react';
import axios from "axios";

export const Patients = () => {
  const [patientArray, setPatientArray] = useState([])

  const handleClick = event => {
    event.preventDefault();
    // contract.methods.getRegisteredPatients().call()
	// 	.then( patArray => {
	// 		if(patArray.length === 0) {
	// 			alert("No Patient has been registered yet!")
	// 			return
	// 		} else {
	// 			setPatientArray(patArray) 
	// 		} 
	// 	});
		// set configurations for the API call here
		const configuration = {
			method: "get",
			url: "http://localhost:4001/retrieve-patients",
		  };
	  
		  // make the API call
		  axios(configuration)
			 .then(res =>{
			  if(res.data.message.Users.length === 0) {
				  alert("No Patients have been Registered!")
			  } else {
				  setPatientArray( res.data.message.Users );
			  }
			 })
			.catch((error) => {
			  alert(error.response.data.message);
			});
  }

  return (
    <div>
        <p>&nbsp;</p>
        <h1 className='text-center fw-bolder'>View Registered Patients</h1>
        <div className="d-grid gap-2">
            <p>&nbsp;</p>
            <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2"
                    onClick={handleClick}>Show Me Registred Patients</button>
        </div>
				<p>&nbsp;</p>
				{ patientArray.length === 0 ? "" :
					<table className="table table-hover">
						<thead className="table-dark">
							<tr>
							  <th scope="col" className='fs-2 text-center'>S.No.</th>
							  <th scope="col" className='fs-2 text-center'>Email</th>
							  <th scope="col" className='fs-2 text-center'>Name</th>
							</tr>
						</thead>
						{patientArray.map((val, index) => {
							return (
								<tbody>
								<tr key={index}>
								  <td className='fs-2 text-center'>{index + 1}</td>
								  <td className='fs-2 text-center'>{val.email}</td>
					              <td className='fs-2 text-center'>{val.name}</td>
								</tr>
								</tbody>
							)
						})}
					</table>
				}
    </div>
  )
}

export default Patients;