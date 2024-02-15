import axios from "axios";
import ApiUrl from "../config/ApiUrl";

const axiosJWT = axios.create();

////////////////////////////////////////////////////////////////////////////////////////////////////////

const getWoDismantles = async () => {
  try {
    const resDismantles = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/dismantleworkorders`
    );
    return resDismantles.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching work orders:", error);
    return null;
  }
};
export { getWoDismantles };

////////////////////////////////////////////////////////////////////////////////////////////////////////

const getWoDismantleById = async (id) => {
  try {
    const resDismantles = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/dismantleworkorder/${id}`
    );
    return resDismantles.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching work orders:", error);
    return null;
  }
};
export { getWoDismantleById };

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addDismantle = (itemData) => {
  return axios
    .post(`${ApiUrl.API_BASE_URL}/addwodismantle`, { ...itemData })
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateDismantle = (itemData) => {
  return axios
    .put(`${ApiUrl.API_BASE_URL}/updatewodismantle`, { ...itemData })
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateProgressDismantle = (itemData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return axios
    .put(`${ApiUrl.API_BASE_URL}/updateprogresswod`, itemData, headers)
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addTechnicianDismantle = (itemData) => {
  return axios
    .post(`${ApiUrl.API_BASE_URL}/addteknisiwodismantle`, { ...itemData })
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

const getTeknisiWoDismantle = async (id) => {
  try {
    const resTeknisiWODismantle = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getteknisiwod/${id}`
    );
    return resTeknisiWODismantle.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching teknisi wo:", error);
    return null;
  }
};

export { getTeknisiWoDismantle };

////////////////////////////////////////////////////////////////////////////////////////////////////////

const hapusDataTeknisiWoDismantle = async (another_act_id, act_id) => {
  try {
    const response = await axios.delete(
      `${ApiUrl.API_BASE_URL}/deleteteknisiwod/${another_act_id}/${act_id}`
    );
    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error deleting teknisi wo:", error);
    throw error;
  }
};

export { hapusDataTeknisiWoDismantle };

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteWoDismantle = (id, userId) => {
  return axios
    .put(`${ApiUrl.API_BASE_URL}/deletewodismantle/${id}/${userId}`)
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error delete item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

const getRiwayatDismantles = async () => {
  try {
    const resDismantles = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/riwayatwodismantle`
    );
    return resDismantles.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching work orders:", error);
    return null;
  }
};
export { getRiwayatDismantles };

////////////////////////////////////////////////////////////////////////////////////////////////////////
