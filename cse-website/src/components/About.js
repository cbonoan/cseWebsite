import React, {useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";

import "../styles/About.css";
import vansPicture from '../images/intro.jpg';

function About() {

    useEffect(() => {
        Aos.init({duration: 3000});
    }, [])

    const picScale = 0.50; 

    return (
        <div id="about-body">
            <Container fluid className="text-center" id="header-container">
                <h3 data-aos="fade-down" id="welcome-message" style={{fontSize: "40px", lineHeight: "1.6" }}>
                    Transport Your Loved Ones With{" "}
                    <span style={{ 
                        fontWeight: "bold", 
                        textDecoration: "underline",
                        color: "#C81B01" }}>
                    CSE
                    </span>
                    <br />
                    <p>1,000+ Transports | 1,000+ Satisfied Customers | 10+ Cities</p>
                </h3>
                <br/>
                <div id="outter-about-div">
                    <Container id="about-container">
                        <Row>
                            <Col>
                                <div data-aos="fade-right" id="inner-about-div">
                                    <h1>Who We Are</h1>
                                    <span>
                                        We are a non-emergency, round-the-clock, medical transporter team
                                        who provides residents of Kern County a safe and secured transport
                                        services to their medical appointments. Our vehicles are equipped
                                        with wheelchairs, stretchers, and/or gurney. To ensure your safety,
                                        our drivers are thoroughly screened, well-trained, knowledgeable of
                                        routes, and are certified with Basic Life Support (BLS). We operate
                                        with three common pillars in mind. CARE, SAFETY, and EXCELLENCE.
                                    </span>
                                </div>
                            </Col>
                            <Col id="about-picture">
                                <div data-aos="fade-left">
                                    <img src={vansPicture}
                                    width={960*picScale}
                                    height={720*picScale}
                                    alt="Transportation Vehicles"/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        </div>
    );
}

export default About;
