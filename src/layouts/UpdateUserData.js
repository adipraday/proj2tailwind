import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TokenService from "../services/TokenService";
import {
  CheckCircleIcon,
  ExclamationIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";
import { updateUserData } from "../services/UserServices";
import { getUserInfo } from "../services/UserServices";

const UpdateUserData = () => {
  const navigate = useNavigate();
  const { name } = TokenService();
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [userdata, setUserData] = useState("");

  // form update progress WorkOrder
  const username = useRef();
  const namee = useRef();
  const jobdesk = useRef();
  const aktifSejak = useRef();
  const whatsapp = useRef();
  const telp = useRef();
  const status = useRef();

  useEffect(() => {
    // Check if id is truthy before making the API call
    if (id) {
      fetchUserData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Add id as a dependency to the useEffect dependency array

  const fetchUserData = async (id) => {
    const userData = await getUserInfo(id);
    if (userData) {
      setUserData(userData);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to update the item
      const response = await updateUserData({
        id: id,
        username: username.current.value,
        name: namee.current.value,
        jobdesk: jobdesk.current.value,
        aktifSejak: aktifSejak.current.value,
        whatsapp: whatsapp.current.value,
        telp: telp.current.value,
        status: status.current.value,
      });
      console.log(response);
      alert("Data user telah berhasil diperbaharui");
      setMsg(response.msg);
      setTimeout(() => {
        setMsg("");
      }, 20000);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Update data user gagal");
    }
  };

  const BtTeam = () => {
    navigate("/team");
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          Update User Data
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="mt-2 ml-2">
        <button
          onClick={BtTeam}
          className="py-2 px-4 border border-transparent text-sm font-medium 
          rounded-md text-white bg-green-400 hover:bg-green-500 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
        >
          {"<<"} Kembali
        </button>
      </div>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {msg && (
            <div className="text-center rounded-lg border-4 border-sky-100 border-l-sky-300">
              <CheckCircleIcon className="h-6 w-6 fill-blue-500 -mb-5" />
              <p className="m-3 text-slate-500">{msg}</p>
            </div>
          )}
          {error && (
            <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300">
              <ExclamationIcon className="h-6 w-6 fill-red-500 -mb-5" />
              <p className="m-3 text-slate-500">{error}</p>
            </div>
          )}
          {Object.values(userdata).map((ud) => (
            <form
              id="form_register"
              key={ud.id}
              className="mt-8 space-y-6"
              encType="multipart/form-data"
              onSubmit={handleUpdate}
            >
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="text-slate-800">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    defaultValue={ud.username}
                    ref={username}
                    required
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="name" className="text-slate-800">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nama Lengkap"
                    defaultValue={ud.name}
                    ref={namee}
                    required
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="jobdesk" className="text-slate-800">
                    Job Desk
                  </label>
                  <select
                    id="jobdesk"
                    className="form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    defaultValue={ud.jobdesk}
                    ref={jobdesk}
                    required
                  >
                    <option value="">Job Desk</option>
                    <option value="NOC">NOC</option>
                    <option value="Network Enginer">Network Enginer</option>
                    <option value="Lead Network Enginer">
                      Lead Network Enginer
                    </option>
                  </select>
                </div>
                <br />
                <div>
                  <label htmlFor="aktifSejak" className="text-slate-800">
                    Aktif Sejak
                  </label>
                  <input
                    type="date"
                    id="aktifSejak"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Aktif Sejak"
                    defaultValue={ud.aktifSejak}
                    ref={aktifSejak}
                    required
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="whatsapp" className="text-slate-800">
                    WhatsApp Contact
                  </label>
                  <input
                    type="text"
                    id="whatsapp"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="WhatsApp Contact"
                    defaultValue={ud.whatsapp}
                    ref={whatsapp}
                    required
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="telp" className="text-slate-800">
                    Nomor Telp
                  </label>
                  <input
                    type="text"
                    id="telp"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nomor Telp"
                    defaultValue={ud.telp}
                    ref={telp}
                    required
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="status" className="text-slate-800">
                    Status
                  </label>
                  <select
                    id="status"
                    className="form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    defaultValue={ud.status}
                    ref={status}
                    required
                  >
                    <option value="">Status</option>
                    <option value="Available">Available</option>
                    <option value="Not Active">Not Active</option>
                  </select>
                </div>
                <br />
                <br />
                <br />
              </div>

              <div>
                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Update
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpdateUserData;
