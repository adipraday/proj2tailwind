import axios from "axios";
import ApiUrl from "../config/ApiUrl";

export const getWoTimeline = (itemData) => {
  return axios
    .post(`${ApiUrl.API_BASE_URL}/gettimeline`, { ...itemData })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};
