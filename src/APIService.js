import axios from 'axios';

const API_BASE_URL = 'http://localhost:5191'; // Replace with your API base URL

const APIService = {
    // Fetch all users
    getUsers: () => {
        return axios.get(`${API_BASE_URL}/api/User`);
    },

    // Create a new user
    createUser: (userData) => {
        return axios.post(`${API_BASE_URL}/api/User`, userData);
    },

    // Update an existing user by ID
    updateUser: (userId, userData) => {
        return axios.put(`${API_BASE_URL}/api/User/${userId}`, userData);
    },

    // Delete a user by ID
    deleteUser: (userId) => {
        return axios.delete(`${API_BASE_URL}/api/User/${userId}`);
    },
};

export default APIService;
