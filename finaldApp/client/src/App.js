import React, { Suspense, useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'
import Web3 from 'web3'

import clinic from './contracts/Clinic'
import doctor from './contracts/Doctor'
import patient from './contracts/Patient'

// import ClinicDescription from './components/Clinic/ClinicDescription'
// import DoctorRegister from './components/Clinic/DoctorRegister'
// import ClinicQuery from './components/Clinic/ClinicQuery'
// import ClinicPage from './components/Clinic/ClinicPage'

// All the common imports
const Dashboard = React.lazy(() => import('./components/Dashboard'))
const StartPage = React.lazy(() => import('./components/StartPage'))

// All the clinic page related imports
const ClinicLogin = React.lazy(() => import('./components/Clinic/CLogin'))
const ClinicRegister = React.lazy(() => import('./components/Clinic/CRegister'))
const ClinicDescription = React.lazy(() => import('./components/Clinic/ClinicDescription'))
const DoctorRegister = React.lazy(() => import('./components/Clinic/DoctorRegister'))
const ClinicAddPatient = React.lazy(() => import('./components/Clinic/ClinicAddPatient'))
const ClinicQuery = React.lazy(() => import('./components/Clinic/ClinicQuery'))
const ClinicPage = React.lazy(() => import('./components/Clinic/ClinicPage'))

// All the doctor page related imports
const DoctorPage = React.lazy(() => import('./components/Doctor/DoctorPage'))
const DoctorLogin = React.lazy(() => import('./components/Doctor/DoctorLogin'))
const AddPatient = React.lazy(() => import('./components/Doctor/AddPatient'))
const AddRecord = React.lazy(() => import('./components/Doctor/AddRecord'))
const DoctorQuery = React.lazy(() => import('./components/Doctor/DoctorQuery'))

// All the patient page related imports
const PatientLogin = React.lazy(() => import('./components/Patient/PatientLogin'))
const PatientPage = React.lazy(() => import('./components/Patient/PatientPage'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {

  const [account, setAccount] = useState(null);
  const [clinicContract, setClinicContract] = useState(null);
  const [doctorContract, setDoctorContract] = useState(null);
  const [patientContract, setPatientContract] = useState(null);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask to work with the DApp!')
    }
  }
 
  async function loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    console.log(accounts[0])
    
    const networkId = await web3.eth.net.getId()
    const networkData1 = clinic.networks[networkId]
    const networkData2 = doctor.networks[networkId]
    const networkData3 = patient.networks[networkId]

    if(networkData1 && networkData2 && networkData3) {
      const _clinicContract = new web3.eth.Contract(clinic.abi, networkData1.address)
      const _doctorContract = new web3.eth.Contract(doctor.abi, networkData2.address)
      const _patientContract = new web3.eth.Contract(patient.abi, networkData3.address)
    
      setClinicContract(_clinicContract)
      setDoctorContract(_doctorContract)
      setPatientContract(_patientContract)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path = '/' element = {<Dashboard/>} />
        <Route exact path = '/start_page' element = {<StartPage/>}/>

        {/* All the routes belonging to the clinic component */}
        <Route exact path = "/clinic_page" element = {<ClinicPage doctorContract={doctorContract} patientContract={patientContract}/>} />
        <Route exact path = '/clinic_login' element = {<ClinicLogin clinicContract={clinicContract}/>}/>
        <Route exact path = '/clinic_registration' element = {<ClinicRegister clinicContract={clinicContract} 
                                                                             account={account}/>}/>
        <Route exact path = '/clinic_desc' element = {<ClinicDescription />}/>
        <Route exact path = '/add_doctor' element = {<DoctorRegister clinicContract={clinicContract} account={account}/>}/>
        <Route exact path = '/clinic_add_patient' element = {<ClinicAddPatient clinicContract={clinicContract} account={account}/>}/>
        <Route exact path = '/clinic_query' element = {<ClinicQuery clinicContract={clinicContract} doctorContract={doctorContract} patientContract={patientContract} account={account}/>}/>

        {/* All the routes belonging to the doctor component */}
        <Route exact path = '/doctor_page' element = {<DoctorPage doctorContract={doctorContract} patientContract={patientContract}/>} />
        <Route exact path = '/doctor_login' element = {<DoctorLogin doctorContract={doctorContract}/>} />
        <Route exact path = '/add_patient' element = {<AddPatient doctorContract={doctorContract} account={account}/>}/>
        <Route exact path = '/add_record' element = {<AddRecord doctorContract={doctorContract} account={account}/>}/>
        <Route exact path = '/doctor_query' element = {<DoctorQuery patientContract={patientContract} />}/>

        {/* All the routes belonging to the patient component */}
        <Route exact path = '/patient_login' element = {<PatientLogin patientContract={patientContract}/>} />
        <Route exact path = '/patient_page' element = {<PatientPage clinicContract={clinicContract} doctorContract={doctorContract} patientContract={patientContract}/>} />
      </Routes>
    </Suspense>
  );
}

export default App;
