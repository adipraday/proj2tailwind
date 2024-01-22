import axios from "axios";
import ApiUrl from "../config/ApiUrl";

export const userLogin = (data) => {
  return axios
    .post(`${ApiUrl.API_BASE_URL}/login`, { ...data })
    .then((response) => {
      // Set the access token in local storage
      localStorage.setItem("jwt", response.data.refreshToken);
      // Return the response data
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

export const userRegister = (data) => {
  return axios
    .post(`$${ApiUrl.API_BASE_URL}/register`, { ...data })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};
