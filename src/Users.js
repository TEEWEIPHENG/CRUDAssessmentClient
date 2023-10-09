import React, { useState, useEffect, Fragment } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './Form';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';

const Users = () => {
    const [data, setData] = useState([]); // Initialize data as an empty array

    useEffect(() => {
        getData(); // Set data using the empdata array
    }, []);
    
    //get data from API
    const getData = () => {
        axios.get('https://localhost:7191/api/User').then((result)=>{
            setData(result.data);
        }).catch((error)=>{
            console.log(error)
        })
    }

    //handle Edit button 
    const handleEdit = (id) =>{
        handleShow();
    }

    //handle delete button
    const handleDelete = (id) => {
        if(window.confirm("are you sure to delete this user?") ==true)
            alert(id);
        console.log('Delete: ' + id);
    }

    //
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <Form/>
            <hr/>
            <h2>Users</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Skillsets</th>
                        <th>Hobby</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone_number}</td>
                                    <td>{item.skillsets}</td> 
                                    <td>{item.hobby}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-secondary m-1" onClick={() => handleEdit(item.userID)}>Edit</button>
                                        <button className="btn btn-danger m-1" onClick={() => handleDelete(item.userID)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        'Loading...'
                    }
                </tbody> 
            </Table>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                {
                    data && data.length > 0 ?
                    data.map((item, index) => {
                        <Pagination.Item>{1}</Pagination.Item>
                    })
                    :
                    <Pagination.Item>{1}</Pagination.Item>
                }
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><Form /></Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Users;
