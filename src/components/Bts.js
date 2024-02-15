import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBts, getBtss } from "../services/BtsServices";
import {
  CheckCircleIcon,
  ExclamationIcon,
  TagIcon,
  QrcodeIcon,
  MapIcon,
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import TokenService from "../services/TokenService";

const Bts = () => {
  const { name } = TokenService();

  const [msg, setMsg] = useState("");
  const [error] = useState("");

  const navigate = useNavigate();

  const [btss, setBtss] = useState([]);

  useEffect(() => {
    let mounted = true;
    getBtss().then((btss) => {
      if (mounted) {
        setBtss(btss);
      }
    });
    return () => (mounted = false);
  }, []);

  const GtAddBts = () => {
    navigate("/addbts");
  };

  const GtUpdateBts = async (id) => {
    navigate(`/updatebts/${id}`);
  };

  const handleDeleteBts = (btsId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (isConfirmed) {
      deleteBts(btsId)
        .then((response) => {
          // Remove the deleted item from the local state
          setBtss(btss.filter((bts) => bts.id !== btsId));
          setMsg(response.msg);
          setTimeout(() => {
            setMsg("");
          }, 15000);
        })
        .catch((error) => console.error("Error deleting item:", error));
    }
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-1">
          BTS
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <button
          onClick={() => GtAddBts()}
          className="inline-block px-6 py-2.5 bg-blue-400 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-blue-500 
                                                hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-blue-500 
                                                active:shadow-lg transition duration-150 ease-in-out"
        >
          + Add BTS
        </button>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {msg && (
                  <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300 mb-5">
                    <CheckCircleIcon className="h-6 w-6 fill-rose-500 -mb-5" />
                    <p className="m-3 text-slate-500">{msg}</p>
                  </div>
                )}
                {error && (
                  <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300 mb-5">
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
                        <QrcodeIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">BTS Label / ID</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <TagIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">BTS Tikor</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <MapIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">BTS Area</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <ArrowCircleDownIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">BTS Input</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">
                          BTS Output Capacity
                        </p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <UsersIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">BTS Output Used</p>
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        <CheckCircleIcon className="h-7 w-7 fill-blue-500 -mb-6" />
                        <p className="ml-7 text-slate-500">
                          BTS Output Available
                        </p>
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
                    {btss.map((bts, index) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={bts.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}.
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {bts.bts_label}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {bts.bts_id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {bts.bts_area}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {bts.bts_input}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {bts.bts_output_capacity}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {bts.bts_output_used}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {bts.bts_output_available}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => GtUpdateBts(bts.id)}
                            className="inline-block px-6 py-2.5 bg-green-400 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-green-500 
                                                hover:shadow-lg focus:bg-green-500 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-green-green 
                                                active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteBts(bts.id)}
                            className="inline-block px-6 py-2.5 bg-red-400 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-red-500 
                                                hover:shadow-lg focus:bg-red-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-green-500 
                                                active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Delete
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
      </div>
    </>
  );
};

export default Bts;
