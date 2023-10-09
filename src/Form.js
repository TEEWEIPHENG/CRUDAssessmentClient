import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import './Form.css';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [skillsets, setSkillsets] = useState('');
    const [hobby, setHobby] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to a server or perform validation
        console.log(this.state);
    };

    return (
        <Container className="registerform">
            <Row>
                <Col>
                    <h1>Add new user</h1>
                </Col>
            </Row>
            <Row>
                <Col> 
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
                <Col>
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                   
                </Col>
                <Col>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" className="form-control" placeholder="Enter phone number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </Col>
                     
            </Row>
            <Row>
                <Col>
                    <label htmlFor="skillsets">Skillsets</label>
                    <textarea className="form-control" placeholder="Enter skillsets" value={skillsets} onChange={(e) => setSkillsets(e.target.value)} rows={4}/>
                </Col>
                <Col>
                    <label htmlFor="hobbies">Hobbies</label>
                    <textarea className="form-control" placeholder="Enter hobby" value={hobby} onChange={(e) => setHobby(e.target.value)} rows={4}/>
                </Col>
            </Row>
            <Row>
                <div className="p-2 text-center">
                    <button className="btn btn-primary m-1">Save</button>
                    <button className="btn btn-secondary m-1">Clear</button>
                </div>
            </Row>
        </Container>
    )
}

export default Form;
