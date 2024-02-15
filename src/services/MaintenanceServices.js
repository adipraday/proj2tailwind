import axios from "axios";
import ApiUrl from "../config/ApiUrl";

const axiosJWT = axios.create();

// router.get("/maintenancelist", getMaintenance);
// router.get("/maintenancewobyid/:id", getMaintenanceById);
// router.get("/maintenancewoactive", getMaintenanceActive);
// router.get("/maintenancewohistory", getMaintenanceHistory);
// router.post("/addwomaintenance", addWoMaintenance);
// router.put("/updatewomaintenance", updateWoMaintenance);
// router.post("/addteknisiwomaintenance", addTeknisiWoMaintenance);
// router.delete("/deleteteknisiwom/:id/:teknisiId", deleteTeknisiWoMaintenance);
// router.get("/getteknisiwom/:id", getTeknisiWoMaintenance);
// router.put("/updateprogresswom", reportMaintenance);
// router.put("/deletewomaintenance/:id/:userId", deleteMaintenanceById);

////////////////////////////////////////////////////////////////////////////////////////////////////////

const getWoMaintenances = async () => {
  try {
    const resMaintenances = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/maintenancewoactive`
    );
    return resMaintenances.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching work orders:", error);
    return null;
  }
};
export { getWoMaintenances };

////////////////////////////////////////////////////////////////////////////////////////////////////////

const getWoMaintenanceById = async (id) => {
  try {
    const resMaintenance = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/maintenancewobyid/${id}`
    );
    return resMaintenance.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching work orders:", error);
    return null;
  }
};
export { getWoMaintenanceById };

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addMaintenance = (itemData) => {
  return axios
    .post(`${ApiUrl.API_BASE_URL}/addwomaintenance`, { ...itemData })
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateMaintenance = (itemData) => {
  return axios
    .put(`${ApiUrl.API_BASE_URL}/updatewomaintenance`, { ...itemData })
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateProgressMaintenance = (itemData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return axios
    .put(`${ApiUrl.API_BASE_URL}/updateprogresswom`, itemData, headers)
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addTechnicianMaintenance = (itemData) => {
  return axios
    .post(`${ApiUrl.API_BASE_URL}/addteknisiwomaintenance`, { ...itemData })
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

const getTeknisiWoMaintenance = async (id) => {
  try {
    const resTeknisiWOMaintenance = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getteknisiwom/${id}`
    );
    return resTeknisiWOMaintenance.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching teknisi wo:", error);
    return null;
  }
};

export { getTeknisiWoMaintenance };

////////////////////////////////////////////////////////////////////////////////////////////////////////

const hapusDataTeknisiWoMaintenance = async (another_act_id, act_id) => {
  try {
    const response = await axios.delete(
      `${ApiUrl.API_BASE_URL}/deleteteknisiwom/${another_act_id}/${act_id}`
    );
    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error deleting teknisi wo:", error);
    throw error;
  }
};

export { hapusDataTeknisiWoMaintenance };

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteWoMaintenance = (id, userId) => {
  return axios
    .put(`${ApiUrl.API_BASE_URL}/deletewomaintenance/${id}/${userId}`)
    .then((response) => {
      return response.data; // Return the data to handle in the component
    })
    .catch((error) => {
      console.error("Error delete item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

const getHistoryMaintenances = async () => {
  try {
    const resMaintenances = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/maintenancewohistory`
    );
    return resMaintenances.data;
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching work orders:", error);
    return null;
  }
};
export { getHistoryMaintenances };

////////////////////////////////////////////////////////////////////////////////////////////////////////
