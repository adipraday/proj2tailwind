import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import TokenService from "../services/TokenService";
import { getAvailableTechnician } from "../services/UserServices";
import { addTechnicianMaintenance } from "../services/MaintenanceServices";
import { getTeknisiWoMaintenance } from "../services/MaintenanceServices";
import { hapusDataTeknisiWoMaintenance } from "../services/MaintenanceServices";
import { getWoMaintenanceById } from "../services/MaintenanceServices";
import { updateMaintenance } from "../services/MaintenanceServices";
import { updateProgressMaintenance } from "../services/MaintenanceServices";

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
    try {
      const response = await addTechnicianMaintenance({
        userId: userId,
        teknisiId: id_teknisi,
        id: id,
      });

      setIdTeknisi("");
      console.log(response);
      window.location.reload(false);
      // Show success alert or perform any other actions
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
    try {
      const response = await hapusDataTeknisiWoMaintenance(
        another_act_id,
        act_id
      );
      // Handle response data if needed
      console.log(response);
      window.location.reload(false);
      // Show success alert or perform any other actions
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
  };

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
              {jobdesk === "Lead Network Enginer" && (
                <button
                  className="group relative w-full flex justify-center 
                              py-2 px-4 border border-transparent text-sm font-medium 
                              rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  + Tambahkan Teknisi
                </button>
              )}
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
            <h2>Perbaharui Data Maintenance</h2>

            {Object.values(maintenances).map((maintenance) => (
              <form
                className="mt-8 space-y-6"
                onSubmit={handleUpdate}
                key={maintenance.id}
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
                {jobdesk === "Lead Network Enginer" && (
                  <button
                    className="group relative w-full flex justify-center 
            py-2 px-4 border border-transparent text-sm font-medium 
            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Simpan Perubahan Data Dismantle
                  </button>
                )}
              </form>
            ))}
          </div>

          <div className="bg-slate-100 p-5 items-center justify-center">
            <h2>Update Report Maintenance</h2>
            {Object.values(maintenances).map((maintenance) => (
              <form
                className="mt-8 space-y-6"
                encType="multipart/form-data"
                onSubmit={updateProgressWo}
                key={maintenance.id}
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
                  <label className="text-slate-500 antialiased">
                    Last Note
                  </label>
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
                <div>
                  <label className="text-slate-800">Documentation Image</label>
                  <input
                    type="file"
                    id="f3_image_doc_perangkat"
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
