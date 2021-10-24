import React, {useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Parallax } from 'react-parallax';
import Aos from "aos";
import "aos/dist/aos.css";

import "../styles/About.css";
import vansPicture from '../images/intro.jpg';

function About() {

    useEffect(() => {
        Aos.init({duration: 3000});
    }, [])

    const insideStyles = {
        background: "white",
        padding: 25,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-75%)"
    };
    return (
        <div id="about-body">
            <Parallax bgImage={vansPicture} strength={600} blur={{min: -1, max: 3}}>
                <div style={{height: '100vh'}}>
                    <div style={insideStyles}>
                        <Row>
                            <Col xs={12} lg={6}>
                                <div style={{textAlign: "right"}}>
                                    <strong style={{fontSize: 40}}>
                                        Need a lift to your next appointment? <br/>
                                        Let CSE take care of you!
                                    </strong>
                                </div>
                                
                            </Col>
                            <Col xs={12} lg={6}>
                                <p style={{fontSize: 17}}>
                                    We are a non-emergency, round-the-clock, medical transporter team
                                    who provides residents of Kern County a safe and secured transport
                                    services to their medical appointments. Our vehicles are equipped
                                    with wheelchairs, stretchers, and/or gurney. To ensure your safety,
                                    our drivers are thoroughly screened, well-trained, knowledgeable of
                                    routes, and are certified with Basic Life Support (BLS).
                                </p>    
                            </Col>
                        </Row>
                    </div>
                </div>
            </Parallax>
        </div>
    );
}

export default About;
