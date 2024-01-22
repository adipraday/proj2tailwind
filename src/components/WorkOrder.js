import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import {
  UserCircleIcon,
  MapIcon,
  DocumentAddIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import ApiUrl from "../config/ApiUrl";

const WorkOrder = () => {
  const navigate = useNavigate();
  const axiosJWT = axios.create();

  const [name, setName] = useState("");
  const [, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [userId, setUserId] = useState("");
  const [workorders, setWorkOrders] = useState("");

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
        setUserId(decoded.userId);
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
    getWorkOrder();
    // eslint-disable-next-line
  }, []);

  const getWorkOrder = async () => {
    const resWorkOrders = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/workorders`
    );
    setWorkOrders(resWorkOrders.data);
  };

  const hapusDataWO = async (id) => {
    const user_id = userId;
    try {
      await axios
        .put(`${ApiUrl.API_BASE_URL}/deleteworkorder/${id}/${user_id}`)
        .then(() => {
          window.location.reload(false);
          return alert("Data telah dihapus");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const terbitkanWO = async (id) => {
    navigate(`/terbitkanwo/${id}`);
  };

  const GtAddWo = () => {
    navigate("/addworkorder");
  };

  const Gtriwayatwo = () => {
    navigate("/riwayatworkorder");
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          Work Orders
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="container flex justify-end mx-auto bg-gray-50 p-8 antialiased">
        <button
          className="group relative py-2 px-4 border border-transparent text-sm font-medium 
                            rounded-md text-white bg-green-400 hover:bg-green-500 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
          onClick={Gtriwayatwo}
        >
          Lihat Riwayat Pengerjaan / WorkOrders
        </button>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <button
          onClick={() => GtAddWo()}
          className="inline-block px-6 py-2.5 bg-blue-600 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-blue-700 
                                                hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-blue-800 
                                                active:shadow-lg transition duration-150 ease-in-out"
        >
          + Add Work Order
        </button>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-blue-100 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <p className="ml-7 text-slate-500">#</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <UserCircleIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Cust Info</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <MapIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Location</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <DocumentAddIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Description</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <InformationCircleIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Status</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        .
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(workorders).map((workorder, index) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={workorder.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}.
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>
                            {workorder.nama_client} / {workorder.id_pelanggan}
                          </b>
                          <br />
                          {workorder.email} / {workorder.contact_person}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{workorder.alamat}</b>
                          <br />
                          {workorder.tikor}
                          <br />
                          {workorder.link_tikor}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{workorder.paket_berlangganan}</b>
                          <br />
                          {workorder.label_fat}
                          <br />
                          {workorder.note}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{workorder.status}</b>
                          <br />
                          {workorder.updatedAt}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => terbitkanWO(workorder.id)}
                            className="inline-block px-6 py-2.5 bg-green-600 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-green-700 
                                                hover:shadow-lg focus:bg-green-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-yellow-800 
                                                active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Update
                          </button>{" "}
                          <button
                            onClick={() => hapusDataWO(workorder.id)}
                            className="inline-block px-6 py-2.5 bg-red-600 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-red-700 
                                                hover:shadow-lg focus:bg-red-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-green-800 
                                                active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOrder;
