import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import clinic_img from '../../../assets/clinic_page.jpg'
import './desc.css'

const ClinicDesc = () => {
    const navigate = useNavigate()
    const customFont = {
        fontFamily: 'Montserrat',
    };

    const handleClick = e => {
        e.preventDefault()
        navigate('/clinic_login')
    }

    return (
        <>
            <div style={{ 
                background: 'linear-gradient(to bottom, #bdc3c7, #2c3e50)', 
                color: '#fff' 
            }}>
                <Container fluid>
                    <Row>
                    <Col md={6}>
                        <h1 className="text-center" style={{ marginTop: "10%", marginBottom: "3%" }}>Welcome to the Clinic Page</h1>
                    </Col>
                    </Row>
                </Container>
            </div>
            <section className="cta">
                <Container>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                    <h2>Ready to reach out to millions?</h2>
                    <p>Join thousands of clinics and let the world know the benefits of QEHRs.</p>
                    <Button variant="primary" size="lg" onClick={handleClick}>Join Now</Button>
                    </Col>
                </Row>
                </Container>
            </section>

            <div>
            <Container fluid className="main">
                <Row className="mt-1">
                <Col md={6}>
                    <Image
                    src={clinic_img}
                    alt="Clinic Image"
                    fluid
                    />
                </Col>
                <Col md={6}>
                    <h2 className="text-center mb-4 mt-5">Here You Can</h2>
                    <ul>
                    <li className='fs-2' style={customFont}>Register as a Clinic to QEHRs</li>
                    <li className='fs-2' style={customFont}>Register a Doctor to QEHRS</li>
                    <li className='fs-2' style={customFont}>Perform Query operations</li>
                    </ul>
                </Col>
                </Row>
            </Container>
            </div>

            <footer>
                <Container>
                <Row>
                    <Col>
                    <p className='text-center'>&copy; 2023 QEHRs. All rights reserved.</p>
                    </Col>
                </Row>
                </Container>
            </footer>
        </>
  )
}

export default ClinicDesc
