import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenService from "../services/TokenService";
import { getWoDismantles } from "../services/DismantleServices";
import {
  UserCircleIcon,
  MapIcon,
  DocumentAddIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { deleteWoDismantle } from "../services/DismantleServices";

const Dismantle = () => {
  const { name, jobdesk } = TokenService();
  const [dismantles, setDismantles] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchWoDismantles();
  }, []);

  const fetchWoDismantles = async () => {
    const dismantleData = await getWoDismantles();
    if (dismantleData) {
      setDismantles(dismantleData);
    }
  };

  const hapusDataDismantle = async (id, userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );

    // Check if the user confirmed
    if (isConfirmed) {
      try {
        await deleteWoDismantle(id, userId).then(() => {
          window.location.reload(false);
          return alert("Data telah dihapus");
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const BtWoDismantle = () => {
    navigate("/addwodismantle");
  };

  const GtUpdateWoDismantle = async (id) => {
    navigate(`/updatewodismantle/${id}`);
  };

  const BtRiwayatDismantle = () => {
    navigate(`/riwayatdismantle`);
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          WorkOrders Dismantle
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="container flex justify-end mx-auto bg-gray-50 p-8 antialiased">
        <button
          onClick={BtRiwayatDismantle}
          className="group relative py-2 px-4 border border-transparent text-sm font-medium 
                            rounded-md text-white bg-emerald-400 hover:bg-emerald-500 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300"
        >
          Lihat Riwayat Pengerjaan Dismantle
        </button>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        {jobdesk === "Lead Network Enginer" && (
          <button
            onClick={BtWoDismantle}
            className="inline-block px-6 py-2.5 bg-blue-400 
                                                      text-white font-medium text-xs leading-tight 
                                                      rounded-full shadow-md hover:bg-blue-500 
                                                      hover:shadow-lg focus:bg-blue-500 focus:shadow-lg 
                                                      focus:outline-none focus:ring-0 active:bg-blue-600 
                                                      active:shadow-lg transition duration-150 ease-in-out"
          >
            + Add WorkOrder Dismantle
          </button>
        )}
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
                          <br />
                          {dismantle.input_fat}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{dismantle.client_note}</b>
                          <br />
                          {dismantle.updatedAt}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <b>{dismantle.status}</b>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => GtUpdateWoDismantle(dismantle.id)}
                            className="inline-block px-6 py-2.5 bg-green-400 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-green-500 
                                                hover:shadow-lg focus:bg-green-500 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-yellow-600 
                                                active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Update
                          </button>{" "}
                          {jobdesk === "Lead Network Enginer" && (
                            <button
                              onClick={() => hapusDataDismantle(dismantle.id)}
                              className="inline-block px-6 py-2.5 bg-red-400 
                              text-white font-medium text-xs leading-tight 
                              uppercase rounded-full shadow-md hover:bg-red-500 
                              hover:shadow-lg focus:bg-red-500 focus:shadow-lg 
                              focus:outline-none focus:ring-0 active:bg-green-600 
                              active:shadow-lg transition duration-150 ease-in-out"
                            >
                              Delete
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
      </div>
    </>
  );
};

export default Dismantle;
