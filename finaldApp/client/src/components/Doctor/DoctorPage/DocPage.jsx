import React, { useState, useEffect } from 'react';
import {useLocation, Link} from 'react-router-dom';
import { Navbar, Nav,  Button } from 'react-bootstrap';
import { FaAngleDown } from "react-icons/fa";
import logo from '../../../assets/QEHRs.png'
import { Bar, Doughnut } from 'react-chartjs-2';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './docPage.css';
import Chart from 'chart.js/auto';

function DocPage({doctorContract, patientContract}) {
  const location = useLocation();
  const { docName, metamaskAddress } = location.state;
  const [isOpen, setIsOpen] = useState(false);
  const [numDoctors, setNumDoctors] = useState(10);
  const [numPatients, setNumPatients] = useState(10);
  
  // const name = location.state.docName
  // const address = location.state.metamaskAddress

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const customFont = {
    fontFamily: 'Montserrat',
  };

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

      console.log(doctorNumbers.length)
      console.log(patientNumbers.length)
      
      setNumDoctors(doctorNumbers);
      setNumPatients(patientNumbers);
    };
    fetchData();
    // getDoctorsCount()
    // getPatientsCount()
  }, []);


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
            <Nav.Link href="/doctor_page">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          {/* <Nav>
            <NavItem>
              <Nav.Link href="/clinic_login">Login</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link href="/clinic_registration">Sign Up</Nav.Link>
            </NavItem>
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <Nav className="flex-column">
          {/* <Nav.Link href="/add_patient">Add Patient</Nav.Link>
          <Nav.Link href="/add_record">Add Patient Record</Nav.Link>
          <Nav.Link href="/doctor_query">Query Section</Nav.Link>
          <Nav.Link href="/ipfs_page">IPFS Page</Nav.Link> */}
          <Nav.Item>
            <Link to="/add_patient" className="nav-link">Add Patient</Link>
          </Nav.Item>
          <Nav.Link as={Link} to={{
            pathname: '/add_record',
            search: `?param1=${docName}&param2=${metamaskAddress}`
          }}>Add Patient Record</Nav.Link>
          <Nav.Item>
            <Link to="/doctor_query" className="nav-link">Query Section</Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Link to="/ipfs_page" className="nav-link">IPFS Page</Link>
          </Nav.Item> */}
        </Nav>
      </div>

      <div className='main-content'>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Bar data={dataForBarChart} options={optionsForCharts} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
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

export default DocPage;