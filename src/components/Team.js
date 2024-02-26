import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  UserCircleIcon,
  MailIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ArrowCircleDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import ApiUrl from "../config/ApiUrl";
import TokenService from "../services/TokenService";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const axiosJWT = axios.create();
  const { name, jobdesk, token } = TokenService();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const getUsers = async () => {
    const response = await axiosJWT.get(`${ApiUrl.API_BASE_URL}/users`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  const updateUserData = async (id) => {
    navigate(`/updateuserdata/${id}`);
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          Team
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
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
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <UserCircleIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">User</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <MailIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Email</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <PhoneIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Telp</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <ShieldCheckIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Job Desk</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <ArrowCircleDownIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Aktif Sejak</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <InformationCircleIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Status</p>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={user.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{user.username}</b>
                          <br />
                          {user.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.telp}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.jobdesk}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.aktif_sejak}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.status}
                        </td>
                        <td>
                          {jobdesk === "Lead Network Enginer" && (
                            <button
                              onClick={() => updateUserData(user.id)}
                              className="inline-block px-6 py-2.5 bg-green-400 
                                      text-white font-medium text-xs leading-tight 
                                      uppercase rounded-full shadow-md hover:bg-green-500 
                                      hover:shadow-lg focus:bg-green-500 focus:shadow-lg 
                                      focus:outline-none focus:ring-0 active:bg-yellow-600 
                                      active:shadow-lg transition duration-150 ease-in-out"
                            >
                              Update
                            </button>
                          )}
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

export default Team;
