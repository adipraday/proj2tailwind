import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { deleteFat, getFats } from "../services/FatServices";
import {
  CheckCircleIcon,
  ExclamationIcon,
  TagIcon,
  QrcodeIcon,
  MapIcon,
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  UsersIcon,
} from "@heroicons/react/solid";

const Fat = () => {
  const setName = useState("");
  const setToken = useState("");
  const [expire, setExpire] = useState("");

  const [msg, setMsg] = useState("");
  const [error] = useState("");

  const navigate = useNavigate();
  const axiosJWT = axios.create();

  const [fats, setFats] = useState([]);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.get("http://localhost:5000/token");
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
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `bearer ${response.data.accessToken}`;
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
    let mounted = true;
    getFats().then((fats) => {
      if (mounted) {
        setFats(fats);
      }
    });
    return () => (mounted = false);
  }, []);

  const GtAddFat = () => {
    navigate("/addfat");
  };

  const GtUpdateFat = async (id) => {
    navigate(`/updatefat/${id}`);
  };

  const handleDeleteFat = (fatId) => {
    deleteFat(fatId)
      .then((response) => {
        // Remove the deleted item from the local state
        setFats(fats.filter((fat) => fat.id !== fatId));
        setMsg(response.msg);
        setTimeout(() => {
          setMsg("");
        }, 15000);
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-1">
          FAT
        </h1>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <button
          onClick={() => GtAddFat()}
          className="inline-block px-6 py-2.5 bg-blue-600 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-blue-700 
                                                hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-blue-800 
                                                active:shadow-lg transition duration-150 ease-in-out"
        >
          + Add FAT
        </button>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {msg && (
                  <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300 mb-5">
                    <CheckCircleIcon className="h-6 w-6 fill-rose-500 -mb-5" />
                    <p className="m-3 text-slate-500">{msg}</p>
                  </div>
                )}
                {error && (
                  <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300 mb-5">
                    <ExclamationIcon className="h-6 w-6 fill-red-500 -mb-5" />
                    <p className="m-3 text-slate-500">{error}</p>
                  </div>
                )}
                <table className="min-w-full">
                  <thead className="bg-blue-100 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <TagIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Fat Label / ID</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <QrcodeIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Fat Tikor</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <MapIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Fat Area</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <ArrowCircleDownIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Fat Input</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">
                          Fat Output Capacity
                        </p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <UsersIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Fat Output Used</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <CheckCircleIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">
                          Fat Output Available
                        </p>
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
                    {fats.map((fat, index) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={fat.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}.
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {fat.fat_label}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {fat.fat_id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {fat.fat_area}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {fat.fat_input}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {fat.fat_output_capacity}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {fat.fat_output_used}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {fat.fat_output_available}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => GtUpdateFat(fat.id)}
                            className="inline-block px-6 py-2.5 bg-green-600 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-green-700 
                                                hover:shadow-lg focus:bg-green-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-green-green 
                                                active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteFat(fat.id)}
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

export default Fat;
