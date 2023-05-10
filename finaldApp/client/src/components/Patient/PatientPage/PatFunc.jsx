import React, { useState  } from "react"
import { Form, Button, Table, Container, Card, Row, Col } from "react-bootstrap"
import { ValidateQuery } from "../../../ValidateQuery"
import './patFunc.css'

const PatFunc = ({clinicContract, doctorContract, patientContract}) => {
  const [query, setQuery] = useState([])
  const [doctorsArray, setDoctorsArray] = useState([])
  const [clinicsArray, setClinicsArray] = useState([])
  const [fromParameters, setFromParameters] = useState([])
  
  const [select1Value, setSelect1Value] = useState('');
  const [from1Value, setFrom1Value] = useState('');
  const [where1Value, setWhere1Value] = useState('');

  const [select2Value, setSelect2Value] = useState('');
  const [from2Value, setFrom2Value] = useState('');
  const [where2Value, setWhere2Value] = useState('');

  const [andValue, setAndValue] = useState('');

  // const [file, setFile] = useState(null)
  // const [resTime, setresTime] = useState(0)
  // const [privateKey, setPrivateKey] = useState(" ")
  
  /////////////////////////////// Reading from a file of queries//////////////////////////////////////////////////////////
  // const captureFile = (event) => {
  //   event.preventDefault()
  //   const _file = event.target.files[0]
  //   setFile(_file)
  // }

  const cardStyle = {
    color: 'white'
  }

  const customFont = {
        fontFamily: 'Montserrat',
  };

//   const handleSubmit = async (event) => {
//   event.preventDefault();
//   let startTime = 0, endTime = 0, seconds = 0
//   let time = 0

//   const reader = new FileReader()
//   reader.onload = async (e) => { 
//     const text = (e.target.result)
//       var queries = text.split(/\r\n|\n/);
//       for(let query = 0; query < queries.length - 1; query++){
//         const [select, from, where_1, where_2 ] = ValidateQuery(queries[query])
//         if(from === 'PATIENTS') {
//           if(select === '*') {
//             if(where_1 === 'DEPARTMENT') {
//               alert("You don't have permission to fire this query!")
//             } else if(where_1 === 'PATIENT-ID') {

//               // Injecting the code for the cache layer here
//               let data = getItemFromCache(query)
//               startTime = performance.now()
//               if(data === null) {
//                 let patients = await contract.methods.getRegisteredPatientsRecordsByID(where_2).call()
//                 if(patients.length === 0) {
//                   alert("No patients to display!")
//                 } else {                
//                   setPatientArray(patients)
//                   const expirationDate = new Date().getTime() + 300000; // setting an expiration time of 5 minutes for every item in the cache
//                   localStorage.setItem(query, JSON.stringify({ data: patients, expires: expirationDate }));
//                   cache.put(query, patients);
//                 }
//               } else {
//                 setPatientArray(data)
//               }
//               endTime = performance.now()
              
//               seconds = (endTime - startTime)
//               time += seconds
//             } else {
//               alert("You don't have permission to fire this query!")
//             }
//           }
//         } else {
//           alert("Invalid SQL Query!")
//         }
//       }
//       setresTime(time)
//   };
//   reader.readAsText(file)
// }


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

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    // console.log(selectValue + ' ' + fromValue + ' ' + whereValue)
    if(from2Value === 'Clinics') {
        if(where2Value !== '') {
          let clinics = await clinicContract.methods.getRegisteredClinicsByLocation(where2Value.toUpperCase()).call()
          if(clinics.length === 0) {
            alert("Sorry! No clinics found")
          } else {
            setClinicsArray(clinics)
            // console.log(clinics)
          }
        } else if(where2Value === '') {
            let clinics = await clinicContract.methods.getRegisteredClinics().call()
            console.log(clinics)
            if(clinics.length === 0) {
            alert("Sorry! No clinics found")
            } else {
            setClinicsArray(clinics)
            // console.log(clinics)
            }
        } else {
          alert("Invalid SQL query!")
        }
    } else if(from1Value === 'Doctors') {
          if(where1Value !== '' && andValue === '') {
            let doctors = await doctorContract.methods.getRegisteredDoctorsByClinicName(where1Value.toUpperCase()).call()
            if(doctors.length === 0) {
              alert("Sorry! No doctors found")
            } else {
              setDoctorsArray(doctors)
            }
          } else if(where1Value !== '' && andValue !== '=') {
            let doctors = await doctorContract.methods.getRegisteredDoctorsByClinicNameAndDepartment(where1Value.toUpperCase(),
                          andValue.toUpperCase()).call()
            if(doctors.length === 0) {
              alert("Sorry! No doctors found")
            } else {
              setDoctorsArray(doctors)
            }
          } else {
            alert("Invalid SQL query!")
          }
      } else {
      alert("Invalid SQL Query!")
    } 
  };

    const handleSubmit = async (event) => {
      event.preventDefault();
      // let startTime = 0, endTime = 0, seconds = 0
      // let time = 0
      const [select, from, where_1, where_2, where_3, and_1, and_2, and_3, groupBy] = ValidateQuery(query)
      setFromParameters(from)
      // console.log("select" + select + ',' + "from" + from + ',' + "where_1" + where_1 + ',' + "where_2" + where_2 + "where_3" + where_3 + ',' + "groupBy" + groupBy)
        
        if(from[0] === 'CLINICS') {
          if(select[0] === '*') {
            if(where_1 === 'LOCATION' && where_2 === '=') {
              let clinics = await clinicContract.methods.getRegisteredClinicsByLocation(where_3.toUpperCase()).call()
              if(clinics.length === 0) {
                alert("Sorry! No clinics found")
              } else {
                setClinicsArray(clinics)
                // console.log(clinics)
              }
            } else if(where_1 === ' ') {
                let clinics = await clinicContract.methods.getRegisteredClinics().call()
                console.log(clinics)
                if(clinics.length === 0) {
                alert("Sorry! No clinics found")
                } else {
                setClinicsArray(clinics)
                // console.log(clinics)
                }
            } else {
              alert("Invalid SQL query!")
            }
          }
        } else if(from[0] === 'DOCTORS') {
            if(select[0] === '*') {
              if(where_1 === 'CLINIC-NAME' && where_2 === '=' && and_1 === ' ') {
                let doctors = await doctorContract.methods.getRegisteredDoctorsByClinicName(where_3.toUpperCase()).call()
                if(doctors.length === 0) {
                  alert("Sorry! No doctors found")
                } else {
                  setDoctorsArray(doctors)
                //   console.log(doctors)
                }
              } else if(where_1 === 'CLINIC-NAME' && where_2 === '=' && and_1 === 'DEPARTMENT' && and_2 === '=') {
                let doctors = await doctorContract.methods.getRegisteredDoctorsByClinicNameAndDepartment(where_3.toUpperCase(),
                              and_3.toUpperCase()).call()
                if(doctors.length === 0) {
                  alert("Sorry! No doctors found")
                } else {
                  setDoctorsArray(doctors)
                //   console.log(doctors)
                }
              // } else if(where_1 === ' ' && and_1 === ' ') {
              //   console.log("Here")
              //     let doctors = await doctorContract.methods.getRegisteredDoctors().call()
              //     if(doctors.length === 0) {
              //     alert("Sorry! No doctors found")
              //     } else {
              //     setDoctorsArray(doctors)
              //   //   console.log(doctors)
              //     }
              } else {
                alert("Invalid SQL query!")
              }
            }
          } else {
          alert("Invalid SQL Query!")
        } 
    }
    
    return (
      <Container className="containerStyles2" fluid>
            {/* <Card style={cardStyle}>
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
                      <option value="Doctors">Doctors</option>
                      <option value="Clinics">Clinics</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="where">
                    <Form.Label>Where location = </Form.Label>
                    <Form.Control type="text" placeholder="Enter where condition" value={whereValue} onChange={(e) => setWhereValue(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="and">
                    <Form.Label>and Department = </Form.Label>
                    <Form.Control type="text" placeholder="Enter and condition" value={andValue} onChange={(e) => setAndValue(e.target.value)} />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button className="mt-2" size="lg" variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
            </Card.Body>
            </Card> */}
            <Row>
              <Col md={6}>
                <Card style={cardStyle} bg="transparent">
                <Card.Header>Find Doctors</Card.Header>
                    <Card.Body>
                        <Form>
                        <Form.Group controlId="select1">
                          <Form.Label>Select</Form.Label>
                          <Form.Control as="select" onChange={(e) => setSelect1Value(e.target.value)}>
                            <option value="">--Select--</option>
                            <option value="*">*</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="from1">
                          <Form.Label>From</Form.Label>
                          <Form.Control as="select" onChange={(e) => setFrom1Value(e.target.value)}>
                            <option value="">--From--</option>
                            <option value="Doctors">Doctors</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="where1">
                          <Form.Label>Where Clinic Name = </Form.Label>
                          <Form.Control type="text" placeholder="Enter where condition" onChange={(e) => setWhere1Value(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="and">
                          <Form.Label>and Department = </Form.Label>
                          <Form.Control type="text" placeholder="Enter and condition" onChange={(e) => setAndValue(e.target.value)} />
                        </Form.Group>
                      </Form>
                      <div className="d-grid gap-2">
                        <Button className="mt-2" size="lg" variant="primary" type="submit" onClick={handleSubmitForm}>
                          Submit
                        </Button>
                      </div>
                   </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card style={cardStyle} bg='transparent'>
                <Card.Header>Find Clinics</Card.Header>
                    <Card.Body>
                        <Form>
                        <Form.Group controlId="select2">
                          <Form.Label>Select</Form.Label>
                          <Form.Control as="select"  onChange={(e) => setSelect2Value(e.target.value)}>
                            <option value="">--Select--</option>
                            <option value="*">*</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="from2">
                          <Form.Label>From</Form.Label>
                          <Form.Control as="select" onChange={(e) => setFrom2Value(e.target.value)}>
                            <option value="">--From--</option>
                            <option value="Clinics">Clinics</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="where2">
                          <Form.Label>Where location = </Form.Label>
                          <Form.Control type="text" placeholder="Enter where condition" onChange={(e) => setWhere2Value(e.target.value)} />
                        </Form.Group>
                      </Form>
                      <div className="d-grid gap-2">
                        <Button className="mt-2" size="lg" variant="primary" type="submit" onClick={handleSubmitForm}>
                          Submit
                        </Button>
                      </div>
                   </Card.Body>
                </Card>
              </Col>
              {/* <div className="d-grid gap-2">
                <Button className="mt-2" size="lg" variant="primary" type="submit" onClick={handleSubmitForm}>
                  Submit
                </Button>
              </div> */}
            </Row>
            <h3 className='text-center fw-bolder mt-3' style={customFont}>Enter Query Below</h3>
            &nbsp; 
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSQLQuery">
                <Form.Label style={customFont} className="fs-3">SQL Query</Form.Label>
                <Form.Control
                as="textarea"
                rows={2}
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
            {
            query.length !== 0 ?
            
            (fromParameters.length === 1 && fromParameters[0] === 'CLINICS' ? (
                clinicsArray.length === 0 ? <h5 className='text-center text-danger'>No Clinic Record Found!</h5> :
                <Table striped bordered hover responsive size="sm" className="tableStyles2" variant="dark">
                  <thead className="table-danger">
                    <tr>
                     <th className='text-center'>S.No.</th>
                     <th className='text-center'>Clinic Name</th>
                     <th className='text-center'>Address</th>
                     <th className='text-center'>Location</th>
                   </tr>
                 </thead>
                 {clinicsArray.map((val, index) => {
                  //  const date = new Date(val.timeAdded * 1000);
                   return (
                     <tbody>
                     <tr key={index}>
                       <td className='text-center'>{index + 1}</td>
                       <td className='text-center'>{val.name}</td>
                       <td className='text-center'>{val.id}</td>
                       <td className='text-center'>{val.location}</td>
                     </tr>
                     </tbody>
                   )
                 })}
               </Table>
             ): fromParameters.length === 1 && fromParameters[0] === 'DOCTORS' ? (
                doctorsArray.length === 0 ? <h5 className='text-center text-danger'>No Doctor Record Found!</h5> :
                <Table striped bordered hover responsive size="sm" className="tableStyles2" variant="dark">
                  <thead className="table-info">
                    <tr>
                     <th className='text-center'>S.No.</th>
                     <th className='text-center'>Name</th>
                     <th className='text-center'>Public ID</th>
                     <th className='text-center'>Clinic Name</th>
                     <th className='text-center'>Department</th>
                   </tr>
                 </thead>
                 {doctorsArray.map((val, index) => {
                  //  const date = new Date(val.timeAdded * 1000);
                   return (
                     <tbody>
                     <tr key={index}>
                       <td className='text-center'>{index + 1}</td>
                       <td className='text-center'>{val.name}</td>
                       <td className='text-center'>{val.id}</td>
                       <td className='text-center'>{val.clinicName}</td>
                       <td className='text-center'>{val.department}</td>
                     </tr>
                     </tbody>
                   )
                 })}
               </Table>
             ) : <p className="text-center text-danger">No Result</p>) :
             (from2Value === 'Clinics' ? (
              clinicsArray.length === 0 ? <h5 className='text-center text-danger'>No Clinic Record Found!</h5> :
              <Table striped bordered hover responsive size="sm" className="tableStyles2" variant="dark">
                <thead className="table-danger">
                  <tr>
                   <th className='text-center'>S.No.</th>
                   <th className='text-center'>Clinic Name</th>
                   <th className='text-center'>Address</th>
                   <th className='text-center'>Location</th>
                 </tr>
               </thead>
               {clinicsArray.map((val, index) => {
                //  const date = new Date(val.timeAdded * 1000);
                 return (
                   <tbody>
                   <tr key={index}>
                     <td className='text-center'>{index + 1}</td>
                     <td className='text-center'>{val.name}</td>
                     <td className='text-center'>{val.id}</td>
                     <td className='text-center'>{val.location}</td>
                   </tr>
                   </tbody>
                 )
               })}
             </Table>
           ): from1Value === 'Doctors' ? (
              doctorsArray.length === 0 ? <h5 className='text-center text-danger'>No Doctor Record Found!</h5> :
              <Table striped bordered hover responsive size="sm" className="tableStyles2" variant="dark">
                <thead className="table-info">
                  <tr>
                   <th className='text-center'>S.No.</th>
                   <th className='text-center'>Name</th>
                   <th className='text-center'>Public ID</th>
                   <th className='text-center'>Clinic Name</th>
                   <th className='text-center'>Department</th>
                 </tr>
               </thead>
               {doctorsArray.map((val, index) => {
                //  const date = new Date(val.timeAdded * 1000);
                 return (
                   <tbody>
                   <tr key={index}>
                     <td className='text-center'>{index + 1}</td>
                     <td className='text-center'>{val.name}</td>
                     <td className='text-center'>{val.id}</td>
                     <td className='text-center'>{val.clinicName}</td>
                     <td className='text-center'>{val.department}</td>
                   </tr>
                   </tbody>
                 )
               })}
             </Table>
           ) : <p className="text-center text-danger">No Result</p>)
      }
      </Container>    
    )
}

export default PatFunc
