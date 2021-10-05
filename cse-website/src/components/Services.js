import React, {useEffect} from "react";
import {Container, Row, Col, Figure} from 'react-bootstrap';
import Aos from "aos";
import "aos/dist/aos.css";

import '../styles/Services.css';
import gurneyPic from '../images/gv.jpg';
import wheelChairPic from '../images/wc.jpg'
import ambulatoryPic from '../images/schedule.jpg';
function Services() {
    useEffect(() => {
        Aos.init({duration: 2000});
    }, [])

    return(
        <Container fluid className="text-center" id="services-body">
            <div data-aos="fade-down" className="text-center" id="service-header">
                <h1>CSE Medical Transport Provides The Following Services:</h1>
            </div>
            <Row  id="services-div" >
                <Col data-aos="fade-right" md={4} xs={12} className="service-col">
                    <Figure className="service-figure">
                        <Figure.Image
                        src={gurneyPic}
                        />
                    <Figure.Caption>Gurney Transportation</Figure.Caption>
                    </Figure>
                </Col>
                <Col data-aos="fade-up" md={4} xs={12} className="service-col" id="wheelchair-col">
                    <Figure className="service-figure">
                        <Figure.Image
                        src={wheelChairPic}
                        />
                        <Figure.Caption>Wheelchair Transportation</Figure.Caption>
                    </Figure>
                </Col>
                <Col data-aos="fade-left" md={4} xs={12} className="service-col">
                    <Figure className="service-figure">
                        <Figure.Image
                        src={ambulatoryPic}
                        />
                        <Figure.Caption>Ambulatory Transportation</Figure.Caption>
                    </Figure>
                </Col>
            </Row>
        </Container>
    );
}

export default Services;