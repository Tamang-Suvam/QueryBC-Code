// import React, { useState } from "react";
// import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
// import "./Side.css";

// function Side() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="App">
//       <Navbar expand="lg" variant="light" bg="light" fixed="top">
//         <Container>
//           <Navbar.Brand href="#">QEHRs</Navbar.Brand>
//           <Navbar.Toggle onClick={toggleSidebar} />
//           <Navbar.Collapse className="justify-content-end">
//             <Nav>
//               <Button variant="outline-light" className="sidebar-toggle" onClick={toggleSidebar}>
//                 {isOpen ? "Close" : "Open"} Menu
//               </Button>
//               <Nav.Link href="#">Home</Nav.Link>
//               <Nav.Link href="#">About</Nav.Link>
//               <Nav.Link href="#">Contact</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <div className={`sidebar ${isOpen ? "open" : ""}`}>
//         <div className="sidebar-header">
//           <h3>Options</h3>
//         </div>
//         <Nav className="flex-column">
//           <Nav.Link href="#">Link 1</Nav.Link>
//           <Nav.Link href="#">Link 2</Nav.Link>
//           <Nav.Link href="#">Link 3</Nav.Link>
//           <Nav.Link href="#">Link 4</Nav.Link>
//         </Nav>
//       </div>
//       <main>
//         <Container fluid>
//           <Row>
//             <Col>
//               <h1>My Website</h1>
//               <p>
//                 This is an example of a professional-looking sidebar and navbar integrated in React Bootstrap.
//               </p>
//             </Col>
//           </Row>
//         </Container>
//       </main>
//     </div>
//   );
// }

// export default Side;

// import React, { useState } from "react";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faHome,
//   faUsers,
//   faCog,
//   faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import "./Side.css";

// function Side() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="App">
//       <Navbar bg="light" variant="light" expand="md">
//         <Container fluid>
//           <Navbar.Brand href="/">Brand Logo</Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleSidebar}>
//             <FontAwesomeIcon icon={faBars} />
//           </Navbar.Toggle>
//           <Navbar.Collapse id="navbar-nav">
//             <Nav className="ml-auto">
//                 <Button variant="outline-light" className="sidebar-toggle" onClick={toggleSidebar}>
//                 {isOpen ? "Close" : "Open"} Menu
//                </Button>
//               <Nav.Link href="/">
//                 <FontAwesomeIcon icon={faHome} />
//                 Home
//               </Nav.Link>
//               <Nav.Link href="/users">
//                 <FontAwesomeIcon icon={faUsers} />
//                 Users
//               </Nav.Link>
//               <Nav.Link href="/settings">
//                 <FontAwesomeIcon icon={faCog} />
//                 Settings
//               </Nav.Link>
//               <Nav.Link href="/logout">
//                 <FontAwesomeIcon icon={faSignOutAlt} />
//                 Logout
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <div className={`sidebar ${isOpen ? "open" : ""}`}>
//         <ul className="list-group list-group-flush">
//           <li className="list-group-item">
//             <FontAwesomeIcon icon={faHome} />
//             Home
//           </li>
//           <li className="list-group-item">
//             <FontAwesomeIcon icon={faUsers} />
//             Users
//           </li>
//           <li className="list-group-item">
//             <FontAwesomeIcon icon={faCog} />
//             Settings
//           </li>
//           <li className="list-group-item">
//             <FontAwesomeIcon icon={faSignOutAlt} />
//             Logout
//           </li>
//         </ul>
//       </div>

//       <div className="main">
//         <h1>Content goes here</h1>
//       </div>
//     </div>
//   );
// }

// export default Side;

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Button } from 'react-bootstrap';
import { FaAngleDown } from "react-icons/fa";
import logo from '../../../assets/QEHRs.png'
import { Container, Row, Col } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
// import backgroundImageUrl from '../../../assets/EHR_dash_image.jpg'
// import 'chartjs-plugin-datalabels';
import './Page.css';
// import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

function Page({doctorContract, patientContract}) {
  // Chart.register(LinearScale);
  // Chart.register(CategoryScale);
  // Chart.register(Bar);

  const [isOpen, setIsOpen] = useState(false);
  const [numDoctors, setNumDoctors] = useState(10);
  const [numPatients, setNumPatients] = useState(10);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const customFont = {
    fontFamily: 'Montserrat',
  };

  // const [chartData, setChartData] = useState({
  //   labels: ['Doctors', 'Patients'],
  //   datasets: [
  //     {
  //       label: 'Number of Doctors and Patients',
  //       data: [20, 100],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.6)',
  //         'rgba(54, 162, 235, 0.6)',
  //       ],
  //     },
  //   ],
  // });

  const dataForBarChart = {
    labels: ['Doctors', 'Patients'],
    datasets: [
      {
        label: 'Number of doctors and patients',
        data: [numDoctors, numPatients],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataForDoughnutChart = {
    labels: ['Doctors', 'Patients'],
    datasets: [
      {
        label: 'Number of doctors and patients',
        data: [numDoctors, numPatients],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsForCharts = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Number of doctors and patients',
        font: {
          size: 20,
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      let doctorNumbers = await doctorContract.methods.getDoctorsCount().call();
      let patientNumbers = await patientContract.methods.getPatientsCount().call();

      // console.log(doctorNumbers.length)
      // console.log(patientNumbers.length)
      
      setNumDoctors(doctorNumbers);
      setNumPatients(patientNumbers);
    };
    fetchData();
    // getDoctorsCount()
    // getPatientsCount()
  }, []);

  // const getDoctorsCount = async () => {
  //   const doctorNumbers = await doctorContract.methods.getDoctorsCount().call();
  //   setNumDoctors(doctorNumbers);
  // }

  // const getPatientsCount = async () => {
  //   const patientNumbers = await patientContract.methods.getPatientsCount().call();
  //   setNumPatients(patientNumbers);
  // }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand style={{fontWeight: 'bold'}}href="\">
        <img
            src={logo}
            width="30"
            height="30"
            style={customFont}
            className="ms-4 d-inline-block align-top me-2"
            alt="Logo"
          />
          QEHRs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button variant="link" onClick={toggleSidebar}>
                <FaAngleDown />
            </Button>
            <Nav.Link href="/clinic_page">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <Nav className="flex-column">
          <Nav.Link href="/add_doctor">Add Doctor</Nav.Link>
          <Nav.Link href="/clinic_add_patient">Add Patient</Nav.Link>
          <Nav.Link href="/clinic_query">Query Section</Nav.Link>
        </Nav>
      </div>

      <div className='main-content'>
      <Container>
        <Row>
          <Col className="h-100">
            <Card>
              <Card.Body>
                <Bar data={dataForBarChart} options={optionsForCharts} />
              </Card.Body>
            </Card>
          </Col>
          <Col className="h-100">
          <Card>
              <Card.Body>
                <Doughnut data={dataForDoughnutChart} options={optionsForCharts} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </div>
  );
}

export default Page;
