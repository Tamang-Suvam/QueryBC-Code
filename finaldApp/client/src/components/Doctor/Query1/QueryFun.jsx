import React, { useState  } from "react";
import { ValidateQuery } from "../../../ValidateQuery";

import CryptoJS from 'crypto-js';

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = null;
    this.tail = null;
  }

  get(key) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      this._remove(node);
      this._add(node);
      return node.value;
    }
    return null;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._remove(node);
      this._add(node);
    } else {
      const node = { key, value, prev: null, next: null };
      this.map.set(key, node);
      this._add(node);

      if (this.map.size > this.capacity) {
        this.map.delete(this.tail.key);
        this._remove(this.tail);
      }
    }
  }

  _add(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }

  _remove(node) {
    if (node.prev === null) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }

    if (node.next === null) {
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
    }
  }
} // End of the LRU Class definition

// Let's say our cache currently has a capacity of 10 items
const cache = new LRUCache(10); 

function getItemFromCache(key) {
  const cacheItem = localStorage.getItem(key);

  if (cacheItem) {
    const parsedCacheItem = JSON.parse(cacheItem).data;

    if (parsedCacheItem.expires && new Date().getTime() > parsedCacheItem.expires) {
      localStorage.removeItem(key);
      cache.map.delete(key);
      return null;
    }

    const cachedData = cache.get(key);
    if (cachedData === null) {
      localStorage.removeItem(key);
      return null;
    }

    return cachedData;
  }

  return null;
}

