import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import axios from "axios";
import Web3 from 'web3';
import {abi} from '../../../assets/MedCoin.abi'

const DocFun = ({contract, account}) => {
  // variables to be stored in database
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  // variables to be stored in Blockchain
  const [submitting, setSubmitting] = useState(false);
  const [patientName, setpatientName] = useState('');
  const [patientID, setpatientID] = useState('');
  const [doctorName, setdoctorName] = useState('');
  const [doctorID, setdoctorID] = useState('');
  const [cid, setCID] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [department, setDepartment] = useState("");

  const [privateKey, setPrivateKey] = useState("");

  const AddPatient = event => {
    event.preventDefault();
    if( !address || !name || !password ){
      alert("Address or Name or Password cannot be left empty!")
    } 
    else {
      contract.methods.doctorAddPatient(address, name, department.toUpperCase(), password).send({from: account})
      contract.events.PatientAdded(function(error, event){ 
        if(event){
          setRegister(true)
          return
        }
        if(error) {
          alert("Patient couldn't be registered!")
        }
      }) 
    }
  }
  
  const AddRecord = async (e) => {
    e.preventDefault();
    // let startTime1 = 0, startTime2 = 0, endTime1 = 0, endTime2 = 0, seconds1 = 0, seconds2 = 0, time = 0
    // setSubmitting(true);
    // setTimeout(() => {
    //   setSubmitting(false);
    // }, 1000)
    // startTime1 = Date.now()
    await contract.methods.doctorAddRecord(cid, patientID, patientName, doctorName, doctorID, symptoms, diagnostic, department).send({from: account})
    
    // ////////// This section handles the token part of the code //////////////////////
    // const web3 = new Web3('HTTP://127.0.0.1:7545') // As of now have used only Ganache
    // const tokenContract = new web3.eth.Contract(abi, "0xFB5C4178D5f8956F8370bF01ddB8B78f81Acf19d")
    // const sent  = await tokenContract.methods.transfer(patientID, 1)
    // console.log(sent)
    //////////////////CURRENTLY NOT IMPLEMENTED!!!/////////////////////////////////////////////////////////////////////

    
    // await contract.methods.doctorAddRecord(CryptoJS.AES.encrypt(cid, privateKey).toString(), 
    //                                        patientID, 
    //                                        CryptoJS.AES.encrypt(patientName, privateKey).toString(),
    //                                        CryptoJS.AES.encrypt(doctorName, privateKey).toString(), 
    //                                        doctorID,
    //                                        CryptoJS.AES.encrypt(symptoms, privateKey).toString(),
    //                                        CryptoJS.AES.encrypt(diagnostic, privateKey).toString(), 
    //                                        CryptoJS.AES.encrypt(department, privateKey).toString()).send({from: account})


    //   contract.getPastEvents('RecordAdded', { fromBlock: 'latest', toBlock: 'latest' }, async function(error, event){ 
    //     if(error) {
    //       alert("Error! Record couldn't be added")
    //       return
    //     } else {
    //          await axios.post('http://localhost:5000/medicalrecords',{
    //             cid: event[0].returnValues._cid,
    //             patientID: event[0].returnValues._patientId,
    //             patientName: event[0].returnValues._patientName,
    //             doctorName: event[0].returnValues._doctorName,
    //             doctorID: event[0].returnValues._doctorId,
    //             symptoms: event[0].returnValues.symptoms,
    //             diagnostic: event[0].returnValues.diagnostic,
    //             department: event[0].returnValues.department,
    //             timeAdded: Date(event[0].returnValues.timeAdded),
    //         });
    //         alert("Record added successfully in block"+ event[0].blockNumber)
    //     }
    // }) 
  }

  return (
    <div>
      <h1 className='fw-bolder text-center'>Register Patient</h1>
      <form className="form-control form-control-lg" onSubmit={AddPatient}>
          <div className="form-group">
              <label className="form-label fs-2">Enter Patient address</label>
              <input type="address" className="form-control fs-2" value={address} 
                  onChange={event => setAddress(event.target.value)} required/>
          </div>
          <p>&nbsp;</p>
          <div className="form-group">
              <label className="form-label fs-2">Enter Patient Name</label>
              <input type="text" className="form-control fs-2" value={name} 
                  onChange={event => setName(event.target.value)} required/>
          </div>
          <p>&nbsp;</p>
          <div className="form-group">
              <label className="form-label fs-2">Enter Patient Department</label>
              <input type="text" className="form-control fs-2" value={department} 
                  onChange={event => setDepartment(event.target.value)} required/>
          </div>
          <p>&nbsp;</p>
          <div className="form-group">
              <label className="form-label fs-2">Password</label>
              <input type="password" className="form-control fs-2" value={password} 
                      onChange={event => setPassword(event.target.value)} required/>
          </div>
          <p>&nbsp;</p>
          <div className="d-grid gap-2">
            <p>&nbsp;</p>
            <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Submit</button>
          </div>
      </form>
      { register ? (
                            <p className="text-success text-center fs-3">Patient Registration Successfull</p>
                         ) : (
                            <p className="text-danger text-center fs-3">Patient Registration Unsuccessfull</p>
                         )
      }
      <p>&nbsp;</p>
      <form className="form-control form-control-lg" onSubmit={AddRecord}>
        <h1 className='fw-bolder text-center'>Add Patient Details</h1>
        {/* { 
          submitting &&
          <div>Submtting Form...</div>
        } */}
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
                <label className="form-label fs-2">Enter Doctor Address</label>
          <input type="text" className="form-control fs-2" id="doctorID"  
                onChange={event => setdoctorID(event.target.value)} required/>
          <label className="form-label fs-2">Enter Symptoms</label>
          <input type="text" className="form-control fs-2" id="symptoms"  
                onChange={event => setSymptoms(event.target.value)} required/>
          <label className="form-label fs-2">Enter Diagnostic</label>
          <input type="text" className="form-control fs-2" id="diagnostic"  
                onChange={event => setDiagnostic(event.target.value)} required/>
          <label className="form-label fs-2">Enter Department</label>
          <input type="text" className="form-control fs-2" id="department"  
                onChange={event => setDepartment(event.target.value)} required/>
          <label className="form-label fs-2">Patient Private Key</label>
          <input type="text" className="form-control fs-2" id="privatekey"  
                onChange={event => setPrivateKey(event.target.value)} required/>      
        </div>
        <div className="d-grid gap-2">
            <p>&nbsp;</p>
            <button type="submit" className="btn btn-outline-success btn-lg btn-block fs-2">Enter</button>
        </div>
      </form>
        <p>&nbsp;</p>
    </div>
  );
}

export default DocFun;
