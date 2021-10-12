import React, { } from "react";
import {Container, Row} from 'react-bootstrap';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="page-footer font-small pt-4" style={{backgroundColor: "#3E4551", color: "white"}}>
            <Container className="text-center text-md-start">
                <Row>
                    <div className="col-md-6 col-lg-6 mr-auto my-md-4 my-0 mt-4 mb-1">
                        {/* Contact Information */}
                        <h5 className="font-weight-bold text-uppercase mb-4">Contact Information</h5>
                        <ul className="list-unstyled">
                            <li>
                                <p>
                                    <i className="bi bi-telephone me-3"></i>
                                    <a href="tel:6619322218" style={{textDecoration: "none", color: "white"}}>661-932-2218</a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <i className="bi bi-printer me-3"></i>
                                    661-932-0011
                                </p>
                            </li>
                            <li>
                                <p>
                                    <i className="bi bi-envelope me-3"></i>
                                    csemeditransport@gmail.com
                                </p>
                            </li>
                            <li>
                                <p>
                                    <i className="bi bi-geo-alt me-3"></i>
                                    1601 New Stine Rd Suite 120, Bakersfield, CA, 93309
                                </p>
                            </li>
                        </ul>
                    </div>

                    <hr className="clearfix w-100 d-md-none"/>

                    <div className="col-md-6 col-lg-6 text-center mx-auto my-4">
                        {/* Social */}
                        <h5 className="font-weight-bold text-uppercase mb-4">Follow Us!</h5>
                        <a type="button" className="btn-floating btn-fb" 
                        href="https://www.facebook.com/CSE-Medical-Transport-106350931685335" target="_blank" rel="noreferrer">
                            <i class="bi bi-facebook" style={{fontSize: "50px"}}></i>
                        </a>
                    </div>
                </Row>
            </Container>
            {/* Copyright */}
            <div className="footer-copyright text-center py-3" style={{backgroundColor: "#323741"}}>© 2021 Copyright:
                {/* eslint-disable-next-line */}
                <a href="" style={{textDecoration: "none", color: "white"}}> csemedi.com</a>
            </div>
        </footer>
    );
}

export default Footer;