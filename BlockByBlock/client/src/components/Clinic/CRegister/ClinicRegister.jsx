import React , { useState } from 'react'
import axios from "axios";
// const Web3 = require('web3')
// const rpcURL = `HTTP://127.0.0.1:7545`
// // const rpcURL = `https://rpc-mumbai.maticvigil.com` 
// const web3 = new Web3(rpcURL)

export default function ClinicRegister() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [register, setRegister] = useState(false)
    const [location, setLocation] = useState("")
    const [privateKey, setPrivateKey] = useState("")
    const role = "clinic"

    const AddClinic = (e) => {
        e.preventDefault();
        if( !address || !password ){
            alert("Address or Password cannot be empty!")
        } else {
            // set configurations
            const configuration = {
                method: "post",
                url: "http://localhost:4001/register",
                data: {
                address,
                name,
                password,
                role,
                // department,
                },
            };
            // make the API call
            axios(configuration)
            .then((result) => {
            alert(result.data.message);
            setRegister(true);
            })
            .catch((error) => {
            // error = new Error();
            alert(error.response.data.message);
            });
        }
  }
// const AddClinic = async (e) => {
//     e.preventDefault();
//     if( !address || !password ){
//         alert("Address or Password cannot be empty!")
//     } else {
//         const loginInfoStoreAddress = '0x3103d612bF2403bE255d6F69612616991408831E'
//         let txCount = await web3.eth.getTransactionCount(address)
//         const txObject = {
//             nonce:    web3.utils.toHex(txCount),
//             to:       loginInfoStoreAddress,
//             gasLimit: web3.utils.toHex(100000),
//             data: web3.utils.utf8ToHex(JSON.stringify({ ClinicName: name,
//                                                         Address: address,
//                                                         Location: location,
//                                                         Password: password}))
//         }
//         let res = await web3.eth.accounts.signTransaction(txObject, privateKey)
//         let txObj = await web3.eth.sendSignedTransaction(res.rawTransaction)
//         let txHash = txObj.transactionHash
//         let blockNumber = txObj.blockNumber
    
//         return [txHash, blockNumber]
//     }
// }


    return (
        <div>
            <h1 className='text-center fw-bolder'>Clinic Registration Portal</h1>
            <form className="form-control form-control-lg" onSubmit={AddClinic}>
                <div className="form-group">
                    <label className="form-label fs-2">Enter Clinic Address</label>
                    <input type="address" className="form-control fs-2" value={address} 
                        onChange={event => setAddress(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Enter Clinic Name</label>
                    <input type="text" className="form-control fs-2" value={name} 
                        onChange={event => setName(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Enter Clinic Location</label>
                    <input type="text" className="form-control fs-2" value={location} 
                        onChange={event => setLocation(event.target.value)} required/>
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Password</label>
                    <input type="password" className="form-control fs-2" value={password} 
                           onChange={event => setPassword(event.target.value)} required />
                </div>
                <p>&nbsp;</p>
                <div className="form-group">
                    <label className="form-label fs-2">Private Key(For signing transaction)</label>
                    <input type="password" className="form-control fs-2" value={privateKey} 
                           onChange={event => setPrivateKey(event.target.value)} required />
                </div>
                <div className="d-grid gap-2">
                  <p>&nbsp;</p>
                  <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2">Register</button>
                </div>
            </form>
            <p>&nbsp;</p>
            { register ? (
                            <p className="text-success text-center fs-3">Clinic Registered Successfully</p>
                         ) : (
                            <p className="text-danger text-center fs-3">Clinic Not Registered</p>
                         )
            }
        </div>
    )
}

