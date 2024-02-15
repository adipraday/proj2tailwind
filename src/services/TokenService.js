import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiUrl from "../config/ApiUrl";

const axiosJWT = axios.create(); // Create a new instance of axios for JWT requests

const TokenService = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobdesk, setJobdesk] = useState("");
  const [profilepict, setProfilePict] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${ApiUrl.API_BASE_URL}/token`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUserId(decoded.userId);
      setName(decoded.name);
      setEmail(decoded.email);
      setJobdesk(decoded.jobdesk);
      setProfilePict(decoded.profilepicture);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line
  }, []);

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`${ApiUrl.API_BASE_URL}/token`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return { userId, name, email, jobdesk, profilepict, token, expire };
};

export default TokenService;
