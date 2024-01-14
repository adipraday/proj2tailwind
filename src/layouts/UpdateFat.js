import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getFatById, updateDataFat } from "../services/FatServices";
import { ExclamationIcon } from "@heroicons/react/solid";

const UpdateFat = () => {
  const navigate = useNavigate();
  const { id } = useParams("");

  const setName = useState("");
  const setToken = useState("");
  const setExpire = useState("");

  const [fats, setFats] = useState("");

  const refFatLabel = useRef();
  const refFatId = useRef();
  const refFatArea = useRef();
  const refFatInput = useRef();
  const refFatOutputCapacity = useRef();
  const refFatOutputUsed = useRef();
  const refFatOutputAvailable = useRef();

  const [error, setError] = useState("");

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line
  }, []);

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

  useEffect(() => {
    // Fetch the item details by ID when the component mounts
    getFatById(id)
      .then((response) => {
        setFats(response);
        console.log(response);
      })
      .catch((error) =>
        console.error(`Error fetching item with ID ${id}:`, error)
      );
  }, [id]);

  const editFat = (e) => {
    e.preventDefault();

    // Get updated values from refs
    const updatedFatLabel = refFatLabel.current.value;
    const updatedFatId = refFatId.current.value;
    const updatedFatArea = refFatArea.current.value;
    const updatedFatInput = refFatInput.current.value;
    const updatedFatOutputCapacity = refFatOutputCapacity.current.value;
    const updatedFatOutputUsed = refFatOutputUsed.current.value;
    const updatedFatOutputAvailable = refFatOutputAvailable.current.value;

    // Make a POST request to add a new item
    updateDataFat(id, {
      fat_label: updatedFatLabel,
      fat_id: updatedFatId,
      fat_area: updatedFatArea,
      fat_input: updatedFatInput,
      fat_output_capacity: updatedFatOutputCapacity,
      fat_output_used: updatedFatOutputUsed,
      fat_output_available: updatedFatOutputAvailable,
    })
      .then(() => {
        navigate("/fat");
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setError("Failed updating item:", error);
        setTimeout(() => {
          setError("");
        }, 15000);
      });
  };

  const BtTf = () => {
    navigate("/fat");
  };

  return (
    <>
      <div className="container mx-auto bg-gray-400 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-10">
          Update FAT
        </h1>
      </div>

      <div className="mt-2 ml-2">
        <button
          onClick={BtTf}
          className="py-2 px-4 border border-transparent text-sm font-medium 
          rounded-md text-white bg-green-600 hover:bg-green-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {"<<"} Kembali
        </button>
      </div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {Object.values(fats).map((fat) => (
            <form className="mt-8 space-y-6" onSubmit={editFat} key={fat.id}>
              {error && (
                <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300">
                  <ExclamationIcon className="h-6 w-6 fill-red-500 -mb-5" />
                  <p className="m-3 text-slate-500">{error}</p>
                </div>
              )}
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label className="sr-only">FAT Label</label>
                  <input
                    key={fat.id}
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="FAT Label"
                    defaultValue={fat.fat_label}
                    ref={refFatLabel}
                    required
                  />
                </div>
                <br />
                <div>
                  <label className="sr-only">FAT Id</label>
                  <input
                    key={fat.id}
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="FAT Id"
                    defaultValue={fat.fat_id}
                    ref={refFatId}
                    required
                  />
                </div>
                <br />
                <div>
                  <label className="sr-only">FAT Area</label>
                  <textarea
                    key={fat.id}
                    defaultValue={fat.fat_area}
                    ref={refFatArea}
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
                    key={fat.id}
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Masukkan Id FAT Input"
                    defaultValue={fat.fat_input}
                    ref={refFatInput}
                    required
                  />
                </div>
                <br />
                <div>
                  <label className="sr-only">FAT Capacity</label>
                  <input
                    key={fat.id}
                    type="number"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="FAT Output Capacity"
                    defaultValue={fat.fat_output_capacity}
                    ref={refFatOutputCapacity}
                    required
                  />
                </div>
                <br />
                <div>
                  <label className="sr-only">FAT Used / Terpakai</label>
                  <input
                    key={fat.id}
                    type="number"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="FAT Output Used / Terpakai"
                    defaultValue={fat.fat_output_used}
                    ref={refFatOutputUsed}
                    required
                  />
                </div>
                <br />
                <div>
                  <label className="sr-only">
                    FAT Output Available / Tersedia
                  </label>
                  <input
                    key={fat.id}
                    type="number"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="FAT Output Available / Tersedia"
                    defaultValue={fat.fat_output_available}
                    ref={refFatOutputAvailable}
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
          ))}
        </div>
      </div>
    </>
  );
};

export default UpdateFat;
