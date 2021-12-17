import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LogoImage from '../assets/images/im1.jpg';
export default function () {

    const containerStyle= {
        display:"flex",
        margin:"auto",

    
        alignItems: 'center'
    }
    const imgStlye={
        display:"flex",
        margin:"auto",
        flexDirection: 'row',  
        alignItems: 'center'
    }

    return (
        <Container style={containerStyle}>
            <Row roundedCircle style={imgStlye}>
                <Col xs={10} md={4}>
                    
                    <Image src={LogoImage} />
                </Col>
            </Row>
        </Container>
    )
}
