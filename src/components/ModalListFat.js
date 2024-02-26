import React from "react";
import { useState, useEffect, useRef, Fragment } from "react";
import { ViewListIcon, XCircleIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { getAvailableFat } from "../services/FatServices";

const ModalListFat = () => {
  const [availablefats, setAvailableFats] = useState([]);

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

  const textRefs = useRef([]); // Ref for storing input refs

  useEffect(() => {
    getAvailableFat().then((fats) => {
      setAvailableFats(fats);
      // Initialize refs for each input
      textRefs.current = fats.map(() => React.createRef());
    });
  }, []);

  const handleCopyClick = async (index) => {
    const label_fat = textRefs.current[index].current.value;
    try {
      // Copy the text to the clipboard
      await navigator.clipboard.writeText(label_fat);
      return alert("FAT label copied");
    } catch (err) {
      console.error("Unable to copy text: ", err);
    }
  };

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
                      <div className="mb-3" key={fat.id || index}>
                        <label id={`copy${fat.id}-${index}`}>
                          {fat.fat_label} / {fat.fat_id} /{" "}
                          {fat.fat_output_available}{" "}
                        </label>
                        <input
                          type="hidden"
                          id={`copy${fat.id}-${index}`}
                          ref={textRefs.current[index]} // Use the corresponding ref
                          value={fat.fat_label}
                        />
                        <button
                          id={`copy${fat.id}-${index}`}
                          className="inline-block px-6 py-2.5 bg-green-600 
                          text-white font-medium text-xs leading-tight 
                          uppercase rounded-full shadow-md hover:bg-green-700 
                          hover:shadow-lg focus:bg-green-700 focus:shadow-lg 
                          focus:outline-none focus:ring-0 active:bg-yellow-800 
                          active:shadow-lg transition duration-150 ease-in-out"
                          onClick={() => handleCopyClick(index)} // Pass the index to the click handler
                        >
                          Copy FAT link
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
