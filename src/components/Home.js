import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  UsersIcon,
  UserCircleIcon,
  RssIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import ApiUrl from "../config/ApiUrl";

const Home = () => {
  const [name, setName] = useState("");
  const [, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [availabletechnician, setAvailableTechnician] = useState("");
  const [logactivity, setLogActivity] = useState("");

  const [absensis, setAbsensis] = useState([]);

  const navigate = useNavigate();
  const axiosJWT = axios.create();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${ApiUrl.API_BASE_URL}/token`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`${ApiUrl.API_BASE_URL}/token`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        setToken(response.accessToken);
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

  useEffect(() => {
    getAbsensis();
    // eslint-disable-next-line
  }, []);
  const getAbsensis = async () => {
    const resAbsensis = await axiosJWT.get(`${ApiUrl.API_BASE_URL}/absensi`);
    setAbsensis(resAbsensis.data);
  };

  useEffect(() => {
    getAvailableTechnician();
    // eslint-disable-next-line
  }, []);
  const getAvailableTechnician = async () => {
    const resAvailableTechnician = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getavailabletechnician`
    );
    setAvailableTechnician(resAvailableTechnician.data);
  };

  useEffect(() => {
    getLogActivity();
    // eslint-disable-next-line
  }, []);
  const getLogActivity = async () => {
    const resLogActivity = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getdashboardact`
    );
    setLogActivity(resLogActivity.data);
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-7 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-1">
          Dashboard
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List>
            <Tab
              className="inline-block px-6 py-2.5 bg-gray-300 
                    font-medium text-xs leading-tight 
                    uppercase shadow-md hover:bg-gray-500 
                    hover:shadow-lg focus:bg-gray-500 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-gray-800 
                    active:shadow-lg transition duration-150 ease-in-out ml-2"
            >
              <RssIcon className="h-7 w-7 fill-blue-600 -mb-5" />
              <p className="ml-7 text-white">Activity</p>
            </Tab>
            <Tab
              className="inline-block px-6 py-2.5 bg-gray-300 
                    font-medium text-xs leading-tight 
                    uppercase shadow-md hover:bg-gray-500 
                    hover:shadow-lg focus:bg-gray-500 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-gray-800 
                    active:shadow-lg transition duration-150 ease-in-out ml-2"
            >
              <InformationCircleIcon className="h-7 w-7 fill-green-600 -mb-5" />
              <p className="ml-7 text-white">Teknisi Tersedia</p>
            </Tab>
            <Tab
              className="inline-block px-6 py-2.5 bg-gray-300 
                    font-medium text-xs leading-tight 
                    uppercase shadow-md hover:bg-gray-500 
                    hover:shadow-lg focus:bg-gray-500 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-gray-800 
                    active:shadow-lg transition duration-150 ease-in-out ml-2"
            >
              <UsersIcon className="h-7 w-7 fill-red-600 -mb-5" />
              <p className="ml-7 text-white">Absensi</p>
            </Tab>
          </Tab.List>
          <br />
          <Tab.Panels className="h-200">
            <Tab.Panel>
              {Object.values(logactivity).map((logactivity) => (
                <div
                  className="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3"
                  role="alert"
                  key={logactivity.id}
                >
                  <RssIcon className="h-7 w-7 fill-blue-600 -mb-9" />
                  <p className="ml-8 text-cyan-700">{logactivity.act_desk}</p>
                  <p className="ml-8 text-cyan-600">
                    Status : {logactivity.status}
                  </p>
                  <p className="ml-8 text-stone-500">
                    at : {logactivity.updatedAt}
                  </p>
                </div>
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {Object.values(availabletechnician).map((availabletechnician) => (
                <div
                  className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3"
                  role="alert"
                  key={availabletechnician.id}
                >
                  <InformationCircleIcon className="h-7 w-7 fill-green-600 -mb-6" />
                  <p className="ml-8 text-slate-600">
                    Saat ini {availabletechnician.name} {"("}
                    {availabletechnician.jobdesk}
                    {")"} {availabletechnician.status}
                  </p>
                </div>
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {absensis.map((absensi) => (
                <div
                  className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
                  role="alert"
                  key={absensi.id}
                >
                  <UserCircleIcon className="h-7 w-7 fill-red-600 -mb-9" />
                  <p className="ml-8">
                    {absensi.nama} {absensi.keterangan} pada tanggal{" "}
                    {absensi.tgl_absensi}
                  </p>
                  <p className="ml-8">dengan keterangan {absensi.note}</p>
                </div>
              ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Home;
