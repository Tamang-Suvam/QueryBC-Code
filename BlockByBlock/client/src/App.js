import React, {useState, useEffect} from 'react';
import Footer from "./components/Footer";
import Doctor  from "./components/Doctor";
import NavbarDoctor from "./components/Doctor/NavbarDoctor";
import NavbarPatient from './components/Patient/NavbarPatient';
import Home from "./components/Home";
import IPFS from "./components/IPFS";
import Web3 from 'web3';
import QEHR from './contracts/EHR.json';
import DoctorLogin from "./components/Doctor/DoctorLogin";
import Query from "./components/Doctor/Query";
import Start from './components/Start';
import Clinic from './components/Clinic';
import PatientViewDoctors from './components/Patient/PatientViewDoctors';
import PatientLogin from './components/Patient/PatientLogin';
import CRegister from './components/Clinic/CRegister';
import CLogin from './components/Clinic/CLogin';
// import ProtectedRoutes from './components/ProtectedRoutes';

import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import NavbarClinic from './components/Clinic/NavbarClinic';


function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  // const navigate = useNavigate();

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask to work with the Application!')
    }
  }
 
  // async function loadBlockchainData() {
  //   const web3 = window.web3
  //   const accounts = await web3.eth.getAccounts()
  //   setAccount(accounts[0])
  //   const networkId = await web3.eth.net.getId()
  //   const networkData = QEHR.networks[networkId]
  //   if(networkData) {
  //     const _contract = new web3.eth.Contract(QEHR.abi, networkData.address)
  //     setContract(_contract)
  //     // const _ehrHash = await contract.methods.get().call()
  //     // setehrHash(_ehrHash)
  //   } else {
  //     window.alert('Smart contract not deployed to detected network.')
  //   }
  // }

  useEffect(() => {
    loadWeb3();
    // loadBlockchainData();
  }, []);

  return (
    <div className="mb-3 p-4">
        <Routes>
          {/* <Route exact path = "/" element = {[<Home />, <Start />, <Footer />]} /> */}
          <Route exact path = "/" element = {<Home />} />
          <Route exact path = "/start_page" element = {[<Start />, <Footer />]} />
          <Route exact path = "/patient_login" element = {[<NavbarPatient />, <PatientLogin contract = {contract}/>]} />
          <Route exact path = "/patient_page" element = {[<NavbarPatient />, <PatientViewDoctors contract={contract}/>]} />
          {/* <ProtectedRoutes exact path = "/doctor_page">
            <Doctor contract={contract} account={account} />
          </ProtectedRoutes> */}
          {/* <Route exact path = "/doctor_page" element = {<ProtectedRoutes>
            <Doctor contract={contract} account={account} />
          </ProtectedRoutes>} /> */}
          <Route exact path = "/doctor_login" element = {[<NavbarDoctor />, <DoctorLogin contract = {contract}/>]} />
          <Route exact path = "/doctor_page" element = {<Doctor contract={contract} account={account}/>} />
          <Route exact path = "/clinic_registration" element = {[<NavbarClinic/>, <CRegister />]} />
          <Route exact path = "/clinic_login" element = {<CLogin/>} />
          <Route exact path = "/clinic_page" element = {<Clinic contract={contract} account={account}/>} />
          <Route exact path = "/query_page" element = {[<NavbarDoctor />, <Query contract={contract}/>]} />
          <Route exact path = "/ipfs_page" element = {[<NavbarDoctor />, <IPFS />]} />
        </Routes>  
        {/* <Footer /> */}
    </div>
  );
}

export default App;