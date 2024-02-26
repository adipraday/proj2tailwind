import axios from "axios";
import ApiUrl from "../config/ApiUrl";

const axiosJWT = axios.create();

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addDoc = (itemData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return axios
    .post(`${ApiUrl.API_BASE_URL}/uploaddoc`, itemData, headers)
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

const getDocsBySubject = async (id, subject) => {
  try {
    const resDocs = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getdocbysubject/${id}/${subject}`
    );
    return resDocs.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching work orders:", error);
    return null;
  }
};
export { getDocsBySubject };

////////////////////////////////////////////////////////////////////////////////////////////////////////

const hapusDocById = async (id) => {
  try {
    const response = await axios.delete(
      `${ApiUrl.API_BASE_URL}/deletedoc/${id}`
    );
    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error deleting file:", error);
    throw error;
  }
};

export { hapusDocById };

////////////////////////////////////////////////////////////////////////////////////////////////////////
