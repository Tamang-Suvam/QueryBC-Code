// import React from 'react'
// import { useState } from 'react';
// import axios from 'axios';
// import { ValidateQuery } from '../../../ValidateQuery';

// export const QueryFun = ({contract}) => {
//   // let startTime1, startTime2, endTime1, endTime2, seconds1, seconds2
//   const [file, setFile] = useState(null)
//   const [patresult, setPatResult] = useState([])
//   const [docresult, setDocResult] = useState([])
//   // let time = 0
//   const [resTime, setresTime] = useState(0)

//   const captureFile = (event) => {
//     event.preventDefault()
//     const _file = event.target.files[0]
//     setFile(_file)
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     let time = 0
//     // const [time, setTime] = useState(0)
//     let startTime1 = 0, startTime2 = 0, endTime1 = 0, endTime2 = 0, seconds1 = 0, seconds2 = 0
//     // let time = 0
//     const reader = new FileReader()
//     reader.onload = async (e) => { 
//       const text = (e.target.result)
//         var queries = text.split(/\r\n|\n/);
//         console.log(queries.length-1)
//         for(let query = 0; query < queries.length-1; query++){
//           let selectParameter = ''
//           let fromParameter = ''
//           let whereParam1 = ''
//           let whereParam2 = ''
//           let whereParam3 = ''
//           let myArray = queries[query].split(" ")
//           for(let i=0; i<myArray.length; i++) {
//             if(myArray[i] === 'select') {
//               selectParameter = myArray[++i]
//             } else if(myArray[i] === 'from') {
//               fromParameter = myArray[++i]
//             } else if(myArray[i] === 'where') {
//               whereParam1 = myArray[++i]
//               whereParam2 = myArray[++i]
//               whereParam3 = myArray[++i]
//             }
//           }
//           if( fromParameter === 'Patient' ) {
//             // Now measuring the latency it takes to fetch data from the blockchain
//             startTime1 = Date.now();
//             // axios.get(`http://localhost:5000/records/${whereParam3}`)
//             // .then(function (response) {
//             //   // console.log(response.data);
//             // });
//             let response = await axios.get(`http://localhost:5000/records/${whereParam3}`);
//             // console.log(typeof response)
//             endTime1 = Date.now();
//             seconds1 = (endTime1 - startTime1) // / 1000
//             // console.log("Seconds1" + seconds1)
//             // setTime(time + seconds1)
//             time += seconds1
//             // response = []
//           } else if( fromParameter === 'Doctor') {
//             startTime2 = performance.now();
//             contract.methods.getRegisteredDoctors().call()
//             .then( x => {
//               if(x.length === 0) {
//                 alert("No Record Found!")
//                 return
//               } else {
//                 setDocResult(x) 
//               }
//             })
//             endTime2 = performance.now();
//             seconds2 = (endTime2 - startTime2) / 1000
//             // console.log("Seconds2" + seconds2)
//             time += seconds2
//             // setTime(time + seconds2)
//           } 
//         }
//         // console.log("Total Time(Database): " + time)
//         setresTime(time)
//     };
//     reader.readAsText(file)
//   }

//   return (
//       <div className="form-group fs-2">
//        <form className='form-control'>
//           <input type="file" className='form-control fs-2' onChange={captureFile} />
//           <div className="d-grid gap-2">
//             <p>&nbsp;</p>
//             <button type="submit" className="btn btn-outquery-primary btn-lg btn-block fs-2" 
//                     onClick={(e) => handleSubmit(e)}>Submit</button>
//           </div>
//        </form>
//        <h1>Executing your query!</h1>
//        <p>Database Time : {resTime}</p>
//       </div>
//   )
// }

// export default QueryFun;

import React, { useState  } from "react";
import { ValidateQuery } from "../../../ValidateQuery";
import axios from "axios";

