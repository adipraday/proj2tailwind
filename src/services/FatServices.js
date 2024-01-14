// services.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getFats = () => {
  return axios
    .get(`${API_BASE_URL}/getfat`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching list:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

export const getAvailableFat = () => {
  return axios
    .get(`${API_BASE_URL}/getavailablefat`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching list:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

export const getFatById = (itemId) => {
  return axios
    .get(`${API_BASE_URL}/getfat/${itemId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`Error fetching item with ID ${itemId}:`, error);
      throw error;
    });
};

export const addFat = (itemData) => {
  return axios
    .post(`${API_BASE_URL}/addfat`, { ...itemData })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

export const updateDataFat = (itemId, fatData) => {
  return axios
    .patch(`${API_BASE_URL}/updatefat/${itemId}`, { ...fatData })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating item:", error);
      throw error;
    });
};

export const deleteFat = (itemId) => {
  return axios
    .delete(`${API_BASE_URL}/deletefat/${itemId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
};
