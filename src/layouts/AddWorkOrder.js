import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ApiUrl from "../config/ApiUrl";

const AddWorkOrder = () => {
  const navigate = useNavigate();
  const axiosJWT = axios.create();

  const [, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [no_wo, setNo_wo] = useState("");
  const [nama_client, setNama_client] = useState("");
  const [id_pelanggan, setId_pelanggan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [contact_person, setContact_person] = useState("");
  const [email, setEmail] = useState("");
  const [tikor, setTikor] = useState("");
  const [link_tikor, setLink_tikor] = useState("");
  const [paket_berlangganan, setPaket_berlangganan] = useState("");
  const [note, setNote] = useState("");
  const [label_fat, setLabel_fat] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

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

  const saveWorkOrder = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${ApiUrl.API_BASE_URL}/addworkorder`, {
          user_id: userId,
          no_wo: no_wo,
          nama_client: nama_client,
          id_pelanggan: id_pelanggan,
          alamat: alamat,
          contact_person: contact_person,
          email: email,
          tikor: tikor,
          link_tikor: link_tikor,
          paket_berlangganan: paket_berlangganan,
          note: note,
          label_fat: label_fat,
          status: "Waiting List",
        })
        .then((response) => {
          setNo_wo("");
          setNama_client("");
          setId_pelanggan("");
          setAlamat("");
          setContact_person("");
          setEmail("");
          setTikor("");
          setLink_tikor("");
          setPaket_berlangganan("");
          setNote("");
          setLabel_fat("");
          setMsg(response.data.msg);
          navigate("/workorder");
          return alert("Data WorkOrder berhasil tersimpan");
        });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const BtWorkOrder = () => {
    navigate("/workorder");
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          Tambah Work Order
        </h1>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <button
          onClick={BtWorkOrder}
          className="py-2 px-4 border border-transparent text-sm font-medium 
          rounded-md text-white bg-green-600 hover:bg-green-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {"<<"} Kembali
        </button>
      </div>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={saveWorkOrder}>
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
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">Nomor Work Order</label>
                <input
                  type="text"
                  id="fiwo_no_wo"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nomor Work Order"
                  value={no_wo}
                  onChange={(e) => setNo_wo(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">Nama Client</label>
                <input
                  type="text"
                  id="fiwo_nama_client"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nama Client"
                  value={nama_client}
                  onChange={(e) => setNama_client(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">ID Pelanggan</label>
                <input
                  type="text"
                  id="fiwo_id_pelanggan"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="ID Pelanggan"
                  value={id_pelanggan}
                  onChange={(e) => setId_pelanggan(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">Alamat</label>
                <textarea
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="fiwo_alamat"
                  rows="3"
                  placeholder="Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                ></textarea>
              </div>
              <br />
              <div>
                <label className="sr-only">Contact Number</label>
                <input
                  type="text"
                  id="fiwo_contact_person"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contact Number"
                  value={contact_person}
                  onChange={(e) => setContact_person(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">Email</label>
                <input
                  type="email"
                  id="fiwo_email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">Titik Kordinat</label>
                <textarea
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="fiwo_tikor"
                  rows="3"
                  placeholder="Titik Kordinat"
                  value={tikor}
                  onChange={(e) => setTikor(e.target.value)}
                  required
                ></textarea>
              </div>
              <br />
              <div>
                <label className="sr-only">Link Titik Kordinat</label>
                <input
                  type="text"
                  id="fiwo_link_tikor"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Link Titik Kordinat"
                  value={link_tikor}
                  onChange={(e) => setLink_tikor(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">Paket Berlangganan</label>
                <input
                  type="text"
                  id="fiwo_paket_berlangganan"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Paket Berlangganan"
                  value={paket_berlangganan}
                  onChange={(e) => setPaket_berlangganan(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">Note</label>
                <textarea
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="fiwo_note"
                  rows="3"
                  placeholder="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
              <br />
              <div>
                <label className="sr-only">Link FAT Tikor</label>
                <input
                  type="text"
                  id="fiwo_fat_tikor"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Masukkan Link FAT Tikor"
                  value={label_fat}
                  onChange={(e) => setLabel_fat(e.target.value)}
                />
              </div>
              <br />
              <br />
            </div>
            <div>
              <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Simpan
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddWorkOrder;
