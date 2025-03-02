import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api"; // Correct base URL

export const submitPhoto = (photoData) => axios.post(`${API_URL}/create_photo/`, photoData); // Change URL to /create_photo/
export const getPhotos = () => axios.get(`${API_URL}/photos/`); // This is correct
export const deletePhoto = (id) => axios.delete(`${API_URL}/delete_photo/${id}/`); // Correct delete URL
export const updatePhoto = (id, data) => axios.put(`${API_URL}/edit_photo/${id}/`, data); // Correct update URL
export const getProgress = (id) => axios.get(`${API_URL}/progress/${id}/`); // Correct progress URL
