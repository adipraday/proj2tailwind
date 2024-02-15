import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import TokenService from "../services/TokenService";
import { addDismantle } from "../services/DismantleServices";

const AddWoDismantle = () => {
  const navigate = useNavigate();
  const { userId, name } = TokenService();

  const [no_wo, setNo_wo] = useState("");
  const [nama_client, setNama_client] = useState("");
  const [id_pelanggan, setId_pelanggan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [contact_person, setContact_person] = useState("");
  const [email, setEmail] = useState("");
  const [input_fat, setInput_fat] = useState("");
  const [client_note, setClient_note] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const saveWoDismantle = async (e) => {
    e.preventDefault();
    try {
      const response = await addDismantle({
        user_id: userId,
        no_wo: no_wo,
        nama_client: nama_client,
        id_pelanggan: id_pelanggan,
        alamat: alamat,
        contact_person: contact_person,
        email: email,
        input_fat: input_fat,
        client_note: client_note,
      });
      setNo_wo("");
      setNama_client("");
      setId_pelanggan("");
      setAlamat("");
      setContact_person("");
      setEmail("");
      setInput_fat("");
      setClient_note("");
      setMsg(response.msg);
      return alert("Data WO Dismantle berhasil tersimpan");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const BtDismantle = () => {
    navigate("/dismantle");
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          Tambah WO Dismantle
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <button
          onClick={BtDismantle}
          className="py-2 px-4 border border-transparent text-sm font-medium 
          rounded-md text-white bg-green-600 hover:bg-green-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {"<<"} Kembali
        </button>
      </div>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={saveWoDismantle}>
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
                <label className="sr-only">Link FAT Tikor</label>
                <input
                  type="text"
                  id="fiwo_fat_tikor"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Masukkan Link FAT Tikor"
                  value={input_fat}
                  onChange={(e) => setInput_fat(e.target.value)}
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
                  value={client_note}
                  onChange={(e) => setClient_note(e.target.value)}
                ></textarea>
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

export default AddWoDismantle;
