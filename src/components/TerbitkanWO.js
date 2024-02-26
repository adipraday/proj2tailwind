import axios from "axios";
import { useState, useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  CheckCircleIcon,
  ExclamationIcon,
  XCircleIcon,
  EyeIcon,
  InformationCircleIcon,
  ArrowCircleUpIcon,
} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import ApiUrl from "../config/ApiUrl";
import TokenService from "../services/TokenService";
import { getWorkingStatus } from "../services/UserServices";
import {
  addDoc,
  getDocsBySubject,
  hapusDocById,
} from "../services/DocsServices";
import { Dialog, Transition } from "@headlessui/react";

const TerbitkanWO = () => {
  const axiosJWT = axios.create();
  const navigate = useNavigate();
  const { userId, name, jobdesk } = TokenService();

  const { id } = useParams();

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [availabletechnician, setAvailableTechnician] = useState("");
  const [id_teknisi, setIdTeknisi] = useState("");
  const [teknisiwos, setTeknisiWO] = useState("");

  const [workorders, setWorkOrders] = useState("");
  const [docs, setDocs] = useState("");
  const [image, setImage] = useState("");
  const NoWo = workorders.length > 0 ? workorders[0].no_wo : null;

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  // form upload dokumentation
  const f4id = useRef();
  const f4no_wo = useRef();
  const [f4image_description, setImageDescription] = useState();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    if (jobdesk !== "Lead Network Enginer") {
      return alert("Need Administrator Access !");
    }
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
    if (jobdesk !== "Lead Network Enginer") {
      return alert("Need Administrator Access !");
    }
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
    if (jobdesk !== "Lead Network Enginer") {
      return alert("Need Administrator Access !");
    }
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
      const cek_working_status = await getWorkingStatus({
        id_user: userId,
        no_wo: f3no_wo.current.value,
      });
      if (
        cek_working_status.msg === "Registered" ||
        jobdesk === "Lead Network Enginer"
      ) {
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
      } else if (
        cek_working_status.msg !== "Registered" &&
        jobdesk !== "Lead Network Enginer"
      ) {
        setError(
          `${cek_working_status.msg}, Update progress WO harus dilakukan oleh admin leader atau teknisi bersangkutan`
        );
        return alert(
          "Update progress WO harus dilakukan oleh admin leader atau teknisi bersangkutan"
        );
      }
    } catch (error) {
      console.error("Error while checking teknisi status:", error);
      setError("Error while checking teknisi status");
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const uploadDocumentation = async (e) => {
    e.preventDefault();

    // Create FormData and append form fields
    const formData = new FormData();
    formData.append("subject_id", f4id.current.value);
    formData.append("subject", "WO Pemasangan");
    formData.append("description", f4image_description);
    formData.append("image", image); // Append the File object

    try {
      const cek_working_status = await getWorkingStatus({
        id_user: userId,
        no_wo: f4no_wo.current.value,
      });
      if (
        cek_working_status.msg === "Registered" ||
        jobdesk === "Lead Network Enginer"
      ) {
        try {
          // Make the API request to update the item
          const response = await addDoc(formData);
          setImageDescription("");
          setImage(null);
          fetcDocs(id);
          setMsg(response.msg);
          return alert("File dokumentasi berhasil di upload");
        } catch (error) {
          console.error("Error updating item:", error);
          setError("Error updating item");
        }
      } else if (
        cek_working_status.msg !== "Registered" &&
        jobdesk !== "Lead Network Enginer"
      ) {
        setError(
          `${cek_working_status.msg}, Update progress WO harus dilakukan oleh admin leader atau teknisi bersangkutan`
        );
        return alert(
          "Update progress WO harus dilakukan oleh admin leader atau teknisi bersangkutan"
        );
      }
    } catch (error) {
      console.error("Error while checking teknisi status:", error);
      setError("Error while checking teknisi status");
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (id) {
      fetcDocs(id);
    }
  }, [id]);

  const fetcDocs = async (id) => {
    const subject = "WO Pemasangan";
    const docsDatas = await getDocsBySubject(id, subject);
    if (docsDatas) {
      setDocs(docsDatas);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const hapusDoc = async (id) => {
    try {
      const cek_working_status = await getWorkingStatus({
        id_user: userId,
        no_wo: f3no_wo.current.value,
      });
      if (
        cek_working_status.msg === "Registered" ||
        jobdesk === "Lead Network Enginer"
      ) {
        const isConfirmed = window.confirm(
          "Are you sure you want to delete this data?"
        );
        // Check if the user confirmed
        if (isConfirmed) {
          try {
            const response = await hapusDocById(id);
            // Handle response data if needed
            setMsg(response.msg);
            window.location.reload(false);
            return alert("File berhasil dihapus");
          } catch (error) {
            // Handle errors if needed
            console.error("Error:", error);
          }
        } else if (
          cek_working_status.msg !== "Registered" &&
          jobdesk !== "Lead Network Enginer"
        ) {
          setError(
            `${cek_working_status.msg}, Update progress WO harus dilakukan oleh admin leader atau teknisi bersangkutan`
          );
          return alert(
            "Update progress WO harus dilakukan oleh admin leader atau teknisi bersangkutan"
          );
        }
      }
    } catch (error) {
      console.error("Error while checking teknisi status:", error);
      setError("Error while checking teknisi status");
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let [isOpen, setIsOpen] = useState(false);
  const [doc, setDoc] = useState(null);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal(doc) {
    setDoc(doc);
    setIsOpen(true);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const selesaiTT = () => {
    navigate("/workorder");
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="container mx-auto bg-gray-400 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-10">
          Update Work Order {NoWo}
        </h1>
        <p className="text-sm font-semibold text-right text-gray-800 dark:text-white mb-1">
          {name}
        </p>
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

      {jobdesk === "Lead Network Enginer" && (
        <div className="container mx-auto bg-gray-50 p-8 antialiased">
          <div className="grid grid-cols-1 gap-4" key="content-1">
            <div
              className="bg-slate-100 p-5 items-center justify-center"
              key="content-1-2"
            >
              <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
              <h2>Perbaharui Data Work Order</h2>

              {Object.values(workorders).map((workorder, index) => (
                <form
                  className="mt-8 space-y-6"
                  onSubmit={handleUpdate}
                  key={index + 1}
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
            <div className="bg-slate-100 p-5" key="content-1-1">
              <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
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
                      className="inline-block px-6 py-2.5 bg-red-400 
                              text-white font-small text-xs leading-tight 
                               rounded-full shadow-md hover:bg-red-500 
                              hover:shadow-lg focus:bg-red-500 focus:shadow-lg 
                              focus:outline-none focus:ring-0 active:bg-green-600 
                              active:shadow-lg transition duration-150 ease-in-out"
                    >
                      <XCircleIcon className="h-4 fill-white-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {jobdesk !== "Lead Network Enginer" && (
        <div className="container mx-auto bg-gray-50 p-8 antialiased">
          <div className="grid grid-cols-1 gap-4" key="content-2">
            <div
              className="bg-slate-100 p-5 items-center justify-center"
              key="content-2-1"
            >
              <InformationCircleIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
              <h2>Informasi Client</h2>
              {Object.values(workorders).map((workorder, index) => (
                <ul
                  className="list-inside text-sm font-light text-gray-900 m-10"
                  key={index + 1}
                >
                  <li>
                    <b>No. WO : </b> {workorder.no_wo}
                  </li>
                  <li>
                    <b>Nama : </b> {workorder.nama_client}
                  </li>
                  <li>
                    <b>ID : </b> {workorder.id_pelanggan}
                  </li>
                  <li>
                    <b>Alamat : </b> {workorder.alamat}
                  </li>
                  <li>
                    <b>Contact Person : </b> {workorder.contact_person}
                  </li>
                  <li>
                    <b>Email : </b> {workorder.email}
                  </li>
                  <li>
                    <b>Tikor : </b> {workorder.status}
                  </li>
                  <li>
                    <b>Link Tikor : </b> {workorder.link_tikor}
                  </li>
                  <li>
                    <b>Paket Berlangganan : </b> {workorder.paket_berlangganan}
                  </li>
                  <li>
                    <b>Note : </b> {workorder.note}
                  </li>
                  <li>
                    <b>Label FAT : </b> {workorder.label_fat}
                  </li>
                  <li>
                    <b>Status : </b> {workorder.status}
                  </li>
                  <li>
                    <b>Updated at : </b> {workorder.updatedAt}
                  </li>
                </ul>
              ))}
            </div>

            <div
              className="bg-slate-100 p-5 items-center justify-center"
              key="content-2-2"
            >
              <InformationCircleIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
              <h2>Informasi Teknisi</h2>
              {Object.values(teknisiwos).map((teknisiwo, index) => (
                <div
                  className="text-sm font-light text-gray-900 m-10 indent-8"
                  key={index + 1}
                >
                  <p key={teknisiwo.id}>{teknisiwo.act_desk}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <div className="grid grid-cols-1 gap-4" key="content-3">
          <div
            className="bg-slate-100 p-5 items-center justify-center"
            key="content-3-1"
          >
            <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
            <h2>Upload Dokumentasi</h2>
            {Object.values(workorders).map((workorder, index) => (
              <form
                className="mx-2 mt-10 space-y-6"
                encType="multipart/form-data"
                onSubmit={uploadDocumentation}
                id="docFormInput"
                key={index + 1}
              >
                <input
                  id="f4_id"
                  type="hidden"
                  defaultValue={workorder.id}
                  ref={f4id}
                />
                <input
                  id="f4_no_wo"
                  type="hidden"
                  defaultValue={workorder.no_wo}
                  ref={f4no_wo}
                />
                <div>
                  <label className="text-slate-500 antialiased">
                    Deskripsi Dokumentasi
                  </label>
                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="f4_description"
                    placeholder="Deskripsi / keterangan foto"
                    name="f4image_description"
                    onChange={(e) => setImageDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-500 antialiased">
                    Foto Dokumentasi
                  </label>
                  <input
                    type="file"
                    id="f4_image_doc_perangkat"
                    accept="image/*"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Documentation"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
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
                  Upload
                </button>
                <br />
              </form>
            ))}
            {Object.values(docs).map((doc, index) => (
              <div
                className="text-sm font-light text-gray-900 m-5"
                key={index + 1}
              >
                <p className="p-4"># {doc.description}</p>
                <button
                  onClick={() => openModal(doc)}
                  className="inline-block px-6 py-2.5 bg-green-400 
                              text-white font-small text-xs leading-tight 
                              uppercase rounded-full shadow-md hover:bg-green-500 
                              hover:shadow-lg focus:bg-green-500 focus:shadow-lg 
                              focus:outline-none focus:ring-0 active:bg-green-600 
                              active:shadow-lg transition duration-150 ease-in-out"
                >
                  <EyeIcon className="h-4 fill-white-500" />
                </button>{" "}
                <button
                  onClick={() => hapusDoc(doc.id)}
                  className="inline-block px-6 py-2.5 bg-red-400 
                              text-white font-small text-xs leading-tight 
                               rounded-full shadow-md hover:bg-red-500 
                              hover:shadow-lg focus:bg-red-500 focus:shadow-lg 
                              focus:outline-none focus:ring-0 active:bg-green-600 
                              active:shadow-lg transition duration-150 ease-in-out"
                >
                  <XCircleIcon className="h-4 fill-white-500" />
                </button>
              </div>
            ))}

            <Transition appear show={isOpen} as={Fragment} data={doc}>
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
                          Detail Dokumentasi
                        </Dialog.Title>
                        <div className="mt-2">
                          {doc && (
                            <>
                              <ul className="list-inside ... m-10">
                                <li className="mb-2">
                                  <b>Deskripsi : </b> {doc.description}
                                </li>
                              </ul>
                              <img
                                className="w-screen rounded-lg shadow-2xl"
                                src={`http://localhost:5000/${doc.file}`}
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
          <div
            className="bg-slate-100 p-5 items-center justify-center"
            key="content-3-2"
          >
            <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
            <h2>Update Progres Report</h2>
            {Object.values(workorders).map((workorder, index) => (
              <form
                className="mt-8 space-y-6"
                onSubmit={updateProgressWo}
                key={index + 1}
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
