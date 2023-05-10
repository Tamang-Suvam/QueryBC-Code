import React from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import "./Dash.css"

import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpeg'
import img3 from '../../assets/3.webp'
import img4 from '../../assets/4.png'
import img5 from '../../assets/5.jpeg'
import img6 from '../../assets/6.jpeg'

function Dash() {
  const navigate = useNavigate()
  const handleClick = e  => {
    e.preventDefault()
    navigate("/start_page")
  }

  return (
    <div className="App1">
      <header className="App1-header">
        <Container>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <h1>Effortlessly manage your medical records with QEHRs Dapp</h1>
              <p className="lead1">
                QEHRs Dapp is a decentralized application that allows you to securely store and access your medical records anytime, anywhere.
              </p>
              <Button variant="primary" size="lg" onClick={handleClick}>Get Started</Button>
            </Col>
          </Row>
        </Container>
      </header>
      <section className="features">
      <div className="dashboard">
        <Container>
          <Row className="my-5">
            <Col>
              <Card className="CustomCard">
                {/* <Card.Img variant="top" src="https://source.unsplash.com/900x600/?legal-documents" alt="Card image cap" /> */}
                <Card.Img variant="top" src={img1} alt="Card image cap" />
                <Card.Body>
                  <Card.Title>Access Your Health Records Anytime</Card.Title>
                  <Card.Text>
                    With our Electronic Health Records system, you can access your
                    health records from anywhere, at any time.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="CustomCard">
                {/* <Card.Img variant="top" src="https://source.unsplash.com/900x600/?security-check" alt="Card image cap" /> */}
                <Card.Img variant="top" src={img2} alt="Card image cap" />
                <Card.Body>
                  <Card.Title>Secure and Private</Card.Title>
                  <Card.Text>
                    Designed with the highest level of security and
                    privacy in mind, ensuring that your health information is
                    always safe and confidential.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="CustomCard">
                {/* <Card.Img variant="top" src="https://source.unsplash.com/900x600/?authentication" alt="Card image cap" /> */}
                <Card.Img variant="top" src={img3} alt="Card image cap" />
                <Card.Body>
                <Card.Title>Easy to Use</Card.Title>
                  <Card.Text>
                    Our user-friendly interface makes it easy for you to manage
                    your health records, track your medical history, and stay on
                    top of your health.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="my-5">
            <Col>
              <Card className="CustomCard">
                {/* <Card.Img variant="top" src="https://source.unsplash.com/900x600/?medicine" alt="Card image cap" /> */}
                <Card.Img variant="top" src={img4} alt="Card image cap" />
                <Card.Body>
                  <Card.Title>Electronic Health Records</Card.Title>
                  <Card.Text>
                    Electronic Health Records, the need of the hour
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="CustomCard">
                {/* <Card.Img variant="top" src="https://source.unsplash.com/900x600/?doctor" alt="Card image cap" /> */}
                <Card.Img variant="top" src={img5} alt="Card image cap" />
                <Card.Body>
                  <Card.Title>Find Your Doctor</Card.Title>
                  <Card.Text>
                    Doctors in your fingertips
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="CustomCard">
                {/* <Card.Img variant="top" src="https://source.unsplash.com/900x600/?patient" alt="Card image cap" /> */}
                <Card.Img variant="top" src={img6} alt="Card image cap" />
                <Card.Body>
                  <Card.Title>Manage Your Health</Card.Title>
                  <Card.Text>
                    Manage your health in the best possible way
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        </div>
      </section>
      <section className="cta">
        <Container>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <h2>Ready to take control of your health?</h2>
              <p>Join thousands of satisfied users and experience the benefits of QEHRs.</p>
              <Button variant="primary" size="lg" onClick={handleClick}>Get Started</Button>
            </Col>
          </Row>
        </Container>
      </section>
      <footer>
        <Container>
          <Row>
            <Col>
              <p className="text-center">&copy; 2023 QEHRs. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Dash;
