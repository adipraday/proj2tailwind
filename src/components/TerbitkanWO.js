import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import ApiUrl from "../config/ApiUrl";

const TerbitkanWO = () => {
  const axiosJWT = axios.create();
  const navigate = useNavigate();

  const { id } = useParams();

  const [, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [availabletechnician, setAvailableTechnician] = useState("");
  const [id_teknisi, setIdTeknisi] = useState("");
  const [teknisiwos, setTeknisiWO] = useState("");

  const [workorders, setWorkOrders] = useState("");
  const NoWo = workorders.length > 0 ? workorders[0].no_wo : null;

  // Form edit data WorkOrder
  const nama_client = useRef();
  const id_pelanggan = useRef();
  const alamat = useRef();
  const contact_person = useRef();
  const email = useRef();
  const tikor = useRef();
  const link_tikor = useRef();
  const paket_berlangganan = useRef();

  // form update progress WorkOrder
  const f3userId = useRef();
  const f3id = useRef();
  const f3no_wo = useRef();
  const f3nama_client = useRef();
  const f3id_pelanggan = useRef();
  const f3label_fat = useRef();
  const f3note = useRef();
  const f3status = useRef();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${ApiUrl.API_BASE_URL}/token`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
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

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`${ApiUrl.API_BASE_URL}/token`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        setToken(response.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUserId(decoded.userId);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    getAvailableTechnician();
    // eslint-disable-next-line
  }, []);

  const getAvailableTechnician = async () => {
    try {
      const resAvailableTechnician = await axiosJWT.get(
        `${ApiUrl.API_BASE_URL}/getavailabletechnician`
      );
      setAvailableTechnician(resAvailableTechnician.data);
    } catch (error) {
      console.error("Error fetching available technician:", error);
    }
  };

  const addTechnician = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ApiUrl.API_BASE_URL}/addteknisiwo`, {
        userId: userId,
        teknisiId: id_teknisi,
        id: id,
      });

      // Assuming your API returns a status like { success: true, data: ... }
      if (response.data.success) {
        setIdTeknisi("");
        setMsg(response.data.msg);
        setTimeout(() => {
          setMsg("");
        }, 30000);
        window.location.reload(false);
      } else {
        // Handle unsuccessful API response
        setError(response.data.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
        window.location.reload(false);
        return alert("Teknisi berhasil ditambahkan ...");
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      if (error.response) {
        setError(error.response.data.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  useEffect(() => {
    // Check if NoWo is truthy before making the API call
    if (id) {
      getTeknisiWo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Add NoWo as a dependency to the useEffect dependency array
  const getTeknisiWo = async () => {
    const resTeknisiWO = await axiosJWT.get(
      `${ApiUrl.API_BASE_URL}/getteknisiwo/${id}`
    );
    setTeknisiWO(resTeknisiWO.data);
  };

  const hapusDataTeknisiWO = async (another_act_id, act_id) => {
    try {
      await axios
        .delete(
          `${ApiUrl.API_BASE_URL}/deleteteknisiwo/${another_act_id}/${act_id}`
        )
        .then((response) => {
          setMsg(response.data.msg);
          setTimeout(() => {
            setMsg("");
          }, 30000);
          window.location.reload(false);
          return alert("Teknisi berhasil dibatalkan ...");
        });
    } catch (error) {
      console.log(error);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Fetch the current item data by ID when the component mounts
    const getWorkOrder = async () => {
      try {
        const response = await axios.get(
          `${ApiUrl.API_BASE_URL}/workorder/${id}`
        );
        setWorkOrders(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Error fetching item");
      }
    };
    getWorkOrder();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to update the item
      const response = await axios.put(
        `${ApiUrl.API_BASE_URL}/updateworkorder`,
        {
          userId: userId,
          id: id,
          no_wo: NoWo,
          nama_client: nama_client.current.value,
          id_pelanggan: id_pelanggan.current.value,
          alamat: alamat.current.value,
          contact_person: contact_person.current.value,
          email: email.current.value,
          tikor: tikor.current.value,
          link_tikor: link_tikor.current.value,
          paket_berlangganan: paket_berlangganan.current.value,
        }
      );
      setMsg(response.data.msg);
      return alert("Data WorkOrder telah berhasil diperbaharui");
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Error updating item");
    }
  };

  const updateProgressWo = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to update the item
      const response = await axios.put(
        `${ApiUrl.API_BASE_URL}/updateprogresswo`,
        {
          userId: f3userId.current.value,
          id: f3id.current.value,
          no_wo: f3no_wo.current.value,
          nama_client: f3nama_client.current.value,
          id_pelanggan: f3id_pelanggan.current.value,
          label_fat: f3label_fat.current.value,
          note: f3note.current.value,
          status: f3status.current.value,
        }
      );
      if (
        f3status.current.value === "Done" ||
        f3status.current.value === "Cancel"
      ) {
        navigate("/riwayatworkorder");
        return alert("Status WorkOrder telah berhasil diperbaharui");
      } else {
        setMsg(response.data.msg);
        return alert("Status WorkOrder telah berhasil diperbaharui");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Error updating item");
    }
  };

  const selesaiTT = () => {
    navigate("/workorder");
  };

  return (
    <>
      <div className="container mx-auto bg-gray-400 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-10">
          Update Work Order {NoWo}
        </h1>
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <button
          onClick={selesaiTT}
          className="py-2 px-4 border border-transparent text-sm font-medium 
          rounded-md text-white bg-green-600 hover:bg-green-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {"<<"} Kembali
        </button>
        <br />
        <br />
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
      </div>

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-100 p-5">
            <h2>Tambahkan Teknisi</h2>
            <form onSubmit={addTechnician}>
              <select
                className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700
                        bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition 
                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                id="f1_id_teknisi"
                value={id_teknisi}
                onChange={(e) => setIdTeknisi(e.target.value)}
                required
              >
                <option value="">Pilih Teknisi</option>
                {Object.values(availabletechnician).map(
                  (availabletechnician) => (
                    <option
                      key={availabletechnician.id}
                      value={availabletechnician.id}
                    >
                      {availabletechnician.name}
                    </option>
                  )
                )}
              </select>
              <br />
              <button
                className="group relative w-full flex justify-center 
                            py-2 px-4 border border-transparent text-sm font-medium 
                            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                + Tambahkan Teknisi
              </button>
            </form>
            <br />
            <br />
            {Object.values(teknisiwos).map((teknisiwo, index) => (
              <div key={teknisiwo.id} className="flex justify-end mb-5">
                <p>
                  <b>{index + 1}.</b>
                  {teknisiwo.act_desk}
                </p>
                <div>
                  <button
                    onClick={() =>
                      hapusDataTeknisiWO(
                        teknisiwo.another_act_id,
                        teknisiwo.act_id
                      )
                    }
                    className="group relative px-4 border border-transparent text-sm font-medium 
                            rounded-md text-white bg-red-400 hover:bg-red-500 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-100 p-5 items-center justify-center">
            <h2>Perbaharui Data Work Order</h2>

            {Object.values(workorders).map((workorder) => (
              <form
                className="mt-8 space-y-6"
                onSubmit={handleUpdate}
                key={workorder.id}
              >
                <div key={workorder.id}>
                  <label className="text-slate-500 antialiased">
                    Nama Client
                  </label>
                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f2_nama_client"
                    placeholder="Nama Client"
                    defaultValue={workorder.nama_client}
                    ref={nama_client}
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-500 antialiased">
                    ID Pelanggan
                  </label>
                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f2_id_pelanggan"
                    placeholder="ID Pelanggan"
                    defaultValue={workorder.id_pelanggan}
                    ref={id_pelanggan}
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-500 antialiased">Alamat</label>
                  <textarea
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f2_alamat"
                    rows="3"
                    placeholder="Alamat"
                    defaultValue={workorder.alamat}
                    ref={alamat}
                    required
                  ></textarea>
                </div>
                <br />
                <div>
                  <label className="text-slate-500 antialiased">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f2_contact_person"
                    placeholder="Contact Number"
                    defaultValue={workorder.contact_person}
                    ref={contact_person}
                    required
                  />
                </div>
                <br />
                <div>
                  <label className="text-slate-500 antialiased">Email</label>
                  <input
                    type="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f2_email"
                    placeholder="Email"
                    defaultValue={workorder.email}
                    ref={email}
                    required
                  />
                </div>
                <br />
                <div>
                  <label className="text-slate-500 antialiased">
                    Titik Kordinat
                  </label>
                  <textarea
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f2_tikor"
                    rows="3"
                    placeholder="Titik Kordinat"
                    defaultValue={workorder.tikor}
                    ref={tikor}
                    required
                  ></textarea>
                </div>
                <br />
                <div>
                  <label className="text-slate-500 antialiased">
                    Link Titik Kordinat
                  </label>
                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f2_link_tikor"
                    placeholder="Link Titik Kordinat"
                    defaultValue={workorder.link_tikor}
                    ref={link_tikor}
                    required
                  />
                </div>
                <br />
                <div>
                  <label className="text-slate-500 antialiased">
                    Paket Berlangganan
                  </label>
                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f2_paket_berlangganan"
                    placeholder="Paket Berlangganan"
                    defaultValue={workorder.paket_berlangganan}
                    ref={paket_berlangganan}
                    required
                  />
                </div>
                <br />
                <button
                  className="group relative w-full flex justify-center 
                            py-2 px-4 border border-transparent text-sm font-medium 
                            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Simpan Perubahan Data WO
                </button>
              </form>
            ))}
          </div>
          <div className="bg-slate-100 p-5 items-center justify-center">
            <h2>Update Progres Report</h2>
            {Object.values(workorders).map((workorder) => (
              <form
                className="mt-8 space-y-6"
                onSubmit={updateProgressWo}
                key={workorder.id}
              >
                <input
                  id="f3_userId"
                  type="hidden"
                  defaultValue={userId}
                  ref={f3userId}
                />
                <input
                  id="f3_id"
                  type="hidden"
                  defaultValue={workorder.id}
                  ref={f3id}
                />
                <input
                  id="f3_no_wo"
                  type="hidden"
                  defaultValue={workorder.no_wo}
                  ref={f3no_wo}
                />
                <input
                  id="f3_nama_client"
                  type="hidden"
                  defaultValue={workorder.nama_client}
                  ref={f3nama_client}
                />
                <input
                  id="f3_id_pelanggan"
                  type="hidden"
                  defaultValue={workorder.id_pelanggan}
                  ref={f3id_pelanggan}
                />
                <div>
                  <label className="text-slate-500 antialiased">
                    Tikor FAT Input
                  </label>
                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f3_label_fat"
                    placeholder="Masukkan Tikor FAT Input"
                    defaultValue={workorder.label_fat}
                    ref={f3label_fat}
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-500 antialiased">
                    Progress Status
                  </label>
                  <select
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f3_status"
                    ref={f3status}
                    required
                  >
                    <option value="">Status</option>
                    <option>~~~~~</option>
                    <option value="Waiting List">Waiting List</option>
                    <option value="On Progress">On Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-500 antialiased">Report</label>
                  <textarea
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f3_report"
                    rows="15"
                    placeholder="Note"
                    ref={f3note}
                    defaultValue={workorder.note}
                  ></textarea>
                </div>
                <br />
                <button
                  className="group relative w-full flex justify-center 
                            py-2 px-4 border border-transparent text-sm font-medium 
                            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Simpan Progress Report
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TerbitkanWO;
