// services.js
import axios from "axios";
import ApiUrl from "../config/ApiUrl";

export const getBtss = () => {
  return axios
    .get(`${ApiUrl.API_BASE_URL}/getbts`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching list:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

export const getAvailableBts = () => {
  return axios
    .get(`${ApiUrl.API_BASE_URL}/getavailablebts`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching list:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

export const getBtsById = (itemId) => {
  return axios
    .get(`${ApiUrl.API_BASE_URL}/getbts/${itemId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`Error fetching item with ID ${itemId}:`, error);
      throw error;
    });
};

export const addBts = (itemData) => {
  return axios
    .post(`${ApiUrl.API_BASE_URL}/addbts`, { ...itemData })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

export const updateDataBts = (itemId, btsData) => {
  return axios
    .patch(`${ApiUrl.API_BASE_URL}/updatebts/${itemId}`, { ...btsData })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating item:", error);
      throw error;
    });
};

export const deleteBts = (itemId) => {
  return axios
    .delete(`${ApiUrl.API_BASE_URL}/deletebts/${itemId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
};
