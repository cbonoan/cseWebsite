import React, { useState, useEffect } from "react";
import { Container, Form, FloatingLabel, Row, Col, Button} from 'react-bootstrap';
import axios from "axios";
import Aos from 'aos';
import "aos/dist/aos.css";

import "../styles/ScheduleForm.css";

require('dotenv').config();

function ScheduleForm() {
    useEffect(() => {
        Aos.init({duration: 1000});
    }, []);

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

    const [validated, setValidated] = useState(false);
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPhone, setEnteredPhone] = useState("");
    const [enteredDate, setEnteredDate] = useState("");
    const [enteredTime, setEnteredTime] = useState("");
    const [enteredPickupLocation, setEnteredPickupLocation] = useState("");
    const [enteredService, setEnteredService] = useState(services[0]['value']);
    const [enteredDropoffLocation, setEnteredDropoffLocation] = useState("");
    const [enteredInformation, setEnteredInformation] = useState("");
    const setFunctions = [setEnteredName, setEnteredEmail, setEnteredDate, setEnteredPhone, 
        setEnteredTime, setEnteredPickupLocation, setEnteredDropoffLocation, setEnteredInformation];

    
    const [showMessage, setShowMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const [formSent, setFormSent] = useState("");

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    }
    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    }
    const phoneChangeHandler = (event) => {
        setEnteredPhone(event.target.value);
    }
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }
    const timeChangeHandler = (event) => {
        setEnteredTime(event.target.value);
    }
    const pickupChangeHandler = (event) => {
        setEnteredPickupLocation(event.target.value)
    }
    const serviceChangeHandler = (event) => {
        setEnteredService(event.target.value);
    }
    const dropoffChangeHandler = (event) => {
        setEnteredDropoffLocation(event.target.value);
    }
    const infoChangeHandler = (event) => {
        setEnteredInformation(event.target.value);
    }
    

    const handleContactFormSubmit = (event) => {
        const form = event.currentTarget; 
        event.preventDefault();

        if(form.checkValidity() === false) {
            setValidated(true);
            setFormSent(false);

            setShowMessage("Please fill out required fields.");
            setMessageColor("text-danger");

            event.stopPropagation();
        } else {
            setValidated(false);
            const host = window.location;
            axios.post(`${host.protocol}//${host.host}/api/reservation-form-submit`, {
                name: enteredName,
                email: enteredEmail,
                phone: enteredPhone,
                pickup: enteredPickupLocation,
                date: enteredDate,
                time: enteredTime,
                service: enteredService,
                dropoff: enteredDropoffLocation,
                additionalInfo: enteredInformation
            }).then(res => {
                setShowMessage(res.data.message);
                if(res.data.error) {
                    setMessageColor("text-danger");
                } else {
                    setMessageColor("text-info");
                }
            }).catch(e => {
                setShowMessage("There was an error on our side!");
                setMessageColor("text-danger");
            });

            setFormSent(true);
            setFunctions.forEach((setFunction) => {
                setFunction("");
            })
        }
        window.location.href="#schedule-body";
    }

    

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
                    {!formSent && validated && <p style={{fontWeight: "bold", textAlign: 'center'}} className={messageColor}>{showMessage}</p>}
                    {formSent && <p style={{fontWeight: "bold", textAlign: 'center'}} className={messageColor}>{showMessage}</p>}
                    {/* Name */}
                    <Form noValidate validated={validated} onSubmit={handleContactFormSubmit}>
                        <Form.Group data-aos="fade-right" className="mb-3">
                            <FloatingLabel
                            controlId="fullNameLabel"
                            label="First and Last Name *"
                            className="mb-3">
                                <Form.Control type="text" placeholder="John Doe" value={enteredName} onChange={nameChangeHandler} required/>
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
                                    <Form.Control type="email" placeholder="johndoe@appleseed.com" value={enteredEmail} onChange={emailChangeHandler} required/>
                                    <Form.Control.Feedback type="invalid">
                                    Please enter a valid email.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group data-aos="fade-right" as={Col} controlId="phoneColInput">
                                <FloatingLabel
                                controlId="phoneLabel"
                                label="Phone Number *"
                                className="mb-3">
                                    <Form.Control type="tel" placeholder="0123456789" value={enteredPhone} onChange={phoneChangeHandler} required/>
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
                                    <Form.Control type="date" placeholder="mm/dd/yyyy" value={enteredDate} onChange={dateChangeHandler} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid date.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group data-aos="fade-right" as={Col} controlId="pickupTimeInput">
                                <FloatingLabel
                                controlId="pickupTimeLabel"
                                label="Pickup Time *"
                                className="mb-3">
                                    <Form.Control type="time" placeholder="" value={enteredTime} onChange={timeChangeHandler} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid time.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            
                        </Row>
                        <Row>
                            <Form.Group data-aos="fade-right" as={Col} controlId="pickupLocationInput">
                                <FloatingLabel
                                controlId="pickupLocationLabel"
                                label="Pickup Location *"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="123 Street Ave" value={enteredPickupLocation} onChange={pickupChangeHandler} required/>
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
                                    <Form.Select aria-label="Service Select" value={enteredService} onChange={serviceChangeHandler} required>
                                        {services.map((service) => (
                                            <option value={service.value}>{service.label}</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group data-aos="fade-right" as={Col} controlId="dropoffLocationInput">
                                <FloatingLabel
                                controlId="dropoffLocationLabel"
                                label="Dropoff Location *"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="123 Street Ave" value={enteredDropoffLocation} onChange={dropoffChangeHandler} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid dropoff location.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Form.Group data-aos="fade-up" className="mb-3" controlId="commentInput">
                            <FloatingLabel
                            controlId="commentLabel"
                            label="Enter any additional information."
                            className="mb-3">
                                <Form.Control as="textarea" style={{height: "150px"}} value={enteredInformation} onChange={infoChangeHandler} placeholder="I love CSE!"/>
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