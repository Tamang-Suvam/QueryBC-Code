import React from 'react'
import { useState } from 'react';
import { findMePatientRecord, findMePatientRecordWithDB, findMePatientRecordFromSpecificDate } from '../../../queryBC'
import {ValidateQuery} from '../../../ValidateQuery'

export const QueryFun = ({contract}) => {
  const [date, setDate] = useState('')

  const [query, setQuery] = useState(' ')
  const [patientArray, setPatientArray] = useState([])
  const [groupByArray, setGroupByArray] = useState([])
  const [groupBy, setGroupBy] = useState([])

  const [patientId, setpatientId] = useState("")
  const [result, setResult] = useState([])

  const [resTime, setresTime] = useState(0)
  const [file, setFile] = useState(null)
  const [privateKey, setPrivateKey] = useState(" ")
  
  /////////////////////////////// Reading from a file of queries//////////////////////////////////////////////////////////
  const captureFile = (event) => {
    event.preventDefault()
    const _file = event.target.files[0]
    setFile(_file)
  }
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   findMePatientRecord(patientId)
  //   .then(result => {
  //     if(result.length === 0) {
  //       alert("No Record Found!")
  //       return
  //     } else {
  //       setResult(result) 
  //     } 
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // }

  // // Handling writing to BC using database as an index
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const [select, from, where_1, where_2, and_1, and_2, groupBy] = ValidateQuery(query)
  //   setGroupBy(groupBy)
  //   console.log("select" + select + ',' + "from" + from + ',' + "where_1" + where_1 + ',' + "where_2" + where_2 + ',' + "and_1" + and_1 + "and_2" + and_2 + " "+ "groupBy" + groupBy)
  //   // if(groupBy === ' ') {
  //     if(from[0] === 'PATIENTS') {
  //       if(select[0] === '*') {
  //         if(where_1 === 'DEPARTMENT') {
  //           alert("You don't have permission to fire this query!")
  //         } else if(where_1 === 'PATIENT-ID') {
  //             // let patients = await findMePatientRecord('0x2A37F790670FE66eD34BA569839edF5Ecc227826')
  //             let start = performance.now()
  //             let patients = await findMePatientRecordWithDB(where_2)
  //             // await findMePatientRecordFromSpecificDate(date, where_2)

  //             // let patients = await findMePatientRecordFromSpecificDate(date, where_2)
              
  //             // console.log(patients)
  //             // let patients = await findMePatientRecordOnlyFromSpecificYear(where_2, year)

  //             let end = performance.now()
  //             console.log(end - start + " seconds")
  //             // if(patients.length === 0) {
  //             //   alert("No patients to display!")
  //             // } else {                
  //             //   setPatientArray(patients)
  //             // }
  //         } else {
  //           alert("You don't have permission to fire this query!")
  //         }
  //       }
  //     } else {
  //       alert("Invalid SQL Query!")
  //     } 
  //   // } else {  // Here handling the groupBy clause
  //   //   let result = await contract.methods.groupByClause(where_2).call()
  //   //   setGroupByArray(result)
  //   // }


  // //   // let result = await findInDB(patientId)
  // //   // if(result.length === 0) alert("No record found for the user entered in the database!")
  // //   // else {
  // //   //   let patientDetails = await findMePatientRecordWithDB(result)
  // //   //   setResult(patientDetails)
  // //   // }
  // }

const handleSubmit = async (event) => {
  event.preventDefault();
  let time = 0

  const reader = new FileReader()
  reader.onload = async (e) => { 
    const text = (e.target.result)
      var queries = text.split(/\r\n|\n/);

      for(let query = 0; query < queries.length - 1; query++){
        const [select, from, where_1, where_2, and_1, and_2, groupBy] = ValidateQuery(queries[query])
        if(from[0] === 'PATIENTS') {
          if(select[0] === '*') {
            if(where_1 === 'DEPARTMENT') {
              alert("You don't have permission to fire this query!")
            } 
            // else if(where_1 === 'PATIENT-ID') {

            //   // Injecting the code for the cache layer here
            //   let data = getItemFromCache(query)
            //   startTime = performance.now()
            //   if(data === null) {
            //     let patients = await contract.methods.getRegisteredPatientsByID(where_2).call()
            //     if(patients.length === 0) {
            //       alert("No patients to display!")
            //     } else {                
            //       setPatientArray(patients)
            //       const expirationDate = new Date().getTime() + 300000; // setting an expiration time of 5 minutes for every item in the cache
            //       localStorage.setItem(query, JSON.stringify({ data: patients, expires: expirationDate }));
            //       cache.put(query, patients);
            //     }
            //   } else {
            //     setPatientArray(data)
            //   }
            //   endTime = performance.now()
              
            //   seconds = (endTime - startTime)
            //   time += seconds
            // } else {
            //   alert("You don't have permission to fire this query!")
            // }
              else if(where_1 === 'PATIENT-ID') {
                let start = performance.now()
                // let patients = await findMePatientRecord('0x2A37F790670FE66eD34BA569839edF5Ecc227826')
                let patients = await findMePatientRecordWithDB(where_2)
                let end = performance.now()
                // console.log(end - start + " ms")
                time += (end - start)
                if(patients.length === 0) {
                  alert("No patients to display!")
                } else {                
                  setPatientArray(patients)
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

  // const handleSubmit2 = async (event) => {
  //   event.preventDefault()
  //   const year = new Date('2023-01-01')
  //   let patients = await findMePatientRecordOnlyFromSpecificYear('0xD42D954A5aC1fa52706d26Cc26FaDBA5cfC8f773', year.getTime())
  //   console.log(patients)
  // } 

  return (
    <div>
      {/* <button onClick={handleSubmit2}>Click Me</button> */}
        {/* <p>&nbsp;</p>
        <h1 className='text-center'>Query Patient Details</h1>
        <p>&nbsp;</p>
        <div className="form-group">
            <label className="form-label fs-2">Date(Optional)</label>
            <input type="text" className="form-control fs-2" value={date} 
                onChange={event => setDate(event.target.value)} required/>
        </div>
        <form className="form-group form-control-lg" onSubmit={handleSubmit}>
            <label htmlFor="formGroupExampleInput fs-2">Enter Query</label>
            <input type="text" className="form-control fs-2" id="formGroupExampleInput" placeholder="query" 
             onChange={event => setQuery(event.target.value)} required/>
            <div className="d-grid gap-2">
                  <p>&nbsp;</p>
                  <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2">Enter</button>
            </div>
        </form> */}

          <p>&nbsp;</p>
          <div className="form-group fs-2">
            <form className='form-control' onSubmit={handleSubmit}>
                <input type="file" className='form-control fs-2' onChange={captureFile} />
                <div className="d-grid gap-2">
                  <p>&nbsp;</p>
                  <button type="submit" className="btn btn-outquery-primary btn-lg btn-block fs-2" 
                          >Submit</button>
                </div>
              </form>
              <h1>Executing your query!</h1>
              <p>Web3 Time : {resTime}</p>
          </div>

          <p>&nbsp;</p> 
          { patientArray.length === 0 ? "" :
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col" className='fs-2 text-center'>S.No.</th>
                  <th scope="col" className='fs-2 text-center'>DoctorID</th>
                  <th scope="col" className='fs-2 text-center'>DoctorName</th>
                  <th scope="col" className='fs-2 text-center'>Symptoms</th>
                  <th scope="col" className='fs-2 text-center'>Diagnostic</th>
                  <th scope="col" className='fs-2 text-center'>Department</th>
                  <th scope="col" className='fs-2 text-center'>IPFS CID</th>
                  <th scope="col" className='fs-2 text-center'>Time Added</th>
                </tr>
              </thead>
              {patientArray.map((val, index) => {
                const date = new Date(val.TimeAdded * 1000);
                return (
                  <tbody>
                  <tr key={index}>
                    <td className='fs-2 text-center'>{index + 1}</td>
                    <td className='fs-2 text-center'>{val.DoctorID}</td>
                    <td className='fs-2 text-center'>{val.DoctorName}</td>
                    <td className='fs-2 text-center'>{val.Symptoms}</td>
                    <td className='fs-2 text-center'>{val.Diagnostic}</td>
                    <td className='fs-2 text-center'>{val.Department}</td>
                    <td className='fs-2 text-center'>{val.CID}</td>
                    <td className='fs-2 text-center'>{date.toLocaleString()}</td>
                  </tr>
                  </tbody>
                )
              })}
            </table>
          }
    </div>
  )
}

export default QueryFun