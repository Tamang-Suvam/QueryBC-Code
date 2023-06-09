import React, { useState } from 'react';
import axios from "axios";

export const Doctors = ({contract}) => {
  const [doctorArray, setDoctorArray] = useState([])

//   const handleClick = event => {
//     event.preventDefault();
//     contract.methods.getRegisteredDoctors().call()
// 		.then( docArray => {
// 			if(docArray.length === 0) {
// 				alert("No Doctor has been registered yet!")
// 				return
// 			} else {
// 				setDoctorArray(docArray) 
// 			} 
// 		});
//   }

  const handleClick = e => {
	e.preventDefault();
	// set configurations for the API call here
    const configuration = {
      method: "get",
      url: "http://localhost:3001/retrieve-doctors",
    };

    // make the API call
    axios(configuration)
       .then(res =>{
		if(res.data.message.Users.length === 0) {
			alert("No Doctors have been Registered!")
		} else {
            setDoctorArray( res.data.message.Users );
		}
       })
      .catch((error) => {
		alert(error.response.data.message);
      });
  }

  return (
    <div>
        <p>&nbsp;</p>
        <h1 className='text-center fw-bolder'>View Registered Doctors</h1>
        <div className="d-grid gap-2">
            <p>&nbsp;</p>
            <button type="submit" className="btn btn-outline-success btn-lg btn-block fs-2"
                    onClick={handleClick}>Show Me Registred Doctors</button>
        </div>
				<p>&nbsp;</p>
				{ doctorArray.length === 0 ? "" :
					<table className="table table-hover">
						<thead className="table-dark">
							<tr>
							  <th scope="col" className='fs-2 text-center'>S.No.</th>
							  <th scope="col" className='fs-2 text-center'>DoctorEmail</th>
							  <th scope="col" className='fs-2 text-center'>DoctorName</th>
							  <th scope="col" className='fs-2 text-center'>Department</th>
							</tr>
						</thead>
						{doctorArray.map((val, index) => {
							return (
								<tbody>
								<tr key={index}>
								  <td className='fs-2 text-center'>{index + 1}</td>
								  <td className='fs-2 text-center'>{val.email}</td>
								  <td className='fs-2 text-center'>{val.name}</td>
								  <td className='fs-2 text-center'>{val.department}</td>
								</tr>
								</tbody>
							)
						})}
					</table>
				}
    </div>
  )
}

export default Doctors;