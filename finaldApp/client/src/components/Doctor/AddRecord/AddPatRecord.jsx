import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, InputGroup, Alert, Card, OverlayTrigger, Tooltip} from 'react-bootstrap'
import './addRecord.css'
import qehr from '../../../assets/QEHRs.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FaEnvelope, FaUser, FaIdCard ,FaAddressBook, FaSadCry, FaPrescription } from "react-icons/fa"
// import { BsCloudUpload } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client'
import { Web3Storage } from 'web3.storage'
import CryptoJS from 'crypto-js'
// import * as driver from 'bigchaindb-driver';
// import * as bip39 from 'bip39';

let conn;
global.Buffer = global.Buffer || require('buffer').Buffer;

const AddPatRecord = ({contract, account}) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const doctorName = searchParams.get('param1');
    const doctorID = searchParams.get('param2');

    const [isCopied, setIsCopied] = useState(false);

    const [patientName, setpatientName] = useState('');
    const [patientID, setpatientID] = useState('');
    const [cid, setCID] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnostic, setDiagnostic] = useState('');
    const [department, setDepartment] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showFailureAlert, setShowFailureAlert] = useState(false)

    const [buffer, setBuffer] = useState(null);
    const [file, setFile] = useState(null)
    const [ipfsCID, setIpfsCID] = useState(null);
    const client = create(new URL('http://127.0.0.1:5001/api/v0'))

    // const makeStorageClient = () => {
    //     return new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFCMEUwZTNkNTA2N2Y5QjM1Y2E1RjMzNzUxOTFjQWRlYUIxMDJlM0IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODEwMTc4NTMzNTQsIm5hbWUiOiJkQXBwIn0.l49-iUFwKU3PSSpzf6e-VGlKLARe1NgQSkHioWyXjAw' })
    // }

    const captureFile = (event) => {
        event.preventDefault()
        const _file = event.target.files[0]
        // console.log(_file)
        setFile(_file)
        // // const file = event.target.files[0]
        // // const reader = new window.FileReader()
        // const reader = new FileReader();
        // reader.readAsArrayBuffer(_file)
        // reader.onloadend = () => {
        //   setBuffer(Buffer(reader.result))
        // }
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContents = event.target.result;
            setFile(fileContents)
            // Do something with the file contents here
        };
        reader.readAsText(_file);
    }
    
//     const onSubmit = async (event) => {
//         event.preventDefault()

