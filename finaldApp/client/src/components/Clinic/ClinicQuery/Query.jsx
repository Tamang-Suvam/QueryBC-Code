import React, { useState  } from "react"
import { Form, Button, Table, Container, Dropdown, Card } from "react-bootstrap"
import { ValidateQuery } from "../../../ValidateQuery"
import './query.css'

// const selectOptions = ['*', 'Column1', 'Column2', 'Column3'];
// const fromOptions = ['Doctors', 'Patients', 'Doctors Natural Join Patients'];
// const whereOptions = ['Department = 1', 'Column2 = 2', 'Column3 = 3'];

export default function Query({clinicContract, doctorContract, patientContract, account}) {
  // const [selectValue, setSelectValue] = useState('*');
  // const [fromValue, setFromValue] = useState('Table1');
  // const [whereValue, setWhereValue] = useState('Column1 = 1');

  const [selectValue, setSelectValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [whereValue, setWhereValue] = useState('');


  const [query, setQuery] = useState([])
  const [doctorArray, setDoctorArray] = useState([])
  const [patientArray, setPatientArray] = useState([])
  const [naturalJoinArray, setNaturalJoinArray] = useState([])

  const [selectParameters, setSelectParameters] = useState([])
  const [fromParameters, setFromParameters] = useState([])

  const [file, setFile] = useState(null)
  const [resTime, setresTime] = useState(0)

  const customFont = {
    fontFamily: 'Montserrat',
  };

  const cardStyle = {
    background: 'linear-gradient(to bottom right, #808080 0%, #FFFFFF 100%)',
    padding: '20px',
    color: '#fff',
  };

  const captureFile = (event) => {
      event.preventDefault()
      const _file = event.target.files[0]
      setFile(_file)
  }

  // const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     var queries = query.toUpperCase().split(" ");
  //     // console.log(queries.length)
  //     // for(let query = 0; query < queries.length-1; query++){
  //         // let myArray = queries[query].split(" ")
  //         for(let i=0; i<queries.length; i++) {
  //             if(queries[i] === 'SELECT') {
  //                 selectParameter = queries[++i]
  //             } else if(queries[i] === 'FROM') {
  //                 // fromParameters = queries[++i]
  //                 setFromParameter(queries[++i])
  //             } else if(queries[i] === 'WHERE') {
  //                 whereParam1 = queries[++i]
  //                 whereParam2 = queries[++i]
  //                 whereParam3 = queries[++i]
  //             }
  //         }
          
  //     // contract.methods.getRegisteredPatients().call()
  //     //     .then( patArray => {
  //     //         if(patArray.length === 0) {
  //     //             alert("No Patient has been registered yet!")
  //     //             return
  //     //         } else {
  //     //             setPatientArray(patArray) 
  //     //         } 
  //     //     });
  //     // event.preventDefault();
  //     // let time = 0
  //     // let startTime1 = 0, startTime2 = 0, endTime1 = 0, endTime2 = 0, seconds1 = 0, seconds2 = 0
  //     // const reader = new FileReader()
  //     // reader.onload = async (e) => { 
  //     // const text = (e.target.result)
  //     //     var queries = text.split(/\r\n|\n/);
  //     //     console.log(queries.length-1)
  //     //     for(let query = 0; query < queries.length-1; query++){
  //     //     let selectParameter = ''
  //     //     let fromParameters = ''
  //     //     let whereParam1 = ''
  //     //     let whereParam2 = ''
  //     //     let whereParam3 = ''
  //     //     let queries = queries[query].split(" ")
  //     //     for(let i=0; i<queries.length; i++) {
  //     //         if(queries[i] === 'select') {
  //     //         selectParameter = queries[++i]
  //     //         } else if(queries[i] === 'from') {
  //     //         fromParameters = queries[++i]
  //     //         } else if(queries[i] === 'where') {
  //     //         whereParam1 = queries[++i]
  //     //         whereParam2 = queries[++i]
  //     //         whereParam3 = queries[++i]
  //     //         }
  //     //     }
  //         if( fromParameters === 'PATIENTS' ) {
  //             let patients = await contract.methods.getRegisteredPatients().call()
  //             if(patients.length === 0) {
  //                 alert("No Patient Found!")
  //                 return
  //             } else {
  //                 setPatientArray(patients) 
  //             } 
  //             // endTime1 = Date.now();
  //             // seconds1 = (endTime1 - startTime1) 
  //             // time += seconds1
  //             // console.log(typeof x)
  //             // contract.methods.getRecords(whereParam3).call()
  //             // .then( x => {
  //             //   console.log("here2")
  //             //   if(x.length === 0) {
  //             //     alert("No Record Found!")
  //             //     return
  //             //   } else {
  //             //     setPatResult(x) 
  //             //   } 
  //             // });
  //             // x = []
  //         }
  //         else if( fromParameters === 'DOCTORS') {
  //         //   startTime2 = performance.now();
  //           let doctors = await contract.methods.getRegisteredDoctors().call()
  //           if(doctors.length === 0) {
  //               alert("No Doctors Found!")
  //               return
  //           } else {
  //               setDoctorArray(doctors) 
  //                 // doctorArray = doctors;
  //                 // console.log(doctorArray.length)
  //           } 
  //         //   .then( x => {
  //         //     if(x.length === 0) {
  //         //       alert("No Record Found!")
  //         //       return
  //         //     } else {
  //         //       setDocResult(x) 
  //         //     }
  //         //   })
  //         //   endTime2 = performance.now();
  //         //   seconds2 = (endTime2 - startTime2) / 1000
  //         //   // console.log("Seconds2" + seconds2)
  //         //   time += seconds2
  //         } 
  //         // }
  //     //     // console.log("Total Time(Blockchain): " + time)
  //     //     setresTime(time)
  //     // };
  //     // reader.readAsText(file)
  //     // }
  // }
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if(fromValue === 'Doctors Natural Join Patients') {
      let naturalJoinResult = await clinicContract.methods.doctorNaturalJoinPatient(account).call()
      if(naturalJoinResult.length === 0) {
        alert("No result found for naturaljoin!")
      } else {
        setNaturalJoinArray(naturalJoinResult)
      }
    } else if(fromValue === 'Doctors') {
        if(whereValue !== '') {
          let doctors = await doctorContract.methods.getRegisteredDoctorsByDept(account, whereValue.toUpperCase()).call()
          if(doctors.length === 0) {
            alert("No doctors found!!")
          } else {
            setDoctorArray(doctors)
          }
        } else if(whereValue === ''){
          let doctors = await doctorContract.methods.getRegisteredDoctors(account).call()
          if(doctors.length === 0) {
            alert("No Doctors found!")
          } else {
            setDoctorArray(doctors)
          }
        } else {
          alert("Invalid statement found in place of `where clause`")
        }
    } else if(fromValue === 'Patients') {
      if(whereValue !== '') {
          let patients = await patientContract.methods.getRegisteredPatientsByDept(account, whereValue.toUpperCase()).call()
          if(patients.length === 0) {
            alert("No patient found!")
          } else {
            setPatientArray(patients)
          }
      } else if(whereValue === ''){
          let patients = await patientContract.methods.getRegisteredPatients(account).call()
          if(patients.length === 0) {
            alert("No patient found!")
          } else {
            setPatientArray(patients)
          }
      } else {
        alert("Invalid statement found in place of `where clause`")
      }
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const [select, from, where_1, where_2, where_3, and_1, and_2, and_3, groupBy] = ValidateQuery(query)
    setSelectParameters(select)
    setFromParameters(from)
    console.log(select + ',' + from + ',' + where_1 + ',' + where_2 + ',' + where_3 + ',' + and_1 + ',' + and_2 + ',' + and_3 + ',' + groupBy)
    
    // Let's consider the case where we have only one table in `FROM` clause
    if(from.length !== 1) {
       // For starting sake let's take 2 tables
      //  if(fromParameters[0] === 'PATIENTS' && fromParameters[1] === 'DOCTORS' ||
      //  fromParameters[0] === 'DOCTORS' && fromParameters[1] === 'PATIENTS' ) {
         let naturalJoinResult = await clinicContract.methods.doctorNaturalJoinPatient(account).call()
         console.log(naturalJoinResult.length)
         if(naturalJoinResult.length === 0) {
           alert("No result found for naturaljoin!")
         } else {
           setNaturalJoinArray(naturalJoinResult)
         }
    } 
    // What if we have a complex clause such as inner, outer or natural join where the query involves more than a table
    else {
      if(from[0] === 'PATIENTS') {

        // Only one parameter in the select clause
        // if(select.length === 1) {
          // if(select[0] === '*') {
            if(where_1 === 'DEPARTMENT' && where_2 === '=') {
                let patients = await patientContract.methods.getRegisteredPatientsByDept(account, where_3.toUpperCase()).call()
                if(patients.length === 0) {
                  alert("No patient found!")
                } else {
                  setPatientArray(patients)
                }
            } else if(where_1 === ' '){
                let patients = await patientContract.methods.getRegisteredPatients(account).call()
                if(patients.length === 0) {
                  alert("No patient found!")
                } else {
                  setPatientArray(patients)
                }
            } else {
              alert("Invalid statement found in place of `where clause`")
            }
          // }
        // }

        // // More than one attribute in the select clause
        // else {
        //   alert("More than 1 attrb in select clause")
        // }
      } else if(from[0] === 'DOCTORS') {

        // Only one parameter in the select clause
        // if(select.length === 1) {
          // if(select[0] === '*') {
            if(where_1 === 'DEPARTMENT' && where_2 === '=') {
              let doctors = await doctorContract.methods.getRegisteredDoctorsByDept(account, where_3.toUpperCase()).call()
              if(doctors.length === 0) {
                alert("No doctor found!")
              } else {
                setDoctorArray(doctors)
              }
            } else if(where_1 === ' '){
              let doctors = await doctorContract.methods.getRegisteredDoctors(account).call()
              if(doctors.length === 0) {
                alert("No Doctors found!")
              } else {
                setDoctorArray(doctors)
              }
            } else {
              alert("Invalid statement found in place of `where clause`")
            }
          // }
        // }
        
        // // More than one attribute in the select clause
        // else {
        //   alert("More than 1 attrb in select clause")
        // }
      } else {
        alert("Invalid SQL Query!")
      }
    }
  }

  return (
      <div>
        <Container className="containerStyles" fluid>
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
                    <option value="Doctors">Doctors</option>
                    <option value="Patients">Patients</option>
                    <option value="Doctors Natural Join Patients">Doctors Natural Join Patients</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="where">
                  <Form.Label>Where Department = </Form.Label>
                  <Form.Control type="text" placeholder="Enter where condition" value={whereValue} onChange={(e) => setWhereValue(e.target.value)} />
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
                rows={2}
                onChange={event => {setQuery(event.target.value)}} required
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button className="mt-2" size="lg" variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
          &nbsp;

          {query.length !== 0 ? 
            (fromParameters.length === 1 && fromParameters[0] === 'DOCTORS' ? (
                    doctorArray.length === 0 ? <h5 className='text-center text-danger'>No Doctors</h5> :
                    <Table striped bordered hover responsive size="sm" className="tableStyles" variant="dark">
                      <thead className="table-primary">
                        <tr>
                          <th className="text-center">S.No.</th>
                          <th className="text-center">DoctorID</th>
                          <th className="text-center">Name</th>
                          <th className="text-center">Department</th>
                        </tr>
                      </thead>
                      { doctorArray.map((val, index) => {
                          return (
                            <tbody>
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td className="text-center">{val.id}</td>
                              <td className="text-center">{val.name}</td>
                              <td className="text-center">{val.department}</td>
                            </tr>
                            </tbody>
                          )
                      })}
                    </Table>
                    ) : fromParameters.length === 1 && fromParameters[0] === 'PATIENTS' ? (
                      patientArray.length === 0 ? <h5 className='text-center text-danger'>No Patients</h5> :
                      <Table striped bordered hover responsive size="sm" className="tableStyles" variant="dark">
                        <thead className="table-success">
                          <tr>
                            <th className='text-center'>S.No.</th>
                            <th className='text-center'>Address</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Department</th>
                          </tr>
                        </thead>
                        { patientArray.map((val, index) => {
                            return (
                              <tbody>
                              <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{val.id}</td>
                                <td className='text-center'>{val.name}</td>
                                <td className='text-center'>{val.department}</td>
                              </tr>
                              </tbody>
                            )
                        })}
                      </Table>
                    ) : 
                    naturalJoinArray.length === 0 ? <h5 className='text-center text-danger'>No Natural Join </h5> :
                    <Table striped bordered hover responsive size="sm" className="tableStyles" variant="dark">
                    <thead className="table-warning">
                      <tr>
                        <th className='text-center'>S.No.</th>
                        <th className='text-center'>Clinic Name</th>
                        <th className='text-center'>DoctorID</th>
                        <th className='text-center'>Doctor Name</th>
                        <th className='text-center'>PatientID</th>
                        <th className='text-center'>Patient Name</th>
                        <th className="text-center">Department</th>
                      </tr>
                    </thead>
                    { naturalJoinArray.map((val, index) => {
                        return (
                          <tbody>
                          <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{val.clinicName}</td>
                            <td className='text-center'>{val.doctorID}</td>
                            <td className='text-center'>{val.doctorName}</td>
                            <td className='text-center'>{val.patientID}</td>
                            <td className='text-center'>{val.patientName}</td>
                            <td className='text-center'>{val.department}</td>
                          </tr>
                          </tbody>
                        )
                    })}
                  </Table> 
        ) :
        (fromValue === 'Doctors' ? (
                doctorArray.length === 0 ? <h5 className='text-center text-danger'>No Doctors</h5> :
                <Table striped bordered hover responsive size="sm" className="tableStyles" variant="dark">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-center">S.No.</th>
                      <th className="text-center">DoctorID</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Department</th>
                    </tr>
                  </thead>
                  { doctorArray.map((val, index) => {
                      return (
                        <tbody>
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{val.id}</td>
                          <td className="text-center">{val.name}</td>
                          <td className="text-center">{val.department}</td>
                        </tr>
                        </tbody>
                      )
                  })}
                </Table>
                ) : fromValue === 'Patients' ? (
                  patientArray.length === 0 ? <h5 className='text-center text-danger'>No Patients</h5> :
                  <Table striped bordered hover responsive size="sm" className="tableStyles" variant="dark">
                    <thead className="table-success">
                      <tr>
                        <th className='text-center'>S.No.</th>
                        <th className='text-center'>Address</th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Department</th>
                      </tr>
                    </thead>
                    { patientArray.map((val, index) => {
                        return (
                          <tbody>
                          <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{val.id}</td>
                            <td className='text-center'>{val.name}</td>
                            <td className='text-center'>{val.department}</td>
                          </tr>
                          </tbody>
                        )
                    })}
                  </Table>
                ) : 
                naturalJoinArray.length === 0 ? <h5 className='text-center text-danger'>No Natural Join </h5> :
                <Table striped bordered hover responsive size="sm" className="tableStyles" variant="dark">
                <thead className="table-warning">
                  <tr>
                    <th className='text-center'>S.No.</th>
                    <th className='text-center'>Clinic Name</th>
                    <th className='text-center'>DoctorID</th>
                    <th className='text-center'>Doctor Name</th>
                    <th className='text-center'>PatientID</th>
                    <th className='text-center'>Patient Name</th>
                    <th className="text-center">Department</th>
                  </tr>
                </thead>
                { naturalJoinArray.map((val, index) => {
                    return (
                      <tbody>
                      <tr key={index}>
                        <td className='text-center'>{index + 1}</td>
                        <td className='text-center'>{val.clinicName}</td>
                        <td className='text-center'>{val.doctorID}</td>
                        <td className='text-center'>{val.doctorName}</td>
                        <td className='text-center'>{val.patientID}</td>
                        <td className='text-center'>{val.patientName}</td>
                        <td className='text-center'>{val.department}</td>
                      </tr>
                      </tbody>
                    )
                })}
              </Table>
        )}
      </Container>
  </div>
);
}
