import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL;

// Ensure token is attached to all requests
const getAuthHeaders = () => {
  const token = localStorage.getItem(config.TOKEN_KEY);
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

export const taskService = {
  getAllTasks: async () => {
    const response = await axios.get(`${API_URL}/tasks`, getAuthHeaders());
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData, getAuthHeaders());
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, getAuthHeaders());
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
    return response.data;
  },
}; 