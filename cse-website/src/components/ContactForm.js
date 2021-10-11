import React, { useState, useEffect } from 'react';
import { Container, Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap';
import Aos from 'aos';
import "aos/dist/aos.css";
import axios from "axios";

import '../styles/ContactForm.css';

function ContactForm(props) {
    useEffect(() => {
        Aos.init({duration: 1000});
    }, []);

    const [validated, setValidated] = useState(false);
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPhone, setEnteredPhone] = useState("");
    const [enteredComment, setEnteredComment] = useState("");
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
    const commentChangeHandler = (event) => {
        setEnteredComment(event.target.value);
    }

    const handleContactFormSubmit = (event) => {
        const form = event.currentTarget; 
        event.preventDefault();

        // if form has input errors, function stops 
        if(form.checkValidity() === false) {
            setValidated(true);
            setFormSent(false);

            setShowMessage("Please fill out required fields.");
            setMessageColor("text-danger");

            event.stopPropagation();
        } else if(form.checkValidity() === true) {
            setValidated(false);

            // try to send form data
            const host = process.env.HOST;
            axios.post(`${host}/api/contact-form-submit`, {
                name: enteredName,
                email: enteredEmail,
                phone: enteredPhone,
                comment: enteredComment
            }).then(res => {
                    setShowMessage(res.data.message);
                    if(res.data.error) {
                        setMessageColor("text-danger");
                    } else {
                        setMessageColor("text-info");
                    }
                })
                .catch(e => {
                    setShowMessage("There was an error on our side!");
                    setMessageColor("text-danger");
                })

            setFormSent(true);
            setEnteredName("");
            setEnteredEmail("");
            setEnteredPhone("");
            setEnteredComment("");
        }
        window.location.href="#contact-body";
    }

    return(
        <div id="contact-body">
            <Container fluid id="contact-container">
                <div data-aos="fade-down" className="text-center">
                    <Container fluid id="contact-title">
                        <h1>Contact Form</h1>
                    </Container>
                    <p>Have a question or concern? Let us know!</p>
                </div>
                <Container>
                    <p data-aos="fade-right" style={{fontWeight: "bold"}}>Fields with an '*' are required</p>
                    {!formSent && validated && <p style={{fontWeight: "bold", textAlign: 'center'}} className={messageColor}>{showMessage}</p>}
                    {formSent && <p style={{fontWeight: "bold", textAlign: 'center'}} className={messageColor}>{showMessage}</p>}
                    <Form noValidate validated={validated} onSubmit={handleContactFormSubmit}>
                        <Form.Group data-aos="fade-right" className="mb-3">
                            <FloatingLabel
                            controlId="fullNameLabel"
                            label="First and Last Name *"
                            className="mb-3">
                                <Form.Control type="text" 
                                value={enteredName} 
                                onChange={nameChangeHandler}
                                placeholder="John Doe" 
                                name="fullName"
                                required/>
                                <Form.Control.Feedback type="invalid">
                                Please enter your first and last name.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group data-aos="fade-right" as={Col} controlId="emailColInput">
                                <FloatingLabel
                                controlId="emailLabel"
                                label="Email *"
                                className="mb-3">
                                    <Form.Control type="email" 
                                    value={enteredEmail} 
                                    onChange={emailChangeHandler}
                                    placeholder="johndoe@appleseed.com" 
                                    name="email"
                                    required/>
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
                                    <Form.Control 
                                    type="tel" 
                                    value={enteredPhone}
                                    onChange={phoneChangeHandler}
                                    placeholder="0123456789" 
                                    name="phoneNum"
                                    required/>
                                    <Form.Control.Feedback type="invalid">
                                    Please enter a valid number.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Form.Group data-aos="fade-up" className="mb-3" controlId="commentInput">
                            <FloatingLabel
                            controlId="commentLabel"
                            label="Enter your question or concern here! *"
                            className="mb-3">
                                <Form.Control 
                                as="textarea" 
                                value={enteredComment}
                                onChange={commentChangeHandler}
                                style={{height: "150px"}} 
                                placeholder="I love CSE!" 
                                name="comment"
                                required/>
                                <Form.Control.Feedback type="invalid">
                                Please enter your question or concern.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    <Button type="submit">Submit</Button>
                    </Form>
                </Container>
            </Container>
        </div>        
    );
}

export default ContactForm;