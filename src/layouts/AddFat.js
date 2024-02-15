import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { addFat } from "../services/FatServices";
import TokenService from "../services/TokenService";

const AddFat = () => {
  const navigate = useNavigate();
  const { name } = TokenService();

  const [fat_label, setFat_label] = useState("");
  const [fat_id, setFat_id] = useState("");
  const [fat_area, setFat_area] = useState("");
  const [fat_input, setFat_input] = useState("");
  const [fat_output_capacity, setFat_output_capacity] = useState("");
  const [fat_output_used, setFat_output_used] = useState("");
  const [fat_output_available, setFat_output_available] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submitFat = (e) => {
    e.preventDefault();

    // Make a POST request to add a new item
    addFat({
      fat_label,
      fat_id,
      fat_area,
      fat_input,
      fat_output_capacity,
      fat_output_used,
      fat_output_available,
    })
      .then((response) => {
        // Clear the input fields
        setFat_label("");
        setFat_id("");
        setFat_area("");
        setFat_input("");
        setFat_output_capacity("");
        setFat_output_used("");
        setFat_output_available("");
        setMsg(response.msg);
        setTimeout(() => {
          setMsg("");
        }, 15000);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        setError("Failed updating item:", error);
        setTimeout(() => {
          setError("");
        }, 15000);
      });
  };

  const BtFat = () => {
    navigate("/fat");
  };

  return (
    <>
      <div className="container mx-auto bg-gray-400 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-10">
          Add FAT
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <button
          onClick={BtFat}
          className="py-2 px-4 border border-transparent text-sm font-medium 
          rounded-md text-white bg-green-600 hover:bg-green-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {"<<"} Kembali
        </button>
      </div>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={submitFat}>
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
                <label className="sr-only">FAT Label / ID</label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="FAT Label / ID"
                  value={fat_label}
                  onChange={(e) => setFat_label(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">FAT Tikor</label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="FAT Tikor"
                  value={fat_id}
                  onChange={(e) => setFat_id(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">FAT Area</label>
                <textarea
                  value={fat_area}
                  onChange={(e) => setFat_area(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="FAT Area"
                ></textarea>
              </div>
              <br />
              <div>
                <label className="sr-only">FAT Input</label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Masukkan Id FAT Input"
                  value={fat_input}
                  onChange={(e) => setFat_input(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">FAT Capacity</label>
                <input
                  type="number"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="FAT Output Capacity"
                  value={fat_output_capacity}
                  onChange={(e) => setFat_output_capacity(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">FAT Used / Terpakai</label>
                <input
                  type="number"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="FAT Output Used / Terpakai"
                  value={fat_output_used}
                  onChange={(e) => setFat_output_used(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label className="sr-only">
                  FAT Output Available / Tersedia
                </label>
                <input
                  type="number"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="FAT Output Available / Tersedia"
                  value={fat_output_available}
                  onChange={(e) => setFat_output_available(e.target.value)}
                  required
                />
              </div>
              <br />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFat;
