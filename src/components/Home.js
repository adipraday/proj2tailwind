import { Tab, Dialog, Transition } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
  UsersIcon,
  UserCircleIcon,
  RssIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import ApiUrl from "../config/ApiUrl";
import TokenService from "../services/TokenService";
import { getWoTimeline } from "../services/ActService";

const Home = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////

  const axiosJWT = axios.create();
  const { name } = TokenService();
  const [selectedIndex, setSelectedIndex] = useState(0);

  ///////////////////////////////////////////////////////////////////////////////////////////

  let [isOpen, setIsOpen] = useState(false);
  const [kd_act, setKdAct] = useState();
  const [wotimelines, setWoTimelines] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(act_desk) {
    const matches = act_desk.match(/\((.*?)\)/);
    const kd_act = matches[1];
    setKdAct(kd_act);

    getWoTimeline({
      kd_act,
    })
      .then((response) => {
        setWoTimelines(response);
      })
      .catch((error) => {
        console.error(error);
      });

    setIsOpen(true);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  const [absensis, setAbsensis] = useState([]);

  useEffect(() => {
    getAbsensis();
    // eslint-disable-next-line
  }, []);
  const getAbsensis = async () => {
    const resAbsensis = await axiosJWT.get(`${ApiUrl.API_BASE_URL}/absensi`);
    setAbsensis(resAbsensis.data);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  const [availabletechnician, setAvailableTechnician] = useState("");

  useEffect(() => {
    getAvailableTechnician();
    // eslint-disable-next-line
  }, []);
  const getAvailableTechnician = async () => {
    const resAvailableTechnician = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getavailabletechnician`
    );
    setAvailableTechnician(resAvailableTechnician.data);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  const [logactivity, setLogActivity] = useState("");

  useEffect(() => {
    getLogActivity();
    // eslint-disable-next-line
  }, []);
  const getLogActivity = async () => {
    const resLogActivity = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getdashboardact`
    );
    setLogActivity(resLogActivity.data);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-7 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-1">
          Dashboard
        </h1>
        <p className="font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List>
            <Tab
              className="inline-block px-6 py-2.5 bg-gray-100 
                    font-medium text-xs leading-tight 
                    uppercase shadow-md hover:bg-gray-300 
                    hover:shadow-lg focus:bg-gray-300 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-gray-600 
                    active:shadow-lg transition duration-150 ease-in-out ml-2 mt-2"
            >
              <RssIcon className="h-7 w-7 fill-blue-500 -mb-5" />
              <p className="ml-7 text-sky-700">Activity</p>
            </Tab>
            <Tab
              className="inline-block px-6 py-2.5 bg-gray-100 
              font-medium text-xs leading-tight 
              uppercase shadow-md hover:bg-gray-300 
              hover:shadow-lg focus:bg-gray-300 focus:shadow-lg 
              focus:outline-none focus:ring-0 active:bg-gray-600 
              active:shadow-lg transition duration-150 ease-in-out ml-2 mt-2"
            >
              <InformationCircleIcon className="h-7 w-7 fill-green-500 -mb-5" />
              <p className="ml-7 text-sky-700">Teknisi Tersedia</p>
            </Tab>
            <Tab
              className="inline-block px-6 py-2.5 bg-gray-100 
              font-medium text-xs leading-tight 
              uppercase shadow-md hover:bg-gray-300 
              hover:shadow-lg focus:bg-gray-300 focus:shadow-lg 
              focus:outline-none focus:ring-0 active:bg-gray-600 
              active:shadow-lg transition duration-150 ease-in-out ml-2 mt-2"
            >
              <UsersIcon className="h-7 w-7 fill-red-500 -mb-5" />
              <p className="ml-7 text-sky-700">Absensi</p>
            </Tab>
          </Tab.List>
          <br />
          <Tab.Panels className="h-200">
            <Tab.Panel>
              {Object.values(logactivity).map((logactivity) => (
                <div
                  className="bg-blue-50 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3"
                  role="alert"
                  key={logactivity.id}
                >
                  <RssIcon className="h-7 w-7 fill-blue-600 -mb-9" />
                  <p className="ml-8 text-cyan-700">{logactivity.act_desk}</p>
                  <p className="ml-8 text-cyan-600">
                    Status : {logactivity.status}
                  </p>
                  <p className="ml-8 text-stone-500">
                    at : {logactivity.updatedAt}
                  </p>
                  <br />
                  {logactivity.status === "Busy" ||
                  logactivity.status === "Dibatalkan" ? null : (
                    <button
                      type="button"
                      onClick={() => openModal(logactivity.act_desk)}
                      className="inline-block px-6 py-1.5 bg-blue-400 
    text-white font-small text-xs leading-tight 
    rounded-md shadow-md hover:bg-blue-500 
    hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
    focus:outline-none focus:ring-0 active:bg-blue-600 
    active:shadow-lg transition duration-150 ease-in-out
    btn-sm float-right -mt-4"
                    >
                      View TimeLine
                    </button>
                  )}
                </div>
              ))}

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
                              className="absolute top-0 right-0 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 item-right"
                              onClick={closeModal}
                            >
                              <XCircleIcon className="h-6 w-6" />
                            </button>
                            <br />
                            TimeLine for {kd_act}
                          </Dialog.Title>
                          <div className="mt-2 mb-5 text-xs">
                            {wotimelines.map((wotimeline, index) => (
                              <div
                                className="bg-blue-50 text-gray-900 font-light px-6 py-4 whitespace-nowra mt-2"
                                key={wotimeline.id}
                              >
                                <p>
                                  <b>{wotimeline.act_sub}</b>
                                </p>
                                <p>{wotimeline.act_desk}</p>
                                <br />
                                <p>
                                  Status : <b>{wotimeline.status}</b>
                                </p>
                                <p>
                                  Updated at <b>{wotimeline.updatedAt}</b>
                                </p>
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
            </Tab.Panel>
            <Tab.Panel>
              {Object.values(availabletechnician).map((availabletechnician) => (
                <div
                  className="bg-green-50 rounded-lg py-5 px-6 mb-4 text-base text-green-600 mb-3"
                  role="alert"
                  key={availabletechnician.id}
                >
                  <InformationCircleIcon className="h-7 w-7 fill-green-500 -mb-6" />
                  <p className="ml-8 text-slate-600">
                    Saat ini {availabletechnician.name} {"("}
                    {availabletechnician.jobdesk}
                    {")"} {availabletechnician.status}
                  </p>
                </div>
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {absensis.map((absensi) => (
                <div
                  className="bg-red-50 rounded-lg py-5 px-6 mb-4 text-base text-indigo-800 mb-3"
                  role="alert"
                  key={absensi.id}
                >
                  <UserCircleIcon className="h-7 w-7 fill-red-500 -mb-9" />
                  <p className="ml-8">
                    {absensi.nama} {absensi.keterangan} pada tanggal{" "}
                    {absensi.tgl_absensi}
                  </p>
                  <p className="ml-8">dengan keterangan {absensi.note}</p>
                </div>
              ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Home;
