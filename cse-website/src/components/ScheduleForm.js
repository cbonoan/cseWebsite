import React, { useState, useEffect } from "react";
import { Container, Form, FloatingLabel, Row, Col, Button} from 'react-bootstrap';
import Aos from 'aos';
import "aos/dist/aos.css";

import "../styles/ScheduleForm.css";

function ScheduleForm() {
    useEffect(() => {
        Aos.init({duration: 1000});
    }, []);

    const [validated, setValidated] = useState(false);

    const handleContactFormSubmit = (event) => {
        const form = event.currentTarget; 
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    const services = [
        {
            label: "Gurney One-Way",
            value: "gurney one-way"
        },
        {
            label: "Gurney Roundtrip",
            value: "gurney roundtrip"
        },
        {
            label: "Wheelchair One-Way",
            value: "wheelchair one-way"
        },
        {
            label: "Wheelchair Roundtrip",
            value: "wheelchair roundtrip"
        },
        {
            label: "Ambulatory One-Way",
            value: "ambulatory one-way"
        },
        {
            label: "Ambulatory Roundtrip",
            value: "ambulatory roundtrip"
        }
    ];

    return (
        <div id="schedule-body">
            <Container fluid id="schedule-container">
                <div data-aos="fade-down" className="text-center">
                    <Container fluid id="schedule-title">
                        <h1>Schedule A Ride</h1>
                    </Container>
                    <p>Need a lift to your next destination? We'll take care of you!</p>
                </div>
                <Container>
                    <p data-aos="fade-right" style={{fontWeight: "bold"}}>Fields with an '*' are required</p>
                    {/* Name */}
                    <Form noValidate validated={validated} onSubmit={handleContactFormSubmit}>
                        <Form.Group data-aos="fade-right" className="mb-3">
                            <FloatingLabel
                            controlId="fullNameLabel"
                            label="First and Last Name *"
                            className="mb-3">
                                <Form.Control type="text" placeholder="John Doe" required/>
                                <Form.Control.Feedback type="invalid">
                                Please enter your first and last name.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        {/* Contact Info */}
                        <Row className="mb-3">
                            <Form.Group data-aos="fade-right" as={Col} controlId="emailColInput">
                                <FloatingLabel
                                controlId="emailLabel"
                                label="Email *"
                                className="mb-3">
                                    <Form.Control type="email" placeholder="johndoe@appleseed.com" required/>
                                    <Form.Control.Feedback type="invalid">
                                    Please enter a valid email.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group data-aos="fade-left" as={Col} controlId="phoneColInput">
                                <FloatingLabel
                                controlId="phoneLabel"
                                label="Phone Number *"
                                className="mb-3">
                                    <Form.Control type="tel" placeholder="0123456789" required/>
                                    <Form.Control.Feedback type="invalid">
                                    Please enter a valid number.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        {/* Pickup Info */}
                        <Row className="mb-3">
                            <Form.Group data-aos="fade-right" as={Col} controlId="pickupDateInput">
                                <FloatingLabel
                                controlId="pickupDateLabel"
                                label="Pickup Date *"
                                className="mb-3">
                                    <Form.Control type="date" placeholder="mm/dd/yyyy" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid date.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group data-aos="fade-left" as={Col} controlId="pickupTimeInput">
                                <FloatingLabel
                                controlId="pickupTimeLabel"
                                label="Pickup Time *"
                                className="mb-3">
                                    <Form.Control type="time" placeholder="" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid time.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            
                        </Row>
                        <Row>
                            <Form.Group data-aos="fade-left" as={Col} controlId="pickupLocationInput">
                                <FloatingLabel
                                controlId="pickupLocationLabel"
                                label="Pickup Location *"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="123 Street Ave" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid pickup location.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        {/* Service and Dropoff Info */}
                        <Row>
                            <Form.Group data-aos="fade-right" as={Col} controlId="serviceInput">
                                <FloatingLabel
                                controlId="serviceInputLabel"
                                label="Service Needed *"
                                className="mb-3">
                                    <Form.Select aria-label="Service Select">
                                        {services.map((service) => (
                                            <option value={service.value}>{service.label}</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group data-aos="fade-left" as={Col} controlId="dropoffLocationInput">
                                <FloatingLabel
                                controlId="dropoffLocationLabel"
                                label="Dropoff Location *"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="123 Street Ave" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid dropoff location.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Form.Group data-aos="fade-up" className="mb-3" controlId="commentInput">
                            <FloatingLabel
                            controlId="commentLabel"
                            label="Enter any information our driver should know."
                            className="mb-3">
                                <Form.Control as="textarea" style={{height: "150px"}} placeholder="I love CSE!"/>
                            </FloatingLabel>
                        </Form.Group>
                    <Button type="submit">Submit</Button>
                    </Form>
                </Container>
            </Container>
        </div>
    );
}

export default ScheduleForm;