//         // // const client = new Web3Storage({ token: process.env.REACT_APP_WEBSTORAGE_TOKEN })
//         const client = makeStorageClient()
//         const patientData = JSON.parse(file)
//         const encryptionKey = 'my-secret-key'
//         const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(patientData), encryptionKey).toString()
//         const bufferData = Buffer.from(encryptedData)
//         const files = [
//             new File([bufferData], file.name),
//         ]
//         const cid = await client.put(files)
//         .catch((error) => {
//              console.error('Failed to add file to IPFS:', error);
//         })
//         // // console.log(client)
//         // // console.log(file)
//         // const files = [
//         //     new File([file], file.name),
//         // ]
//         // // const cid = await client.put(files)
//         // // console.log('stored files with cid:', cid)
//         // client.add(buffer)
//         // .then( cid => {
//         //     setIpfsCID(cid.path)
//         // })
//         // .catch( error => {
//         //     alert("Error Uploading File! Did you select file to be uploaded?")
//         // })        
//         // console.log(cid) 
//         const res = await client.get(cid)
//         const files1 = await res.files()
//         console.log(files1[0])
// //   for (const file of files1) {
// //     console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
// //   }
// //         console.log(res)
//         const decryptedData = CryptoJS.AES.decrypt(files1[0].toString(), encryptionKey).toString(CryptoJS.enc.Utf8);
//         const jsonData = JSON.parse(decryptedData);
//         console.log(jsonData)
//     }

    const onSubmit = async (e) => {
        e.preventDefault()
        const patientData = JSON.parse(file)
        
        const encryptionKey = 'my-secret-key'
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(patientData), encryptionKey).toString()
        const bufferData = Buffer.from(encryptedData)
        const cid = await client.add(bufferData)
        .catch((error) => {
            console.error('Failed to add file to IPFS:', error);
        })
        // console.log(cid.path)
        setIpfsCID(cid.path)
        // const decryptedData = CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(CryptoJS.enc.Utf8);
        // const jsonData = JSON.parse(decryptedData);
        // console.log(jsonData)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(ipfsCID);
        setIsCopied(true);
    };

    const renderCopyTooltip = (props) => (
        <Tooltip {...props}>{isCopied ? 'Copied!' : 'Copy to clipboard'}</Tooltip>
    );

    // // creates a connection to BDB server
    // const _getConnection = async (e) => {
    //     if (!conn) {
    //         conn = new driver.Connection("http://localhost:9984/api/v1/");
    //     }
    // }

    // // Post transaction to BigchainDB
    // const postTransaction = async (cid, patientID, patientName, doctorID, doctorName, symptoms, diagnosis, timeAdded) => {
    //     await _getConnection();

    //     const seed = bip39.mnemonicToSeedSync('SaiRam').slice(0,32)
    //     const keyPair = new driver.Ed25519Keypair(seed)

    //     const condition = driver.Transaction.makeEd25519Condition(keyPair.publicKey, true);

    //     const output = driver.Transaction.makeOutput(condition);
    //     output.public_keys = [keyPair.publicKey];

    //     // define asset and metadata
    //     const asset = {
    //         'CID': cid,
    //         'Patient ID': patientID,
    //         'Patient Name': patientName,
    //         'Doctor ID': doctorID,
    //         'Doctor Name': doctorName,
    //         'Symptoms': symptoms,
    //         'Diagnosis': diagnosis,
    //         'Department': department,
    //         'Time Added': timeAdded
    //     };
    //     const metadata = {
    //         'bc_data': 'Added Record to bcDB'
    //     };

    //     const transaction = driver.Transaction.makeCreateTransaction(
    //         asset,
    //         metadata,
    //         [output],
    //         keyPair.publicKey
    //     );

    //     const txSigned = driver.Transaction.signTransaction(transaction, keyPair.privateKey);

    //     try {
    //         let tx = await conn.postTransaction(txSigned)
    //         alert("transaction hash: "+tx.id)
    //         return tx
    //     } catch (error) {
    //         console.error(error);
    //         return false
    //     }
    // }

    const AddRecord = async (e) => {
        e.preventDefault();
        // // await contract.methods.doctorAddRecord(cid, patientID, patientName, doctorName, doctorID, symptoms, diagnostic, department).send({from: account})
        await contract.methods.doctorAddRecord(cid, patientID, patientName, doctorName, doctorID, symptoms, diagnostic, department).send({from: account})
        contract.getPastEvents('RecordAdded', { fromBlock: 'latest', toBlock: 'latest' }, async function(error, event){ 
        if(event){
            setShowSuccessAlert(true);
            setShowFailureAlert(false);
            // postTransaction(
            //     event[0].returnValues._cid,
            //     event[0].returnValues._patientId,
            //     event[0].returnValues._patientName,
            //     event[0].returnValues._doctorId,
            //     event[0].returnValues._doctorName,
            //     event[0].returnValues.symptoms,
            //     event[0].returnValues.diagnostic,
            //     event[0].returnValues.department,
            //     Date(event[0].returnValues.timeAdded),
            // )
        }
        if(error) {
            setShowSuccessAlert(false);
            setShowFailureAlert(true);
        }
        }) 
    }
    return (
        <div className="add-record-page gradient-background1">
            <Container>
            <Row className="justify-content-center align-items-center">
                <Col sm={6} md={6} lg={5} xl={4} className="add-record-form1">
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className='h4'>Choose a file</Form.Label>
                            <Form.Control type="file" className="form-control" onChange={captureFile} />
                        </Form.Group>

                        <Button variant="primary" type="submit" block className="btn-lg mb-3" onClick={onSubmit}>
                            Submit
                        </Button>
                    </Form>
                    {ipfsCID === null ? (
                        <p className='text-danger text-center'>No CID</p>
                    ) : (
                        <Card className="text-center mb-3" bg='transparent'>
                            <Card.Body>
                            <Card.Text className='text-white'>{ipfsCID}</Card.Text>
                            <OverlayTrigger placement="top" overlay={renderCopyTooltip}>
                                <Button variant="primary" className="me-2" onClick={handleCopy}>
                                    <FontAwesomeIcon icon={faCopy} />
                                </Button>
                            </OverlayTrigger>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
                <Col sm={6} md={6} lg={5} xl={4} className="add-record-form">
                <div className="brand mt-2">
                    <img src={qehr} alt="logo" />
                </div>
                <h4 className="mb-4">Add Patient Record to QEHRs</h4>
                    {/* <Form>
                        <Form.File custom className="upload-button">
                            <Form.File.Input onChange={captureFile}/> 
                            <Form.File.Label><BsCloudUpload /> Upload File</Form.File.Label>
                            <Form.Control type="file" className="form-control fs-2" onChange={captureFile} />
                            <Button variant="primary" className="submit-button" type="submit">Submit</Button>
                        </Form.File>
                        {
                            ipfsCID === null ? '' : <h1 className='fs-2 text-center text-success'>CID of the document: {ipfsCID}</h1>
                        }
                    </Form> */}
                <Form>

                    <Form.Group controlId="formBasicName" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaIdCard/></InputGroup.Text>
                    <Form.Control type="text" placeholder="CID" className="form-control-lg" 
                                    onChange={(e) => setCID(e.target.value)}/>
                    </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicName" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaUser/></InputGroup.Text>
                    <Form.Control type="text" placeholder="Patient Name" className="form-control-lg" 
                                    onChange={(e) => setpatientName(e.target.value)}/>
                    </InputGroup>
                    </Form.Group>
    
                    <Form.Group controlId="formBasicEmail" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaEnvelope/></InputGroup.Text>
                    <Form.Control type="text" placeholder="Patient Metamask Address" className="form-control-lg"
                                    onChange={(e) => setpatientID(e.target.value)}/>
                    </InputGroup>
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicName" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaUser/></InputGroup.Text>
                    <Form.Control type="text" placeholder="Doctor Name" className="form-control-lg" 
                                    onChange={(e) => setdoctorName(e.target.value)}/>
                    </InputGroup>
                    </Form.Group> */}
    
                    {/* <Form.Group controlId="formBasicEmail" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaEnvelope/></InputGroup.Text>
                    <Form.Control type="text" placeholder="Doctor Metamask Address" className="form-control-lg"
                                    onChange={(e) => setdoctorID(e.target.value)}/>
                    </InputGroup>
                    </Form.Group> */}

                    <Form.Group controlId="formBasicName" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaSadCry/></InputGroup.Text>
                    <Form.Control type="text" placeholder="Symptoms" className="form-control-lg" 
                                    onChange={(e) => setSymptoms(e.target.value)}/>
                    </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicName" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaPrescription/></InputGroup.Text>
                    <Form.Control type="text" placeholder="Diagnosis" className="form-control-lg" 
                                    onChange={(e) => setDiagnostic(e.target.value)}/>
                    </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress" className='mb-2'>
                    <InputGroup>
                    <InputGroup.Text className="inputgroup-text"><FaAddressBook/></InputGroup.Text>
                    <Form.Control type="text" placeholder="Department" className="form-control-lg"
                                    onChange={(e) => setDepartment(e.target.value)}/>
                    </InputGroup>
                    </Form.Group>
    
                    <Button variant="primary" type="submit" block className="btn-lg mb-3"
                            onClick={AddRecord}>
                    Add Record
                    </Button>
    
                    {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Patient Record successfully Added!
                    </Alert>
                    )}
                    {showFailureAlert && (
                    <Alert variant="danger" onClose={() => setShowFailureAlert(false)} dismissible>
                        Patient Record adding failed!
                    </Alert>
                    )}
                </Form>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default AddPatRecord
