import React, { useState, useEffect, Fragment } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './Form';
import Pagination from 'react-bootstrap/Pagination';
import APIService from "./APIService";
import './Users.css'

const Users = () => {    
    const [data, setData] = useState([]); // Initialize data as an empty array
    useEffect(() => {
        // Fetch users using the APIService function
        APIService.getUsers()
          .then((response) => {
            setData(response.data);
            totalPages = Math.ceil(response.data.length / itemsPerPage);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

    // Function to refresh user data
    const refreshUserData = async () => {
        // Fetch users using the APIService function after creating/updating a user
        try{
            const response = await APIService.getUsers()
            setData(response.data);
        }
        catch(error) {
            console.error(error);
        }
        handleClose();
    }

    //handle Delete buttton
    const handleDelete = (userId) => {
        if (window.confirm("Are you sure to delete this user?")) {
          // Delete the user using the APIService function
          APIService.deleteUser(userId)
            .then(() => {
              // If the deletion is successful, update the user list
              const updatedData = data.filter((user) => user.userID !== userId);
              setData(updatedData);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };

    //handle Edit button 
    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = (user) => {
        setEditingUser(user);
        handleShow();
    };
      
    //Show and hide edit form modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleFirstPage = () => {
        handlePageChange(1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        handlePageChange(totalPages);
    };

    return (
        <Fragment>
            <div className="header">
                <h1>User Management System</h1>
                <Form onSave={refreshUserData}/>
            </div>
            <hr/>
            
            <div className="paginator">
                <Pagination>
                    <Pagination.First onClick={handleFirstPage}/>
                    <Pagination.Prev onClick={handlePreviousPage}/>
                    {data.length > itemsPerPage && (
                        Array.from({ length: totalPages
                        }, (_, i) => (
                            <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>{i + 1}</Pagination.Item>
                        ))
                    )}
                    <Pagination.Next onClick={handleNextPage}/>
                    <Pagination.Last onClick={handleLastPage}/>
                </Pagination>
            </div>
            

            <Table striped bordered hover>
                <caption>Total users: {data.length}</caption>
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
                        currentData && data.length > 0 ?
                        currentData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone_number}</td>
                                    <td>{item.skillsets}</td> 
                                    <td>{item.hobby}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-warning m-1" onClick={() => handleEdit(item)}>Edit</button>
                                        <button className="btn btn-danger m-1" onClick={() => handleDelete(item.userID)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        (
                            <tr>
                              <td colSpan={7}><i>Loading...</i></td>
                            </tr>
                        )
                    }
                </tbody> 
            </Table>

            <div className="paginator">
                <Pagination>
                    <Pagination.First onClick={handleFirstPage}/>
                    <Pagination.Prev onClick={handlePreviousPage}/>
                    {data.length > itemsPerPage && (
                        Array.from({ 
                            length: totalPages
                        }, (_, i) => (
                            <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>{i + 1}</Pagination.Item>
                        ))
                    )}
                    <Pagination.Next onClick={handleNextPage}/>
                    <Pagination.Last onClick={handleLastPage}/>
                </Pagination>
            </div>

            <Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Update User Info</Modal.Title>
                </Modal.Header>
                <Modal.Body><Form onSave={refreshUserData} editingUser={editingUser}/></Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Users;
