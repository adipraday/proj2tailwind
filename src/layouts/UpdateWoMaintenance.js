import { useState, useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  CheckCircleIcon,
  ExclamationIcon,
  EyeIcon,
  InformationCircleIcon,
  XCircleIcon,
  ArrowCircleUpIcon,
} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import TokenService from "../services/TokenService";
import { getAvailableTechnician } from "../services/UserServices";
import { addTechnicianMaintenance } from "../services/MaintenanceServices";
import { getTeknisiWoMaintenance } from "../services/MaintenanceServices";
import { hapusDataTeknisiWoMaintenance } from "../services/MaintenanceServices";
import { getWoMaintenanceById } from "../services/MaintenanceServices";
import { updateMaintenance } from "../services/MaintenanceServices";
import { updateProgressMaintenance } from "../services/MaintenanceServices";
import { getWorkingStatus } from "../services/UserServices";
import {
  addDoc,
  getDocsBySubject,
  hapusDocById,
} from "../services/DocsServices";
import { Dialog, Transition } from "@headlessui/react";

const UpdateWoMaintenance = () => {
  const navigate = useNavigate();
  const { userId, name, jobdesk } = TokenService();

  const { id } = useParams();

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [availabletechnician, setAvailableTechnician] = useState("");
  const [id_teknisi, setIdTeknisi] = useState("");
  const [teknisiwos, setTeknisiWO] = useState("");

  const [maintenances, setMaintenances] = useState("");
  const [docs, setDocs] = useState("");
  const [image, setImage] = useState("");
  const NoWo = maintenances.length > 0 ? maintenances[0].no_wo : null;

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Form edit data WorkOrder
  const nama_client = useRef();
  const id_pelanggan = useRef();
  const alamat = useRef();
  const contact_person = useRef();
  const email = useRef();
  const first_note = useRef();

  // form update progress WorkOrder
  const f3userId = useRef();
  const f3id = useRef();
  const f3no_wo = useRef();
  const f3nama_client = useRef();
  const f3id_pelanggan = useRef();
  const f3status = useRef();
  const f3last_note = useRef();

  // form upload dokumentation
  const f4id = useRef();
  const f4no_wo = useRef();
  const [f4image_description, setImageDescription] = useState();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    fetchAvailableTechnician();
  }, []);

  const fetchAvailableTechnician = async () => {
    const resAvailableTechnician = await getAvailableTechnician();
    if (resAvailableTechnician) {
      setAvailableTechnician(resAvailableTechnician);
    }
  };
  ////////////////////////////////////////////////////////
  const addTechnician = async (e) => {
    e.preventDefault();
    if (jobdesk !== "Lead Network Enginer") {
      return alert("Need Administrator Access !");
    }
    try {
      const response = await addTechnicianMaintenance({
        userId: userId,
        teknisiId: id_teknisi,
        id: id,
      });

      setIdTeknisi("");
      fetchTeknisiWo(id);
      // Show success alert or perform any other actions
      setMsg(response.msg);
      alert("Teknisi berhasil ditambahkan ...");
    } catch (error) {
      // Handle network errors or other unexpected errors
      if (error.response) {
        setError(error.response.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };
  ////////////////////////////////////////////////////////
  useEffect(() => {
    // Check if id is truthy before making the API call
    if (id) {
      fetchTeknisiWo(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Add id as a dependency to the useEffect dependency array

  const fetchTeknisiWo = async (id) => {
    const teknisiWOData = await getTeknisiWoMaintenance(id);
    if (teknisiWOData) {
      setTeknisiWO(teknisiWOData);
    }
  };
  ////////////////////////////////////////////////////////
  const hapusDataTeknisiWO = async (another_act_id, act_id) => {
    if (jobdesk !== "Lead Network Enginer") {
      return alert("Need Administrator Access !");
    }
    try {
      const response = await hapusDataTeknisiWoMaintenance(
        another_act_id,
        act_id
      );
      // Handle response data if needed
      fetchTeknisiWo(id);
      // Show success alert or perform any other actions
      setMsg(response.msg);
      alert("Teknisi berhasil dibatalkan ...");
    } catch (error) {
      // Handle errors if needed
      console.error("Error:", error);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (id) {
      fetchWoMaintenances(id);
    }
  }, [id]);

  const fetchWoMaintenances = async (id) => {
    const maintenanceData = await getWoMaintenanceById(id);
    if (maintenanceData) {
      setMaintenances(maintenanceData);
    }
  };

  ////////////////////////////////////////////////////////

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (jobdesk !== "Lead Network Enginer") {
      return alert("Need Administrator Access !");
    }
    try {
      // Make the API request to update the item
      const response = await updateMaintenance({
        userId: userId,
        id: id,
        no_wo: NoWo,
        nama_client: nama_client.current.value,
        id_pelanggan: id_pelanggan.current.value,
        alamat: alamat.current.value,
        contact_person: contact_person.current.value,
        email: email.current.value,
        first_note: first_note.current.value,
      });
      console.log(response);
      alert("Data WO maintenance telah berhasil diperbaharui");
      setMsg(response.msg);
      setTimeout(() => {
        setMsg("");
      }, 20000);
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Update data gagal");
    }
  };

  ////////////////////////////////////////////////////////

  const updateProgressWo = async (e) => {
    e.preventDefault();

    // Create FormData and append form fields
    const formData = new FormData();
    formData.append("userId", f3userId.current.value);
    formData.append("id", f3id.current.value);
    formData.append("no_wo", f3no_wo.current.value);
    formData.append("nama_client", f3nama_client.current.value);
    formData.append("id_pelanggan", f3id_pelanggan.current.value);
    formData.append("status", f3status.current.value);
    formData.append("last_note", f3last_note.current.value);
    formData.append("image", image); // Append the File object

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
          const response = await updateProgressMaintenance(formData);
          if (
            f3status.current.value === "Done" ||
            f3status.current.value === "Cancel"
          ) {
            navigate("/riwayatmaintenance");
            return alert("Status WO maintenance telah berhasil diperbaharui");
          } else {
            setMsg(response.msg);
            return alert("Status WO maintenance telah berhasil diperbaharui");
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
    formData.append("subject", "WO Maintenance");
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
    const subject = "WO Maintenance";
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

  const selesaiTT = () => {
    navigate("/maintenance");
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="container mx-auto bg-gray-400 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-10">
          Update WO Maintenance {NoWo}
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
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate-100 p-5 items-center justify-center">
              <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
              <h2>Perbaharui Data Maintenance</h2>

              {Object.values(maintenances).map((maintenance, index) => (
                <form
                  className="mx-2 mt-10 space-y-6"
                  onSubmit={handleUpdate}
                  key={index + 1}
                >
                  <div key={maintenance.id}>
                    <label className="text-slate-500 antialiased">
                      Nama Client
                    </label>
                    <input
                      type="text"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      id="f2_nama_client"
                      placeholder="Nama Client"
                      defaultValue={maintenance.nama_client}
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
                      defaultValue={maintenance.id_pelanggan}
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
                      defaultValue={maintenance.alamat}
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
                      defaultValue={maintenance.contact_person}
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
                      defaultValue={maintenance.email}
                      ref={email}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label className="text-slate-500 antialiased">
                      First Note
                    </label>
                    <textarea
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      id="f2_first_note"
                      rows="8"
                      placeholder="First Note"
                      ref={first_note}
                      defaultValue={maintenance.first_note}
                    ></textarea>
                  </div>
                  <br />
                  <br />
                  <button
                    className="group relative w-full flex justify-center 
            py-2 px-4 border border-transparent text-sm font-medium 
            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Simpan Perubahan Data Dismantle
                  </button>
                </form>
              ))}
              <br />
              <br />
            </div>

            <div className="bg-slate-100 p-5">
              <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
              <h2>Tambahkan Teknisi</h2>
              <form className="mx-2 mt-10 space-y-6" onSubmit={addTechnician}>
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
                <div
                  key={teknisiwo.id}
                  className="flex justify-end mb-5 text-sm font-light text-gray-900"
                >
                  <p>
                    <b>{index + 1}.</b> {teknisiwo.act_desk}
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
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate-100 p-5 items-center justify-center">
              <InformationCircleIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
              <h2>Informasi Client</h2>
              {Object.values(maintenances).map((maintenance, index) => (
                <ul
                  className="list-inside text-sm font-light text-gray-900 m-10"
                  key={index + 1}
                >
                  <li>
                    <b>No. WO : </b> {maintenance.no_wo}
                  </li>
                  <li>
                    <b>Jenis Maintenance : </b>
                    {maintenance.jenis_maintenance}
                  </li>
                  <li>
                    <b>Nama : </b> {maintenance.nama_client}
                  </li>
                  <li>
                    <b>ID : </b> {maintenance.id_pelanggan}
                  </li>
                  <li>
                    <b>Alamat : </b> {maintenance.alamat}
                  </li>
                  <li>
                    <b>Contact Person : </b> {maintenance.contact_person}
                  </li>
                  <li>
                    <b>Email : </b> {maintenance.email}
                  </li>
                  <li>
                    <b>Status : </b> {maintenance.status}
                  </li>
                  <li>
                    <b>Issues Note : </b> {maintenance.first_note}
                  </li>
                  <li>
                    <b>Troubleshoting Note : </b> {maintenance.last_note}
                  </li>
                  <li>
                    <b>Last Update at : </b> {maintenance.updatedAt}
                  </li>
                </ul>
              ))}
            </div>

            <div className="bg-slate-100 p-5 items-center justify-center">
              <InformationCircleIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
              <h2>Informasi Teknisi</h2>
              {Object.values(teknisiwos).map((teknisiwo, index) => (
                <div
                  className="text-sm font-light text-gray-900 m-10 indent-8"
                  key={index + 1}
                >
                  <p>{teknisiwo.act_desk}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <div className="grid grid-rows-2 grid-flow-col gap-4">
          <div className="bg-slate-100 p-5 items-center justify-center">
            <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
            <h2>Upload Dokumentasi</h2>
            {Object.values(maintenances).map((maintenance, index) => (
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
                  defaultValue={maintenance.id}
                  ref={f4id}
                />
                <input
                  id="f4_no_wo"
                  type="hidden"
                  defaultValue={maintenance.no_wo}
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

          <div className="bg-slate-100 p-5 items-center justify-center">
            <ArrowCircleUpIcon className="h-7 w-7 fill-blue-500 -ml-5 -mb-2" />
            <h2>Update Maintenance Report</h2>
            {Object.values(maintenances).map((maintenance, index) => (
              <form
                className="mx-2 mt-10 space-y-6"
                encType="multipart/form-data"
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
                  defaultValue={maintenance.id}
                  ref={f3id}
                />
                <input
                  id="f3_no_wo"
                  type="hidden"
                  defaultValue={maintenance.no_wo}
                  ref={f3no_wo}
                />
                <input
                  id="f3_nama_client"
                  type="hidden"
                  defaultValue={maintenance.nama_client}
                  ref={f3nama_client}
                />
                <input
                  id="f3_id_pelanggan"
                  type="hidden"
                  defaultValue={maintenance.id_pelanggan}
                  ref={f3id_pelanggan}
                />
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
                    id="f3_last_note"
                    rows="8"
                    placeholder="Last Note"
                    ref={f3last_note}
                    defaultValue={maintenance.last_note}
                    required
                  ></textarea>
                </div>
                <br />
                <button
                  className="group relative w-full flex justify-center 
                            py-2 px-4 border border-transparent text-sm font-medium 
                            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Simpan Report Dismantle
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateWoMaintenance;
