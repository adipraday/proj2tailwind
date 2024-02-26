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
import { getRiwayatDismantles } from "../services/DismantleServices";
import { getDocsBySubject } from "../services/DocsServices";

const RiwayatDismantle = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const { name } = TokenService();
  const navigate = useNavigate();
  const [docs, setDocs] = useState("");
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let [isOpen, setIsOpen] = useState(false);
  const [dismantle, setDismantle] = useState(null);
  const [docsId, setDocsId] = useState(null);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal(dismantle) {
    setDismantle(dismantle);
    setDocsId(dismantle.id);
    setIsOpen(true);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [dismantles, setDismantles] = useState("");
  useEffect(() => {
    fetchWoDismantles();
  }, []);

  const fetchWoDismantles = async () => {
    const dismantleData = await getRiwayatDismantles();
    if (dismantleData) {
      setDismantles(dismantleData);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (docsId) {
      fetcDocs(docsId);
    }
  }, [docsId]);

  const fetcDocs = async (docsId) => {
    const subject = "WO Dismantle";
    const docsDatas = await getDocsBySubject(docsId, subject);
    if (docsDatas) {
      setDocs(docsDatas);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const BtWorkOrder = () => {
    navigate("/workorder");
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-1">
          Riwayat Pengerjaan Dismantle
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="mt-2 ml-2">
        <button
          onClick={BtWorkOrder}
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
                    {Object.values(dismantles).map((dismantle, index) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={dismantle.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}.
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>
                            {dismantle.nama_client} / {dismantle.id_pelanggan}
                          </b>
                          <br />
                          {dismantle.email} / {dismantle.contact_person}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{dismantle.alamat}</b>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>Teknisi: </b>
                          {dismantle.teknisi_note}
                          <br />
                          <b>Perangkat: </b>
                          {dismantle.perangkat_note}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{dismantle.status}</b>
                          <br />
                          {dismantle.updatedAt}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => openModal(dismantle)}
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

        <Transition appear show={isOpen} as={Fragment} data={dismantle}>
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
                      {dismantle && (
                        <>
                          <ul className="list-inside ... m-10">
                            <li className="mb-2">
                              <b>No. WO : </b> {dismantle.no_wo}
                            </li>
                            <li className="mb-2">
                              <b>Nama Client : </b> {dismantle.nama_client}
                            </li>
                            <li className="mb-2">
                              <b>ID Pelanggan : </b> {dismantle.id_pelanggan}
                            </li>
                            <li className="mb-2">
                              <b>Alamat : </b> {dismantle.alamat}
                            </li>
                            <li className="mb-2">
                              <b>Contact Person : </b>{" "}
                              {dismantle.contact_person}
                            </li>
                            <li className="mb-2">
                              <b>Email : </b> {dismantle.email}
                            </li>
                            <li className="mb-2">
                              <b>FAT info : </b> {dismantle.input_fat}
                            </li>
                            <li className="mb-2">
                              <b>Client Note : </b> {dismantle.client_note}
                            </li>
                            <li className="mb-2">
                              <b>Teknisi Note : </b> {dismantle.teknisi_note}
                            </li>
                            <li className="mb-2">
                              <b>Perangkat Note : </b>{" "}
                              {dismantle.perangkat_note}
                            </li>
                            <li className="mb-2">
                              <b>Update at : </b> {dismantle.updatedAt}
                            </li>
                          </ul>
                        </>
                      )}

                      {Object.values(docs).map((doc, index) => (
                        <div className="mb-5" key={index + 1}>
                          <p>{doc.description}</p>
                          <img
                            className="w-screen rounded-lg shadow-2xl"
                            src={`http://localhost:5000/${doc.file}`}
                            alt="Documentation"
                          />
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
      </div>
    </>
  );
};

export default RiwayatDismantle;
