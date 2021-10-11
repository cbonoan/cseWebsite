import React, {useEffect, useState} from 'react';
import { Container, Form, FloatingLabel, Row, Col, Button} from 'react-bootstrap';
import axios from "axios";
import Aos from 'aos';
import "aos/dist/aos.css";

import "../styles/ApplicationForm.css";

function ApplicationForm(props) {
    useEffect(() => {
        Aos.init({duration: 1000});
    }, []);

    const [validated, setValidated] = useState(false);
    const [formSent, setFormSent] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPhone, setEnteredPhone] = useState("");
    const [enteredExperience, setEnteredExperience] = useState("");
    const [enteredResume, setEnteredResume] = useState();
    // eslint-disable-next-line
    const [fileName, setFileName] = useState("");
    const [showMessage, setShowMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    const inputChangeHandler = (event) => {
        const inputTarget = event.target;
        const inputTargetName = inputTarget.getAttribute('name');
        switch(inputTargetName) {
            case 'fullName':
                setEnteredName(inputTarget.value);
                break;
            case 'email':
                setEnteredEmail(inputTarget.value);
                break;
            case 'phoneNum':
                setEnteredPhone(inputTarget.value);
                break;
            case 'experience':
                setEnteredExperience(inputTarget.value);
                break;
            case 'resumeFile':
                setEnteredResume(inputTarget.files[0]);
                setFileName(inputTarget.files[0].name);
                console.log(enteredResume);
                break;
            default:
                console.log('Could not find input target');
        }
    }

    const applicationFormHandler = (event) => {
        const form = event.currentTarget; 
        const formData = new FormData();
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
            formData.append('file', enteredResume);
            formData.append('name', enteredName);
            formData.append('email', enteredEmail);
            formData.append('phone', enteredPhone);
            formData.append('experience', enteredExperience);
            // try to send form data
            const host = process.env.HOST;
            axios.post(`${host}/api/application-form-submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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
            setEnteredExperience("");
        }
        window.location.href="#careers-body";
    }

    return(
        <div id="careers-body">
            <Container fluid id="careers-container">
                <div data-aos="fade-down" className="text-center">
                    <Container fluid id="careers-title">
                        <h1>Careers</h1>
                    </Container>
                    <p>Want to join our team? Fill out the form below to become part of CSE!</p>
                </div>
                <Container>
                    <p data-aos="fade-right" style={{fontWeight: "bold"}}>Fields with an '*' are required</p>
                    {!formSent && validated && <p style={{fontWeight: "bold", textAlign: 'center'}} className={messageColor}>{showMessage}</p>}
                    {formSent && <p style={{fontWeight: "bold", textAlign: 'center'}} className={messageColor}>{showMessage}</p>}
                    <Form noValidate validated={validated} onSubmit={applicationFormHandler}>
                        <Form.Group data-aos="fade-right" className="mb-3">
                            <FloatingLabel
                            controlId="fullNameLabel"
                            label="First and Last Name *"
                            className="mb-3">
                                <Form.Control type="text" 
                                value={enteredName} 
                                onChange={inputChangeHandler}
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
                                    onChange={inputChangeHandler}
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
                                    onChange={inputChangeHandler}
                                    placeholder="0123456789" 
                                    name="phoneNum"
                                    required/>
                                    <Form.Control.Feedback type="invalid">
                                    Please enter a valid number.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Form.Group data-aos="fade-up" className="mb-3" controlId="experienceInput">
                            <FloatingLabel
                            controlId="experienceLabel"
                            label="Describe any previous relevant experience or leave blank."
                            className="mb-3">
                                <Form.Control 
                                as="textarea" 
                                value={enteredExperience}
                                onChange={inputChangeHandler}
                                style={{height: "200px"}} 
                                name="experience"
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group data-aos="fade-up" controlId="formFile" className="mb-3">
                            <Form.Label>Attach Resume *</Form.Label>
                            <br/>
                            <Form.Label><b>Only PDF files are accepted.</b></Form.Label>
                            <Form.Control type="file" accept=".pdf" name="resumeFile" onChange={inputChangeHandler} required/>
                            <Form.Control.Feedback type="invalid" >
                            Please attach your resume or check that file type is accepted.
                            </Form.Control.Feedback>
                        </Form.Group>
                    <Button type="submit">Submit</Button>
                    </Form>
                </Container>
            </Container>
        </div>
    );
}

export default ApplicationForm;