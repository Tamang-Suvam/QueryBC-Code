import React, { useState } from 'react';
import axios from "axios"
import { addPatientRecord, addPatientRecordsCSV } from '../../../queryBC.js'
// import { main } from '../../../mongoClient/try';
import Papa from 'papaparse';
import Web3 from 'web3';
// const Web3 = require('web3')
// const rpcURL = `https://rpc-mumbai.maticvigil.com` 
// const web3 = new Web3(rpcURL)

const DocFun = ({contract, account}) => {
  // variables to be stored in database
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [added, setAdded] = useState(false);
  const [department, setDepartment] = useState("");
  const role = "patient";

  // variables to be stored in Blockchain
  // const [patientAddress, setpatientAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [patientName, setpatientName] = useState('');
  const [patientID, setpatientID] = useState('');
  const [doctorID, setdoctorID] = useState('');
  const [doctorName, setdoctorName] = useState('');
  const [cid, setCID] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  // The section of thos code is to input multiple records into the blockchain and check for the query throughput and latency
  const [csvData, setCsvData] = useState([]);

  const handleCsvString = (csvString) => {
    Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      step: (results) => {
        setCsvData((prevData) => [...prevData, results.data]);
      }
    });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvString = e.target.result;
        // console.log(csvString[1])
        handleCsvString(csvString);
      };
      reader.readAsText(file);
    }
  };

  ////////////////////////// ENDS HERE ////////////////////////////////////

  const AddPatient = event => {
    event.preventDefault();
    if( !address || !name || !password ){
      alert("Address or Name or Password cannot be left empty!")
    } 
    else {
      // set configurations
      const configuration = {
          method: "post",
          url: "http://localhost:4001/register",
          data: {
          address,
          name,
          password,
          role,
          department,
          },
      };
        // make the API call
        axios(configuration)
        .then((result) => {
        // alert(result.data.message);
        setAdded(true);
        })
        .catch((error) => {
            console.error(error)
        // alert(error.response.data.message);
        });
    }
  }
  // const AddPatient = event => {
  //   event.preventDefault();
  //   contract.methods.addPatient(patientAddress).send({from: account})
  // }

  const AddRecord = async event => {
    event.preventDefault();
  //  setSubmitting(true);
  //  setTimeout(() => {
  //    setSubmitting(false);
  //  }, 1000)
  // //  contract.methods.addRecord(cid, patientID, patientName, doctorName, symptoms, diagnostic).send({from: account})
  // // const txCount = await web3.eth.getTransactionCount(csvData[0].doctorId);
  // for(let i = 0; i < csvData.length; i++) {
  //   console.log(i)
  //  const[transactionHash, blockNumber] = await addPatientRecord(csvData[i].cid, 
  //                                                               csvData[i].doctorName, 
  //                                                               csvData[i].doctorId, 
  //                                                               csvData[i].patientName, 
  //                                                               csvData[i].patientId, 
  //                                                               csvData[i].symptoms, 
  //                                                               csvData[i].diagnostic, 
  //                                                               csvData[i].department, 
  //                                                               csvData[i].timeAdded,
  //                                                               privateKey,
  //                                                               i)
  //  let address = csvData[i].patientId
   
  //  console.log(transactionHash)
  //  console.log(blockNumber)
  // // let address = '0xD42D954A5aC1fa52706d26Cc26FaDBA5cfC8f773'
  // // let blockNumber = 20
  // // let transactionHash = '0x23308b5a805fd5cbacbb69ee01c0d8e5731aaf7626e28e344b302b0456c988e0'
  //  // set configurations
  //   const configuration = {
  //       method: "post",
  //       url: "http://localhost:4000/transaction-details",
  //       data: {
  //       address,
  //       blockNumber,
  //       transactionHash
  //       },
  //   };
  //     // make the API call
  //     axios(configuration)
  //         .then((result) => {
  //         // alert(result.data.message);
  //         setAdded(true);
  //     })
  //     .catch((error) => {
  //         console.error(error)
  //     // alert(error.response.data.message);
  //     });
  //   }
  const res = await addPatientRecordsCSV(csvData, privateKey)
  console.log(res[0].blockNumber)
  console.log(res[0].transactionHash)
  console.log(Web3.utils.toChecksumAddress(res[0].to))
  // console.log(res[0].)
  // const transactionHash = res.transactionHash
  // const blockNumber = res.blockNumber
  //   const[transactionHash, blockNumber] = await addPatientRecord(cid, doctorName, doctorID, patientName, patientID,
  //                                                                symptoms, diagnostic, department, timeAdded, privateKey)
  //  let address = csvData[i].patientID
  //  console.log(transactionHash)
  //  console.log(blockNumber)
  // // let address = '0xD42D954A5aC1fa52706d26Cc26FaDBA5cfC8f773'
  // // let blockNumber = 20
  // // let transactionHash = '0x23308b5a805fd5cbacbb69ee01c0d8e5731aaf7626e28e344b302b0456c988e0'
   // set configurations
   for(let i = 0; i < res.length; i++) {
    let address = Web3.utils.toChecksumAddress(res[i].to)
    let blockNumber = res[i].blockNumber
    let transactionHash = res[i].transactionHash
    
    const configuration = {
        method: "post",
        url: "http://localhost:4000/transaction-details",
        data: {
        address,
        blockNumber,
        transactionHash
        },
    };
      // make the API call
      axios(configuration)
          .then((result) => {
          // alert(result.data.message);
          setAdded(true);
      })
      .catch((error) => {
          console.error(error)
      // alert(error.response.data.message);
      });
    }
  }

  return (
    <div>
      <h1 className='fw-bolder text-center'>Register Patient</h1>
      <form className="form-control form-control-lg" onSubmit={AddPatient}>
          <div className="form-group">
              <label className="form-label fs-2">Enter Patient Address</label>
              <input type="address" className="form-control fs-2" value={address} 
                  onChange={event => setAddress(event.target.value)} required/>
          </div>
          <p>&nbsp;</p>
          <div className="form-group">
              <label className="form-label fs-2">Enter Patient Name</label>
              <input type="address" className="form-control fs-2" value={name} 
                  onChange={event => setName(event.target.value)} required/>
          </div>
          <p>&nbsp;</p>
          <div className="form-group">
              <label className="form-label fs-2">Password</label>
              <input type="password" className="form-control fs-2" value={password} 
                      onChange={event => setPassword(event.target.value)} required/>
          </div>
          <p>&nbsp;</p>
          <div className="form-group">
              <label className="form-label fs-2">Department</label>
              <input type="password" className="form-control fs-2" value={department} 
                      onChange={event => setDepartment(event.target.value)} required/>
          </div>
          <div className="d-grid gap-2">
            <p>&nbsp;</p>
            <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Submit</button>
          </div>
      </form>
      { added ? (
                            <p className="text-success text-center fs-3">Patient record successfully added</p>
                         ) : (
                            <p className="text-danger text-center fs-3">Patient record addtion unsuccessfull</p>
                         )
      }
      {/* <p>&nbsp;</p>
      <form className="form-control form-control-lg" onSubmit={AddRecord}>
        <h1 className='fw-bolder text-center'>Add Patient Details</h1>
        { 
          submitting &&
          <div>Submtting Form...</div>
        }
        <div className="mb-3">
          <label className="form-label fs-2">Enter CID</label>
          <input type="text" className="form-control fs-2" id="CID"  
                onChange={event => setCID(event.target.value)} required/>
          <label className="form-label fs-2">Enter Patient Name</label>
          <input type="text" className="form-control fs-2" id="patientName"  
                onChange={event => setpatientName(event.target.value)} required/>
          <label className="form-label fs-2">Enter Patient ID</label>
          <input type="text" className="form-control fs-2" id="patientId"  
                onChange={event => setpatientID(event.target.value)} required/>
          <label className="form-label fs-2">Enter Doctor Name</label>
          <input type="text" className="form-control fs-2" id="doctorName"  
                onChange={event => setdoctorName(event.target.value)} required/>
          <label className="form-label fs-2">Enter Doctor ID</label>
          <input type="text" className="form-control fs-2" id="patientId"  
                onChange={event => setdoctorID(event.target.value)} required/>
          <label className="form-label fs-2">Enter Symptoms</label>
          <input type="text" className="form-control fs-2" id="symptoms"  
                onChange={event => setSymptoms(event.target.value)} required/>
          <label className="form-label fs-2">Enter Diagnostic</label>
          <input type="text" className="form-control fs-2" id="diagnostic"  
                onChange={event => setDiagnostic(event.target.value)} required/>
          <label className="form-label fs-2">Enter Department</label>
          <input type="text" className="form-control fs-2" id="departement"  
                onChange={event => setDepartment(event.target.value)} required/>
          <label className="form-label fs-2">Enter Your Private Key(for signing transaction)</label>
          <input type="password" className="form-control fs-2" id="diagnostic"  
                onChange={event => setPrivateKey(event.target.value)} required/>
        </div>
        <div className="d-grid gap-2">
            <p>&nbsp;</p>
            <button type="submit" className="btn btn-outline-success btn-lg btn-block fs-2">Enter</button>
        </div>
      </form>
        <p>&nbsp;</p> */}

    <div>
      <p className='text-success'> Input Patient records through a CSV file</p>
        <label className="form-label fs-2">Enter Your Private Key(for signing transaction)</label>
          <input type="password" className="form-control fs-2" id="diagnostic"  
                onChange={event => setPrivateKey(event.target.value)} required/>
        <input type="file" onChange={handleFileSelect} />
        {/* <ul>
          {csvData.map((row, i) => (
            <li key={i}>{JSON.stringify(row)}</li>
          ))}
        </ul> */}
        <p className='text-success'> Click the button below to add everything in blockchain</p>
        <button variant="outline-success" onClick={AddRecord}>Submit to BC</button>{' '}
    </div>
    </div>
  );
}

export default DocFun;
