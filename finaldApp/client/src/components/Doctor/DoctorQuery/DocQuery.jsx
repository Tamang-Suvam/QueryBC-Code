import React, { useState }from 'react'
import { Form, Button, Table, Container, Card, InputGroup} from "react-bootstrap"
import { ValidateQuery } from '../../../ValidateQuery'
import { FaIdCard } from "react-icons/fa"
import './docQuery.css'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer';
import CryptoJS from 'crypto-js'

const DocQuery = ({contract}) => {
    const [query, setQuery] = useState([])
    const [patientArray, setPatientArray] = useState([])
    const [groupByArray, setGroupByArray] = useState([])
    const [grpBy, setGroupBy] = useState("")

    const [selectValue, setSelectValue] = useState('');
    const [fromValue, setFromValue] = useState('');
    const [whereValue, setWhereValue] = useState('');
    const [andValue, setAndValue] = useState('');
    const [groupByValue, setGroupByValue] = useState('');

    const [cid, setCID] = useState("");

    const client = create(new URL('http://127.0.0.1:5001/api/v0'))

    // const [resTime, setresTime] = useState(0)
    // const [file, setFile] = useState(null)
    // const [privateKey, setPrivateKey] = useState(" ")

    const customFont = {
        fontFamily: 'Montserrat',
    };

    // const captureFile = (event) => {
    //     event.preventDefault()
    //     const _file = event.target.files[0]
    //     setFile(_file)
    // }

    const cardStyle = {
      background: 'linear-gradient(to bottom right, #808080 0%, #FFFFFF 100%)',
      padding: '20px',
      color: '#fff',
    }

    const handleSubmitForm = async (event) => {
      event.preventDefault();
  
      if(groupByValue === "") {
        if(fromValue === 'Patients') {
            if(whereValue !== '' && andValue === '') {
              let patients = await contract.methods.getRegisteredPatientsRecordsByID(whereValue).call()
                if(patients.length === 0) {
                  alert("No patients to display!")
                } else {                
                  setPatientArray(patients)
                }
            } else if(whereValue !== '' && andValue !== '') {
              // const dateAdded = new Date(andValue + '-01-01' + ' ' + '00:00:00')
              const dateAdded = new Date(andValue + '-01-01 00:00:00')
              const time = Math.floor(dateAdded.getTime() / 1000)
              let patients = await contract.methods.getPatientRecordsFromSpecificDate(whereValue, time).call()
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
        let result = await contract.methods.groupByClause(whereValue).call()
        setGroupByArray(result)
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      // let startTime = 0, endTime = 0, seconds = 0
      // let time = 0
      const [select, from, where_1, where_2, where_3, and_1, and_2, and_3, groupBy] = ValidateQuery(query)
      setGroupBy(groupBy)
      
      // console.log("select" + select + ',' + "from" + from + ',' + "where_1" + where_1 + ',' + "where_2" + where_2 + ',' + "where_3" + where_3 + ',' + "and_1" + and_1 + "and_2" + and_2 + " "+ "and_3" + and_3 + "groupBy" + groupBy)
      if(groupBy === ' ') {
        if(from[0] === 'PATIENTS') {
          if(select[0] === '*') {
            if(where_1 === 'DEPARTMENT' && where_2 === '=') {
              alert("You don't have permission to fire this query!")
            } else if(where_1 === 'PATIENT-ID' && where_2 === '=' && and_1 === ' ') {
              // // Injecting the code for the cache layer here
              // let data = getItemFromCache(query)
              // startTime = performance.now()
              // if(data === null) {
              //   let patients = await contract.methods.getRegisteredPatientsRecordsByID(where_2).call()
              //   if(patients.length === 0) {
              //     alert("No patients to display!")
              //   } else {                
              //     setPatientArray(patients)
              //     const expirationDate = new Date().getTime() + 300000; // setting an expiration time of 5 minutes for every item in the cache
              //     localStorage.setItem(query, JSON.stringify({ data: patients, expires: expirationDate }));
              //     cache.put(query, patients);
              //   }
              // } else {
              //   setPatientArray(data)
              // }
              // endTime = performance.now()
              
              // seconds = (endTime - startTime)
              // time += seconds
                let patients = await contract.methods.getRegisteredPatientsRecordsByID(where_3).call()
                if(patients.length === 0) {
                  alert("No patients to display!")
                } else {                
                  setPatientArray(patients)
                }
            } else if(where_1 === 'PATIENT-ID' && where_2 === '=' && and_1 === 'DATE-ADDED' && and_2 === '>=') {
              // const dateAdded = new Date(and_3 + '-01-01' + ' ' + '00:00:00')
              const dateAdded = new Date(and_3 + '-01-01 00:00:00')
              // console.log(dateAdded.getTime())
              // console.log(dateAdded.getFullYear())
              // console.log(Math.floor(dateAdded.getTime() / 1000))
              const time = Math.floor(dateAdded.getTime() / 1000)
              let patients = await contract.methods.getPatientRecordsFromSpecificDate(where_3, time).call()
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
      } else {  // Here handling the groupBy clause
        let result = await contract.methods.groupByClause(where_3).call()
        console.log(result)
        setGroupByArray(result)
      }
    }

    const handleDecrypt = async (e) => {
      e.preventDefault()
      const decryptionKey = 'my-secret-key'
      const decryptedFile = client.cat(cid)

      // let data = ''
      const chunks = [];
      for await (const chunk of decryptedFile) {
        // data += chunk.toString();
        chunks.push(chunk);
      }
      const data = Buffer.concat(chunks);
      // console.log(data.toString())

      const decryptedData = CryptoJS.AES.decrypt(data.toString(), decryptionKey).toString(CryptoJS.enc.Utf8);
      const jsonData = JSON.parse(decryptedData);
      // console.log(jsonData)
      downloadJsonFile(jsonData)
    }

    const downloadJsonFile = (data) => {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <>
      {/* <Form>
          <Form.Group controlId="formBasicName" className='mb-2'>
          <InputGroup>
          <InputGroup.Text className="inputgroup-text"><FaIdCard/></InputGroup.Text>
          <Form.Control type="text" placeholder="Enter CID of the file to decrypt" className="form-control-lg" 
                          onChange={(e) => setCID(e.target.value)}/>
          </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" block className="btn-lg mb-3"
                  onClick={handleSubmit}>
          Submit for Decrypt
          </Button>
      </Form> */}
        <Container className="containerStyles1" fluid>

        <Form>
          <Form.Group controlId="formBasicName" className='mb-2'>
          <InputGroup>
          <InputGroup.Text className="inputgroup-text"><FaIdCard/></InputGroup.Text>
          <Form.Control type="text" placeholder="Enter CID of the file to decrypt" className="form-control-lg" 
                          onChange={(e) => setCID(e.target.value)}/>
          </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" block className="btn-lg mb-3"
                  onClick={handleDecrypt}>
          Decrypt and Download
          </Button>
      </Form>


            <Card style={cardStyle}>
            <Card.Header>SQL Query</Card.Header>
            <Card.Body>
                  <Form onSubmit={handleSubmitForm}>
                  <Form.Group controlId="select">
                    <Form.Label>Select</Form.Label>
                    <Form.Control as="select" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                      <option value="">--Select--</option>
                      <option value="*">*</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="from">
                    <Form.Label>From</Form.Label>
                    <Form.Control as="select" value={fromValue} onChange={(e) => setFromValue(e.target.value)}>
                      <option value="">--From--</option>
                      <option value="Patients">Patients</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="where">
                    <Form.Label>Where PatientID = </Form.Label>
                    <Form.Control type="text" placeholder="Enter where condition" value={whereValue} onChange={(e) => setWhereValue(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="and">
                    <Form.Label>and Date-Added &#x2265; </Form.Label>
                    <Form.Control type="text" placeholder="Enter and condition" value={andValue} onChange={(e) => setAndValue(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="groupBy">
                    <Form.Label>GroupBy</Form.Label>
                    <Form.Control as="select" value={groupByValue} onChange={(e) => setGroupByValue(e.target.value)}>
                      <option value="">--GroupBy--</option>
                      <option value="Doctors">Doctors</option>
                    </Form.Control>
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button className="mt-2" size="lg" variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
            </Card.Body>
            </Card>

            <h3 className='text-center fw-bolder mt-3' style={customFont}>Enter Query Below</h3>
            &nbsp; 
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSQLQuery">
                <Form.Label style={customFont} className="fs-3">SQL Query</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                // value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
            </Form.Group>
            <div className="d-grid gap-2">
                <Button className="mt-2" size="lg" variant="primary" type="submit">
                Submit
                </Button>
            </div>
            </Form>
            &nbsp;
            { query.length !== 0 ?
                (grpBy === " " ? (
                patientArray.length === 0 ? <h5 className='text-center text-danger'>No Patient Record Found!</h5> :
                <Table striped bordered hover responsive size="sm" className="tableStyles1" variant='dark'>
                    <thead className="table-primary">
                    <tr>
                    <th className='text-center'>S.No.</th>
                    <th className='text-center'>DoctorID</th>
                    <th className='text-center'>DoctorName</th>
                    <th className='text-center'>Symptom</th>
                    <th className='text-center'>Diagnostic</th>
                    <th className='text-center'>Department</th>
                    <th className='text-center'>IPFS CID</th>
                    <th className='text-center'>Time</th>
                    </tr>
                </thead>
                {patientArray.map((val, index) => {
                    const date = new Date(val.timeAdded * 1000);
                    // console.log(val.timeAdded)
                    return (
                    <tbody>
                    <tr key={index}>
                        <td className='text-center'>{index + 1}</td>
                        <td className='text-center'>{val.doctorId}</td>
                        <td className='text-center'>{val.doctorName}</td>
                        <td className='text-center'>{val.symptoms}</td>
                        <td className='text-center'>{val.diagnostic}</td>
                        <td className='text-center'>{val.department}</td>
                        <td className='text-center'>{val.cid}</td>
                        <td className='text-center'>{date.toLocaleString()}</td>
                    </tr>
                    </tbody>
                    )
                })}
                </Table>
                ) : 
                groupByArray.length === 0 ? " ":
                <Table striped bordered hover responsive size="sm" className="tableStyles" variant='dark'>
                    <thead className="table-warning">
                        <tr>
                        <th className='text-center'>S.No.</th>
                        <th className='text-center'>Count</th>
                        <th className='text-center'>DoctorID</th>
                        </tr>
                    </thead>
                    {groupByArray.map((val, index) => {
                        return (
                        <tbody>
                        <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{val.count}</td>
                            <td className='text-center'>{val.doctorName}</td>
                        </tr>
                        </tbody>
                        )
                    })}
                </Table>
                ) : 
                (
                  groupByValue === '' ? (
                    patientArray.length === 0 ? <h5 className='text-center text-danger'>No Patient Record Found!</h5> :
                    <Table striped bordered hover responsive size="sm" className="tableStyles1" variant='dark'>
                        <thead className="table-primary">
                        <tr>
                        <th className='text-center'>S.No.</th>
                        <th className='text-center'>DoctorID</th>
                        <th className='text-center'>DoctorName</th>
                        <th className='text-center'>Symptom</th>
                        <th className='text-center'>Diagnostic</th>
                        <th className='text-center'>Department</th>
                        <th className='text-center'>IPFS CID</th>
                        <th className='text-center'>Time</th>
                        </tr>
                    </thead>
                    {patientArray.map((val, index) => {
                        const date = new Date(val.timeAdded * 1000);
                        // console.log(val.timeAdded)
                        return (
                        <tbody>
                        <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{val.doctorId}</td>
                            <td className='text-center'>{val.doctorName}</td>
                            <td className='text-center'>{val.symptoms}</td>
                            <td className='text-center'>{val.diagnostic}</td>
                            <td className='text-center'>{val.department}</td>
                            <td className='text-center'>{val.cid}</td>
                            <td className='text-center'>{date.toLocaleString()}</td>
                        </tr>
                        </tbody>
                        )
                    })}
                    </Table>
                    ) : 
                    groupByArray.length === 0 ? " ":
                    <Table striped bordered hover responsive size="sm" className="tableStyles" variant='dark'>
                        <thead className="table-warning">
                            <tr>
                            <th className='text-center'>S.No.</th>
                            <th className='text-center'>Count</th>
                            <th className='text-center'>DoctorID</th>
                            </tr>
                        </thead>
                        {groupByArray.map((val, index) => {
                            return (
                            <tbody>
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{val.count}</td>
                                <td className='text-center'>{val.doctorName}</td>
                            </tr>
                            </tbody>
                            )
                        })}
                    </Table>
                )
        }
        </Container>
        </>
    )
}

export default DocQuery
