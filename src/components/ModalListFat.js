import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { ViewListIcon, XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Dialog, Transition } from "@headlessui/react";
import { getAvailableFat } from "../services/FatServices";

const ModalListFat = () => {
  const navigate = useNavigate();

  const [, setName] = useState("");
  const [, setToken] = useState("");
  const [, setExpire] = useState("");

  const [availablefats, setAvailableFats] = useState([]);

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
    let mounted = true;
    getAvailableFat().then((availablefats) => {
      if (mounted) {
        setAvailableFats(availablefats);
      }
    });
    return () => (mounted = false);
  }, []);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-block px-6 py-2.5 bg-green-400 
                text-white font-medium text-xs leading-tight 
                uppercase rounded-full shadow-md hover:bg-green-500 
                hover:shadow-lg focus:bg-green-700 focus:shadow-lg 
                focus:outline-none focus:ring-0 active:bg-green-600 
                active:shadow-lg transition duration-150 ease-in-out
                btn-lg float-right bottom"
      >
        <ViewListIcon className="h-7 w-7" />
        <p className="ml-7 -mt-5">List FAT Tersedia</p>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-10"
                  >
                    <button
                      type="button"
                      className="absolute top-0 right-0 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 item-right"
                      onClick={closeModal}
                    >
                      <XCircleIcon className="h-6 w-6" />
                    </button>
                    <br />
                    Available FAT (FAT yang tersedia)
                  </Dialog.Title>
                  <div className="mt-2">
                    {availablefats.map((fat, index) => (
                      <div key={fat.id || index}>
                        <p>
                          {fat.fat_label} / {fat.fat_id} /{" "}
                          {fat.fat_output_available}
                        </p>
                        <button
                          className="inline-block px-6 py-2.5 bg-green-600 
                            text-white font-medium text-xs leading-tight 
                            uppercase rounded-full shadow-md hover:bg-green-700 
                            hover:shadow-lg focus:bg-green-700 focus:shadow-lg 
                            focus:outline-none focus:ring-0 active:bg-green-green 
                            active:shadow-lg transition duration-150 ease-in-out"
                        >
                          Copy FAT ID
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <XCircleIcon className="h-6 w-6" /> Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalListFat;
