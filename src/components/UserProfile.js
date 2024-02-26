import TokenService from "../services/TokenService";
import { useState, useEffect, useRef } from "react";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { updateProfilePict } from "../services/UserServices";
import { getUserInfo } from "../services/UserServices";
import ApiUrl from "../config/ApiUrl";

const UserProfile = () => {
  const { userId, name, email, jobdesk, profilepict } = TokenService();

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [userdata, setUserData] = useState("");

  const username = useRef();
  const name_input = useRef();
  const jobdesk_input = useRef();
  const aktifSejak = useRef();
  const whatsapp = useRef();
  const telp = useRef();
  const status = useRef();

  const [image, setImage] = useState("");

  const [email_input, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  useEffect(() => {
    // Check if id is truthy before making the API call
    if (userId) {
      fetchUserData(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // Add id as a dependency to the useEffect dependency array

  const fetchUserData = async (userId) => {
    const userData = await getUserInfo(userId);
    if (userData) {
      setUserData(userData);
    }
  };

  const updatePP = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("image", image);
    try {
      const response = await updateProfilePict(formData);
      console.log(response);
      setImage(null);
      setMsg(response.msg);
      setTimeout(() => {
        setMsg("");
      }, 15000);
      window.location.reload(false);
    } catch (error) {
      setError(error.response.msg);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-1">
          User Profile
        </h1>
      </div>
      <div className="container grid grid-flow-row auto-rows-max flex items-center justify-center mx-auto bg-gray-50 p-8 antialiased">
        <img
          className="w-80 rounded-lg m-5 shadow-2xl"
          src={`${ApiUrl.API_BASE_URL}/${profilepict}`}
          alt=""
        />
        <ul className="list-inside">
          <li>
            Nama : <b>{name}</b>
          </li>
          <li>
            Email : <b>{email}</b>
          </li>
          <li>
            Job Desk : <b>{jobdesk}</b>
          </li>
        </ul>
      </div>
      <div className="container flex items-center justify-center mx-auto bg-gray-50 p-8 antialiased">
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
      <div className="container flex items-center justify-center mx-auto bg-gray-50 p-8 antialiased">
        <form
          id="form_update_profile_picture"
          className="mt-8 space-y-6"
          encType="multipart/form-data"
          onSubmit={updatePP}
        >
          <input type="hidden" name="id" value={userId} />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fr_profilepict" className="text-slate-800">
                Update Profile Picture
              </label>
              <input
                type="file"
                id="fr_profilepict"
                accept="image/*"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Profile Pict"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
          </div>
          <div>
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Profile Pict
            </button>
          </div>
        </form>
      </div>
      <div className="container flex items-center justify-center mx-auto bg-gray-50 p-8 antialiased">
        {Object.values(userdata).map((ud) => (
          <form
            id="form_update_base_info"
            key="fubi"
            className="mt-8 space-y-6"
            encType="multipart/form-data"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <h2>USER INFO</h2>
              <br />
              <div>
                <label htmlFor="fr_username" className="text-slate-800">
                  Username
                </label>
                <input
                  type="text"
                  id="fr_username"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  defaultValue={ud.username}
                  ref={username}
                  required
                />
              </div>
              <br />
              <div>
                <label htmlFor="fr_nlengkap" className="text-slate-800">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="fr_nlengkap"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nama Lengkap"
                  defaultValue={ud.name}
                  ref={name_input}
                  required
                />
              </div>
              <br />
              <div>
                <label htmlFor="fr_jdesk" className="text-slate-800">
                  Job Desk
                </label>
                <select
                  id="fr_jdesk"
                  className="form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  defaultValue={ud.jobdesk}
                  ref={jobdesk_input}
                  required
                >
                  <option value="">Job Desk</option>
                  <option value="NOC">NOC</option>
                  <option value="Network Enginer">Network Enginer</option>
                  <option value="Lead Network Enginer">
                    Lead Network Enginer
                  </option>
                </select>
              </div>
              <br />
              <div>
                <label htmlFor="fr_asejak" className="text-slate-800">
                  Aktif Sejak
                </label>
                <input
                  type="date"
                  id="fr_asejak"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Aktif Sejak"
                  defaultValue={ud.aktifSejak}
                  ref={aktifSejak}
                  required
                />
              </div>
              <br />
              <div>
                <label htmlFor="fr_wa" className="text-slate-800">
                  WhatsApp Contact
                </label>
                <input
                  type="text"
                  id="fr_wa"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="WhatsApp Contact"
                  defaultValue={ud.whatsapp}
                  ref={whatsapp}
                  required
                />
              </div>
              <br />
              <div>
                <label htmlFor="fr_telp" className="text-slate-800">
                  Nomor Telp
                </label>
                <input
                  type="text"
                  id="fr_telp"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nomor Telp"
                  defaultValue={ud.telp}
                  ref={telp}
                  required
                />
              </div>
              <br />
              <input type="hidden" defaultValue={ud.status} ref={status} />
            </div>

            <div>
              <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update User Info
              </button>
            </div>
          </form>
        ))}
      </div>

      <div className="container flex items-center justify-center mx-auto bg-gray-50 p-8 antialiased">
        <form
          id="form_update_authentication"
          className="mt-8 space-y-6"
          encType="multipart/form-data"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <h2>USER ACCESS</h2>
            <br />
            <div>
              <label htmlFor="fr_email" className="text-slate-800">
                Email address
              </label>
              <input
                type="email"
                id="fr_email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email_input}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label htmlFor="fr_password" className="text-slate-800">
                Password
              </label>
              <input
                type="password"
                id="fr_password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label htmlFor="fr_cpassword" className="text-slate-800">
                Confirm Password
              </label>
              <input
                type="password"
                id="fr_cpassword"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                required
              />
            </div>
            <br />
          </div>

          <div>
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update User Akses
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