export default function QueryFun({contract}) {
  const [query, setQuery] = useState([])
  const [patientArray, setPatientArray] = useState([])
  const [groupByArray, setGroupByArray] = useState([])
  const [grpBy, setGroupBy] = useState("")

  const [resTime, setresTime] = useState(0)
  const [file, setFile] = useState(null)
  const [privateKey, setPrivateKey] = useState(" ")
  
  /////////////////////////////// Reading from a file of queries//////////////////////////////////////////////////////////
  const captureFile = (event) => {
    event.preventDefault()
    const _file = event.target.files[0]
    setFile(_file)
  }

  const handleSubmit = async (event) => {
  event.preventDefault();
  let time = 0

  const reader = new FileReader()
  reader.onload = async (e) => { 
    const text = (e.target.result)
      var queries = text.split(/\r\n|\n/);
      for(let query = 0; query < queries.length - 1; query++){
        const [select, from, where_1, where_2, and_1, and_2, groupBy] = ValidateQuery(queries[query])
        setGroupBy(groupBy)
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
            //     let patients = await contract.methods.getRegisteredPatientsRecordsByID(where_2).call()
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

            else if(where_1 === 'PATIENT-ID' && and_1 === ' ') {
                let start = performance.now()
                let patients = await contract.methods.getRegisteredPatientsRecordsByID(where_2).call()
                let end = performance.now()
                time += end - start
                if(patients.length === 0) {
                  alert("No patients to display!")
                } else {                
                  setPatientArray(patients)
                }
            } else if(where_1 === 'PATIENT-ID' && and_1 === 'TIME-ADDED') {
              let patients = await contract.methods.getPatientRecordsFromSpecificDate(where_2, and_2).call()
              if(patients.length === 0) {
                alert("No patients to display!")
              } else {                
                setPatientArray(patients)
              }
            }   
            else {
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


  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   // let result = await contract_2.methods.doctorNaturalJoinPatient().call();
  //   // console.log(result)
  //   let startTime = 0, endTime = 0, seconds = 0, time = 0
  //   // for(let i = 0; i < 1; i++) {
  //   //   startTime = performance.now()
  //   //   let patients = await contract.methods.getRegisteredPatientsRecordsByID('0xD94c72016AE885b31798849f00dA9E47C4EB1b07').call()
  //   //   endTime = performance.now()
  //   //   seconds = endTime - startTime
  //   //   time += seconds
  //   //   setPatientArray(patients)
  //   //   console.log(CryptoJS.AES.decrypt(patients[0].cid, privateKey).toString(CryptoJS.enc.Utf8))
  //   // }
  //   let data = getItemFromCache(query)
  //   // console.log(data)
  //   for(let i = 0; i < 10; i++) {
      
  //     startTime = performance.now()
  //     if(data === null) {
  //       let patients = await contract.methods.getRegisteredPatientsRecordsByID('0xD94c72016AE885b31798849f00dA9E47C4EB1b07').call()
  //       if(patients !== null) {
  //         console.log(patients)
  //         setPatientArray(patients)
  //         const expirationDate = new Date().getTime() + 300000; // setting an expiration time of 5 minutes for every item in the cache
  //         localStorage.setItem(query, JSON.stringify({ data: patients, expires: expirationDate }));
  //         cache.put(query, patients);
  //       }
  //     } else {
  //       setPatientArray(data)
  //     }
  //     endTime = performance.now()
  //     seconds = endTime - startTime
  //     time += seconds
  //   }
  //   console.log(time)
  //   // console.log("Hey: " + CryptoJS.AES.decrypt("U2FsdGVkX181Wi/upqTwGrdNr4BW0dRu6ViaF8TezlA=", privateKey).toString(CryptoJS.enc.Utf8))
  // }

    //  const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   // let startTime = 0, endTime = 0, seconds = 0
    //   // let time = 0
    //   const [select, from, where_1, where_2, and_1, and_2, groupBy] = ValidateQuery(query)
    //   setGroupBy(groupBy)
      
    //   console.log("select" + select + ',' + "from" + from + ',' + "where_1" + where_1 + ',' + "where_2" + where_2 + ',' + "and_1" + and_1 + "and_2" + and_2 + " "+ "groupBy" + groupBy)
    //   if(groupBy === ' ') {
    //     if(from[0] === 'PATIENTS') {
    //       if(select[0] === '*') {
    //         if(where_1 === 'DEPARTMENT') {
    //           alert("You don't have permission to fire this query!")
    //         } else if(where_1 === 'PATIENT-ID') {
    //           // // Injecting the code for the cache layer here
    //           // let data = getItemFromCache(query)
    //           // startTime = performance.now()
    //           // if(data === null) {
    //           //   let patients = await contract.methods.getRegisteredPatientsRecordsByID(where_2).call()
    //           //   if(patients.length === 0) {
    //           //     alert("No patients to display!")
    //           //   } else {                
    //           //     setPatientArray(patients)
    //           //     const expirationDate = new Date().getTime() + 300000; // setting an expiration time of 5 minutes for every item in the cache
    //           //     localStorage.setItem(query, JSON.stringify({ data: patients, expires: expirationDate }));
    //           //     cache.put(query, patients);
    //           //   }
    //           // } else {
    //           //   setPatientArray(data)
    //           // }
    //           // endTime = performance.now()
              
    //           // seconds = (endTime - startTime)
    //           // time += seconds
    //             let patients = await contract.methods.getRegisteredPatientsRecordsByID(where_2).call()
    //             if(patients.length === 0) {
    //               alert("No patients to display!")
    //             } else {                
    //               setPatientArray(patients)
    //             }
    //         } else {
    //           alert("You don't have permission to fire this query!")
    //         }
    //       }
    //     } else {
    //       alert("Invalid SQL Query!")
    //     } 
    //   } else {  // Here handling the groupBy clause
    //     let result = await contract.methods.groupByClause(where_2).call()
    //     console.log(result)
    //     setGroupByArray(result)
    //   }
    // }


    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   // let startTime = 0, endTime = 0, seconds = 0
    //   // let time = 0
    //   const [select, from, where_1, where_2, and_1, and_2, groupBy] = ValidateQuery(query)
    //   setGroupBy(groupBy)
      
    //   console.log("select" + select + ',' + "from" + from + ',' + "where_1" + where_1 + ',' + "where_2" + where_2 + ',' + "and_1" + and_1 + "and_2" + and_2 + " "+ "groupBy" + groupBy)
    //   if(groupBy === ' ') {
    //     if(from[0] === 'PATIENTS') {
    //       if(select[0] === '*') {
    //         if(where_1 === 'DEPARTMENT') {
    //           alert("You don't have permission to fire this query!")
    //         } else if(where_1 === 'PATIENT-ID' && and_1 === ' ') {
    //             let start = performance.now()
    //             let patients = await contract.methods.getRegisteredPatientsRecordsByID(where_2).call()
    //             let end = performance.now()
    //             console.log(end - start + " seconds")
    //             if(patients.length === 0) {
    //               alert("No patients to display!")
    //             } else {                
    //               setPatientArray(patients)
    //             }
    //         } else if(where_1 === 'PATIENT-ID' && and_1 === 'TIME-ADDED') {
    //           let patients = await contract.methods.getPatientRecordsFromSpecificDate(where_2, and_2).call()
    //           if(patients.length === 0) {
    //             alert("No patients to display!")
    //           } else {                
    //             setPatientArray(patients)
    //           }
    //         }   
    //         else {
    //           alert("You don't have permission to fire this query!")
    //         }
    //       }
    //     } else {
    //       alert("Invalid SQL Query!")
    //     } 
    //   } else {  // Here handling the groupBy clause
    //     let result = await contract.methods.groupByClause(where_2).call()
    //     console.log(result)
    //     setGroupByArray(result)
    //   }
    // }

  return (
    <>
    <div>
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
              <p>SC Time : {resTime}</p>
          </div>
    </div>

     <div>
         {/* <p>&nbsp;</p>
           <form className="form-group form-control-lg" onSubmit={handleSubmit}>
               <label className="form-label fs-2">Patient Private Key</label>
               <input type="text" className="form-control fs-2" id="privatekey"  
                      onChange={event => setPrivateKey(event.target.value)} required/>  
               <h1 className='text-center fw-bolder'>View Registered QueryFun</h1>
               <label className="fs-2 form-control-lg" htmlFor="exampleFormControlTextarea1">Enter the SQL query</label>
               <textarea className="form-control form-control-lg fs-2" id="FormControlTextarea1" rows="1"
                         value={query} onChange={event => {setQuery(event.target.value)}} required></textarea>

               <div className="d-grid gap-2">
                     <p>&nbsp;</p>
                     <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2">Enter</button>
               </div>

           </form>
         <p>&nbsp;</p> */}

         {/* {grpBy === " " ? (
          patientArray.length === 0 ? <h5 className='text-center text-danger'>No Patient Record Found!</h5> :
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
               <th scope="col" className='fs-2 text-center'>S.No.</th>
               <th scope="col" className='fs-2 text-center'>DoctorID</th>
               <th scope="col" className='fs-2 text-center'>DoctorName</th>
               <th scope="col" className='fs-2 text-center'>Symptom</th>
               <th scope="col" className='fs-2 text-center'>Diagnostic</th>
               <th scope="col" className='fs-2 text-center'>Department</th>
               <th scope="col" className='fs-2 text-center'>IPFS CID</th>
               <th scope="col" className='fs-2 text-center'>Time</th>
             </tr>
           </thead>
           {patientArray.map((val, index) => {
             const date = new Date(val.timeAdded * 1000);
             return (
               <tbody>
               <tr key={index}>
                 <td className='fs-2 text-center'>{index + 1}</td>
                 <td className='fs-2 text-center'>{val.doctorId}</td>
                 <td className='fs-2 text-center'>{val.doctorName}</td>
                 <td className='fs-2 text-center'>{val.symptoms}</td>
                 <td className='fs-2 text-center'>{val.diagnostic}</td>
                 <td className='fs-2 text-center'>{val.department}</td>
                 <td className='fs-2 text-center'>{val.cid}</td>
                 <td className='fs-2 text-center'>{date.toLocaleString()}</td>
               </tr>
               </tbody>
             )
           })}
         </table>
         ) : 
          groupByArray.length === 0 ? <h5 className='text-center text-danger'>No Group By Result Found!</h5> :
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col" className='fs-2 text-center'>S.No.</th>
                  <th scope="col" className='fs-2 text-center'>Count</th>
                  <th scope="col" className='fs-2 text-center'>DoctorID</th>
                </tr>
              </thead>
              {groupByArray.map((val, index) => {
                return (
                  <tbody>
                  <tr key={index}>
                    <td className='fs-2 text-center'>{index + 1}</td>
                    <td className='fs-2 text-center'>{val.count}</td>
                    <td className='fs-2 text-center'>{val.doctorName}</td>
                  </tr>
                  </tbody>
                )
              })}
            </table>
          } */}

    </div>
    </>

    // <td className='fs-2 text-center'>{CryptoJS.AES.decrypt(val.doctorName, privateKey).toString(CryptoJS.enc.Utf8)}</td>
    // <td className='fs-2 text-center'>{CryptoJS.AES.decrypt(val.department, privateKey).toString(CryptoJS.enc.Utf8)}</td>
    // <td className='fs-2 text-center'>{CryptoJS.AES.decrypt(val.cid, privateKey).toString(CryptoJS.enc.Utf8)}</td> 




    // <div>
    //     <p>&nbsp;</p>
    //       <form className="form-group form-control-lg" onSubmit={handleSubmit}>
    //           <label className="form-label fs-2">Patient Private Key</label>
    //           <input type="text" className="form-control fs-2" id="privatekey"  
    //                  onChange={event => setPrivateKey(event.target.value)} required/>  
    //           <h1 className='text-center fw-bolder'>View Registered QueryFun</h1>
    //           <label className="fs-2 form-control-lg" htmlFor="exampleFormControlTextarea1">Enter the SQL query</label>
    //           <textarea className="form-control form-control-lg fs-2" id="FormControlTextarea1" rows="1"
    //                     value={query} onChange={event => {setQuery(event.target.value)}} required></textarea>

    //           <div className="d-grid gap-2">
    //                 <p>&nbsp;</p>
    //                 <button type="submit" className="btn btn-outline-info btn-lg btn-block fs-2">Enter</button>
    //           </div>

    //       </form>

    //       { patientArray.length === 0 ? <h5 className='text-center text-danger'>No Patient Record Found!</h5> :
    //         <table className="table table-hover">
    //           <thead className="table-dark">
    //             <tr>
    //               <th scope="col" className='fs-2 text-center'>S.No.</th>
    //               <th scope="col" className='fs-2 text-center'>DoctorID</th>
		// 		          <th scope="col" className='fs-2 text-center'>Name</th>
    //               <th scope="col" className='fs-2 text-center'>Department</th>
    //               <th scope="col" className='fs-2 text-center'>IPFS CID</th>
    //               <th scope="col" className='fs-2 text-center'>Time</th>
    //             </tr>
    //           </thead>
    //           {patientArray.map((val, index) => {
    //             const date = new Date(val.timeAdded * 1000);
    //             return (
    //               <tbody>
    //                <tr key={index}>
    //                  <td className='fs-2 text-center'>{index + 1}</td>
    //                 <td className='fs-2 text-center'>{val.doctorId}</td>
    //                 {/* <td className='fs-2 text-center'>{val.doctorName}</td> */}
		// 			           <td className='fs-2 text-center'>{CryptoJS.AES.decrypt(val.doctorName, privateKey).toString(CryptoJS.enc.Utf8)}</td>
    //                  <td className='fs-2 text-center'>{CryptoJS.AES.decrypt(val.department, privateKey).toString(CryptoJS.enc.Utf8)}</td>
    //                  <td className='fs-2 text-center'>{CryptoJS.AES.decrypt(val.cid, privateKey).toString(CryptoJS.enc.Utf8)}</td>
    //                  <td className='fs-2 text-center'>{date.toLocaleString()}</td>
    //                </tr>
    //                </tbody>
    //              )
    //           })}
    //         </table>
    //       }
    // </div>
  );
}

//.toString(CryptoJS.enc.Utf8)