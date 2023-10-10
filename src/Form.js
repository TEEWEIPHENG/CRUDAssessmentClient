import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import './Form.css';
import 'react-phone-number-input/style.css';
import APIService from './APIService';

const Form = ({ onSave, onCancel, editingUser }) => {
    const initialUserState = {
        name: '',
        email: '',
        phone_number: '',
        skillsets: '',
        hobby: '',
    };
    
    const [user, setUser] = useState({ ...initialUserState });

    useEffect(() => {
        if (editingUser) {
          setUser(editingUser);
        }
    }, [editingUser]);

    //when user change the input field. Validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: (name==='phone_number') ? value.replace(/\D/g, '') : value,
        });
    };

    //when user clicked save
    const handleSubmit = (e) => {
        e.preventDefault();
        if(editingUser){
            const userId = editingUser.userID;
            APIService.updateUser(userId, user)
            .then((response) => {
                console.log(response)
                onSave(user);
                setUser({...initialUserState});
            })
            .catch((error) => {
              console.error(error);
            });
        }
        else{
            APIService.createUser(user)
            .then((response) => {
                console.log(response)
                onSave(user);
                setUser({...initialUserState});
            })
            .catch((error) => {
              console.error(error);
            });
        }
    };

    //Clear all the input
    const handleClear = () => {
        setUser({ ...initialUserState });
    };

    return (
        <form onSubmit={handleSubmit} className="registerform">
            <Container>
                <Row>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" value={user.name} onChange={handleInputChange} required/>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={user.email} onChange={handleInputChange} required/>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" step='1' className="form-control" id="phoneNumber" name="phone_number" placeholder="Enter phone number" value={user.phone_number} onChange={handleInputChange}  pattern="[0-9]*" required/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="skillsets">Skillsets <span className="text-muted">*separate with ','</span></label>
                            <textarea className="form-control" id="skillsets" name="skillsets" placeholder="Enter skillsets" value={user.skillsets} onChange={handleInputChange} rows={4} required/>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="hobby">Hobby <span className="text-muted">*separate with ','</span></label>
                            <textarea className="form-control" id="hobby" name="hobby" placeholder="Enter hobby" value={user.hobby} onChange={handleInputChange} rows={4} required/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary m-1">Save</button>
                        <button type="button" className="btn btn-secondary m-1" onClick={handleClear}>Clear</button>
                    </div>
                </Row>
            </Container>
        </form>
    )
}

export default Form;
