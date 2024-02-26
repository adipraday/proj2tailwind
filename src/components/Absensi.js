import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  ExclamationIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentAddIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import ApiUrl from "../config/ApiUrl";
import TokenService from "../services/TokenService";

const Absensi = () => {
  const { name, jobdesk, token } = TokenService();

  const [msg, setMsg] = useState("");
  const [error] = useState("");

  const [absensis, setAbsensis] = useState([]);

  const navigate = useNavigate();
  const axiosJWT = axios.create();

  let [isOpen, setIsOpen] = useState(false);
  const [absensi, setAbsensi] = useState(null);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal(absensi) {
    setAbsensi(absensi);
    setIsOpen(true);
  }

  useEffect(() => {
    getAbsensis();
    // eslint-disable-next-line
  }, []);

  const getAbsensis = async () => {
    const resAbsensis = await axiosJWT.get(`${ApiUrl.API_BASE_URL}/absensi`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    setAbsensis(resAbsensis.data);
  };

  const hapusDataAbsensi = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );

    // Check if the user confirmed
    if (isConfirmed) {
      try {
        await axios
          .delete(`${ApiUrl.API_BASE_URL}/deleteabsensi/${id}`)
          .then((response) => {
            // getAbsensis()
            setMsg(response.data.msg);
            setAbsensis(absensis.filter((absensi) => absensi.id !== id));
            setTimeout(() => {
              setMsg("");
            }, 15000);
            window.location.reload(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const GtAddAbsensi = () => {
    navigate("/addabsensi");
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-1">
          Absensi
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <button
          onClick={() => GtAddAbsensi()}
          className="inline-block px-6 py-2.5 bg-blue-400 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-blue-500 
                                                hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-blue-500 
                                                active:shadow-lg transition duration-150 ease-in-out"
        >
          + Add Absensi
        </button>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {msg && (
                  <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300">
                    <CheckCircleIcon className="h-6 w-6 fill-rose-500 -mb-5" />
                    <p className="m-3 text-slate-500">{msg}</p>
                  </div>
                )}
                {error && (
                  <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300">
                    <ExclamationIcon className="h-6 w-6 fill-red-500 -mb-5" />
                    <p className="m-3 text-slate-500">{error}</p>
                  </div>
                )}
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
                        <p className="ml-7 text-slate-500">Nama Karyawan</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <CalendarIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Tanggal</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <InformationCircleIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">status</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <DocumentAddIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">Note</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        .
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
                    {absensis.map((absensi, index) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={absensi.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}.
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {absensi.nama}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {absensi.tgl_absensi}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {absensi.keterangan}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {absensi.note}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => openModal(absensi)}
                            className="inline-block px-6 py-2.5 bg-blue-400 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-blue-500 
                                                hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-blue-500 
                                                active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Detail
                          </button>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {name === absensi.nama && (
                            <button
                              onClick={() => hapusDataAbsensi(absensi.id)}
                              className="inline-block px-6 py-2.5 bg-red-400 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-red-500 
                                                hover:shadow-lg focus:bg-red-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-green-500 
                                                active:shadow-lg transition duration-150 ease-in-out"
                            >
                              Batalkan
                            </button>
                          )}
                          {jobdesk === "Lead Network Enginer" && (
                            <button
                              onClick={() => hapusDataAbsensi(absensi.id)}
                              className="inline-block px-6 py-2.5 bg-red-400 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-red-500 
                                                hover:shadow-lg focus:bg-red-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-green-500 
                                                active:shadow-lg transition duration-150 ease-in-out"
                            >
                              Batalkan
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

        <Transition appear show={isOpen} as={Fragment} data={absensi}>
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
                      Detail Absensi
                    </Dialog.Title>
                    <div className="mt-2">
                      {absensi && (
                        <>
                          <ul className="list-inside ... m-10">
                            <li className="mb-2">
                              <b>Nama : </b> {absensi.nama}
                            </li>
                            <li className="mb-2">
                              <b>Tanggal absensi : </b> {absensi.tgl_absensi}
                            </li>
                            <li className="mb-2">
                              <b>Keterangan : </b> {absensi.keterangan}
                            </li>
                            <li className="mb-2">
                              <b>Note : </b> {absensi.note}
                            </li>
                            <li className="mb-2">
                              <b>Update at : </b> {absensi.updatedAt}
                            </li>
                          </ul>
                          <img
                            className="w-screen rounded-lg shadow-2xl"
                            src={`http://localhost:5000/${absensi.doc}`}
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

export default Absensi;
