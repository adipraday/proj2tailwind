import { useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import {
  UserCircleIcon,
  MapIcon,
  DocumentAddIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import TokenService from "../services/TokenService";
import { getHistoryMaintenances } from "../services/MaintenanceServices";

const RiwayatMaintenance = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const { name } = TokenService();
  const navigate = useNavigate();
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let [isOpen, setIsOpen] = useState(false);
  const [maintenance, setMaintenance] = useState(null);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal(maintenance) {
    setMaintenance(maintenance);
    setIsOpen(true);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [maintenances, setMaintenances] = useState("");
  useEffect(() => {
    fetchWoMaintenances();
  }, []);

  const fetchWoMaintenances = async () => {
    const maintenanceData = await getHistoryMaintenances();
    if (maintenanceData) {
      setMaintenances(maintenanceData);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const BtMaintenance = () => {
    navigate("/workorder");
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-1">
          Riwayat Pengerjaan Maintenance
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="mt-2 ml-2">
        <button
          onClick={BtMaintenance}
          className="py-2 px-4 border border-transparent text-sm font-medium 
          rounded-md text-white bg-green-400 hover:bg-green-500 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
        >
          {"<<"} Kembali
        </button>
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
                    {Object.values(maintenances).map((maintenance, index) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={maintenance.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}.
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>
                            {maintenance.nama_client} /{" "}
                            {maintenance.id_pelanggan}
                          </b>
                          <br />
                          {maintenance.email} / {maintenance.contact_person}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{maintenance.alamat}</b>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>Issues note: </b>
                          {maintenance.first_note}
                          <br />
                          <b>Troubleshoting note: </b>
                          {maintenance.last_note}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{maintenance.status}</b>
                          <br />
                          {maintenance.updatedAt}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => openModal(maintenance)}
                            className="inline-block px-6 py-2.5 bg-blue-400 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-blue-500 
                                                hover:shadow-lg focus:bg-blue-600 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-yellow-500 
                                                active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Detail
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

        <Transition appear show={isOpen} as={Fragment} data={maintenance}>
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
                        className="absolute top-0 right-0 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 item-right"
                        onClick={closeModal}
                      >
                        <XCircleIcon className="h-6 w-6" />
                      </button>
                      <br />
                      Detail Pengerjaan Dismantle
                    </Dialog.Title>
                    <div className="mt-2">
                      {maintenance && (
                        <>
                          <ul className="list-inside ... m-10">
                            <li className="mb-2">
                              <b>No. WO : </b> {maintenance.no_wo}
                            </li>
                            <li className="mb-2">
                              <b>Nama Client : </b> {maintenance.nama_client}
                            </li>
                            <li className="mb-2">
                              <b>ID Pelanggan : </b> {maintenance.id_pelanggan}
                            </li>
                            <li className="mb-2">
                              <b>Alamat : </b> {maintenance.alamat}
                            </li>
                            <li className="mb-2">
                              <b>Contact Person : </b>{" "}
                              {maintenance.contact_person}
                            </li>
                            <li className="mb-2">
                              <b>Email : </b> {maintenance.email}
                            </li>
                            <li className="mb-2">
                              <b>Issues Note : </b> {maintenance.first_note}
                            </li>
                            <li className="mb-2">
                              <b>Troubleshoting Note : </b>{" "}
                              {maintenance.last_note}
                            </li>
                            <li className="mb-2">
                              <b>Update at : </b> {maintenance.updatedAt}
                            </li>
                          </ul>
                          <img
                            className="w-screen rounded-lg shadow-2xl"
                            src={`http://localhost:5000/${maintenance.image_doc_perangkat}`}
                            alt="Documentation"
                          />
                        </>
                      )}
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
      </div>
    </>
  );
};

export default RiwayatMaintenance;