export default function QueryFun() {
  const [query, setQuery] = useState([])
  const [patientArray, setPatientArray] = useState([])
  const [file, setFile] = useState(null)
  const [resTime, setresTime] = useState(0)

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const [select, from, where_1, where_2 ] = ValidateQuery(query)
  //   console.log(select + ", " + from + ", " + where_1 + ", " + where_2)
  //   if(from === 'PATIENTS') {
  //     if(select === '*') {
  //       if(where_1 === 'DEPARTMENT') {
  //         // let patients = await contract.methods.getRegisteredPatientsByDept(where_2).call()
  //         // setPatientArray(patients)
  //         alert("You don't have permission to fire this query!")
  //       } else if(where_1 === 'PATIENT-ID') {
  //         let patients = await axios.get(`http://localhost:5000/records/${where_2}`);
  //         if(patients.length === 0) {
  //           alert("No patients to display!")
  //         } else {
  //           console.log(patients.data)
  //           console.log(typeof patients.data)
  //           setPatientArray(patients.data)
  //         }
  //       } else {
  //         // let patients = await contract.methods.getRegisteredPatients().call()
  //         // console.log(patients)
  //         // setPatientArray(patients)
  //         alert("You don't have permission to fire this query!")
  //       }
  //     }
  //   } else {
  //     alert("Invalid SQL Query!")
  //   }
  // }
  // return (
  //   <div>
  //       <p>&nbsp;</p>
  //         <form className="form-group form-control-lg" onSubmit={handleSubmit}>
              
  //             <h1 className='text-center fw-bolder'>View Registered QueryFun</h1>
  //             <label className="fs-2 form-control-lg" htmlFor="exampleFormControlTextarea1">Enter the SQL query</label>
  //             <textarea className="form-control form-control-lg fs-2" id="FormControlTextarea1" rows="1"
  //                       value={query} onChange={event => {setQuery(event.target.value)}} required></textarea>

  //             <div className="d-grid gap-2">
  //                   <p>&nbsp;</p>
  //                   <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2">Enter</button>
  //             </div>

  //         </form>
  //       <p>&nbsp;</p>
  //       { patientArray.length === 0 ? <h5 className='text-center text-danger'>No Patient Record Found!</h5> :
  //           <table className="table table-hover">
  //             <thead className="table-dark">
  //               <tr>
  //                 <th scope="col" className='fs-2 text-center'>S.No.</th>
  //                 <th scope="col" className='fs-2 text-center'>DoctorID</th>
	// 			          <th scope="col" className='fs-2 text-center'>Name</th>
  //                 <th scope="col" className='fs-2 text-center'>Department</th>
  //                 <th scope="col" className='fs-2 text-center'>Symptoms</th>
  //                 <th scope="col" className='fs-2 text-center'>Diagnostic</th>
  //                 <th scope="col" className='fs-2 text-center'>IPFS CID</th>
  //                 <th scope="col" className='fs-2 text-center'>Time</th>
  //               </tr>
  //             </thead>
  //             {patientArray.map((val, index) => {
  //               return (
  //                 <tbody>
  //                 <tr key={index}>
  //                   <td className='fs-2 text-center'>{index + 1}</td>
  //                   <td className='fs-2 text-center'>{val.doctorID}</td>
	// 				          <td className='fs-2 text-center'>{val.doctorName}</td>
  //                   <td className='fs-2 text-center'>{val.department}</td>
  //                   <td className='fs-2 text-center'>{val.symptoms}</td>
  //                   <td className='fs-2 text-center'>{val.diagnostic}</td>
  //                   <td className='fs-2 text-center'>{val.cid}</td>
  //                   <td className='fs-2 text-center'>{Date(val.timeAdded * 1000)}</td>
  //                 </tr>
  //                 </tbody>
  //               )
  //             })}
  //           </table>
  //         }
  //   </div>
  // );

  ////////////////////////////////////////////////////-Reding from a txt file////////////////////////////////////////////////

  const captureFile = (event) => {
    event.preventDefault()
    const _file = event.target.files[0]
    setFile(_file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let startTime = 0, endTime = 0, seconds = 0
    let time = 0
  
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
        var queries = text.split(/\r\n|\n/);
        for(let query = 0; query < queries.length - 1; query++){
          const [select, from, where_1, where_2 ] = ValidateQuery(queries[query])
          if(from === 'PATIENTS') {
            if(select === '*') {
              if(where_1 === 'DEPARTMENT') {
                alert("You don't have permission to fire this query!")
              } else if(where_1 === 'PATIENT-ID') {
                // console.log(where_2)
                startTime = performance.now()
                let patients = await axios.get(`http://localhost:5000/medicalrecords/${where_2}`);
                console.log(patients)
                endTime = performance.now()
                
                seconds = (endTime - startTime)
                time += seconds
  
                  if(patients.length === 0) {
                    alert("No patients to display!")
                  } else {
                    setPatientArray(patients.data)
                  }
              } else {
                alert("You don't have permission to fire this query!")
              }
            }
          } else {
            alert("Invalid SQL Query!")
          }
        }
        setresTime(time)
    };
    reader.readAsText(file)
  }

  return (
    <div className="form-group fs-2">
      <form className='form-control'>
        <input type="file" className='form-control fs-2' onChange={captureFile} />
        <div className="d-grid gap-2">
          <p>&nbsp;</p>
          <button type="submit" className="btn btn-outquery-primary btn-lg btn-block fs-2" 
                  onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
      </form>
      <h1>Executing your query!</h1>
      <p>Database Time : {resTime}</p>

            {/* <p>&nbsp;</p>
         { patientArray.length === 0 ? <h5 className='text-center text-danger'>No Patient Record Found!</h5> :
             <table className="table table-hover">
               <thead className="table-dark">
                 <tr>
                   <th scope="col" className='fs-2 text-center'>S.No.</th>
                   <th scope="col" className='fs-2 text-center'>DoctorID</th>
	 			           <th scope="col" className='fs-2 text-center'>Name</th>
                   <th scope="col" className='fs-2 text-center'>Department</th>
                   <th scope="col" className='fs-2 text-center'>Symptoms</th>
                   <th scope="col" className='fs-2 text-center'>Diagnostic</th>
                   <th scope="col" className='fs-2 text-center'>IPFS CID</th>
                   <th scope="col" className='fs-2 text-center'>Time</th>
                 </tr>
               </thead>
               {patientArray.map((val, index) => {
                 return (
                   <tbody>
                   <tr key={index}>
                     <td className='fs-2 text-center'>{index + 1}</td>
                     <td className='fs-2 text-center'>{val.doctorID}</td>
	 				           <td className='fs-2 text-center'>{val.doctorName}</td>
                     <td className='fs-2 text-center'>{val.department}</td>
                     <td className='fs-2 text-center'>{val.symptoms}</td>
                     <td className='fs-2 text-center'>{val.diagnostic}</td>
                     <td className='fs-2 text-center'>{val.cid}</td>
                     <td className='fs-2 text-center'>{Date(val.timeAdded * 1000)}</td>
                   </tr>
                   </tbody>
                 )
               })}
             </table>
           } */}
    </div>
  )
}