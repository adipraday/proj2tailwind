import axios from "axios";
import ApiUrl from "../config/ApiUrl";

const axiosJWT = axios.create();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getAvailableTechnician = async () => {
  try {
    const resAvailableTechnician = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getavailabletechnician`
    );
    return resAvailableTechnician.data;
  } catch (error) {
    console.error("Error fetching available technician:", error);
  }
};
export { getAvailableTechnician };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getTechnicianLeader = async () => {
  try {
    const resTechnicianLeader = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/gettechnicianleader`
    );
    return resTechnicianLeader.data;
  } catch (error) {
    console.error("Error fetching available technician:", error);
  }
};
export { getTechnicianLeader };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getUserInfo = async (id) => {
  try {
    const resUserInfo = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getuserinfo/${id}`
    );
    return resUserInfo.data;
  } catch (error) {
    console.error("Error fetching available technician:", error);
  }
};
export { getUserInfo };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateUserData = (itemData) => {
  return axios
    .put(`${ApiUrl.API_BASE_URL}/updateuser`, { ...itemData })
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateProfilePict = (data) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return axios
    .put(`${ApiUrl.API_BASE_URL}/updateprofilepict`, data, headers)
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getWorkingStatus = (itemData) => {
  return axios
    .put(`${ApiUrl.API_BASE_URL}/workingstatus`, { ...itemData })
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
