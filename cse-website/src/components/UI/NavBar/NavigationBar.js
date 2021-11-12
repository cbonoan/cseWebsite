import React from "react";
import cseLogo from "../../../images/svg-logo.svg";
import {Container, Navbar, Nav} from "react-bootstrap";
import '../../../styles/NavigationBar.css'

function NavigationBar(props) {
    const logoScaleMult = 0.12;

    return (
        <Navbar sticky="top" expand="lg" id="navbar">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={cseLogo}
                        width={1100*logoScaleMult}
                        height={850*logoScaleMult}
                        alt="CSE Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav fill variant="tabs" className="ms-auto" id="nav-links-div" >
                        <Nav.Link className="nav-link" href="#top">About</Nav.Link>
                        <Nav.Link className="nav-link" href="#services-body">Services</Nav.Link>
                        <Nav.Link className="nav-link" href="#schedule-body">Schedule A Transport</Nav.Link>
                        <Nav.Link className="nav-link" href="#contact-body">Contact Us</Nav.Link>
                        <Nav.Link className="nav-link" href="#careers-body">Careers</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>    
    );
}

export default NavigationBar;
