import {
  CheckCircleIcon,
  ExclamationIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [jobdesk, setJobdesk] = useState("");
  const [aktifSejak, setAktifSejak] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telp, setTelp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/users", {
          username: username,
          name: name,
          jobdesk: jobdesk,
          aktifSejak: aktifSejak,
          whatsapp: whatsapp,
          telp: telp,
          email: email,
          password: password,
          confPassword: confPassword,
        })
        .then((response) => {
          setUsername("");
          setName("");
          setJobdesk("");
          setAktifSejak("");
          setWhatsapp("");
          setTelp("");
          setEmail("");
          setPassword("");
          setConfPassword("");
          setMsg(response.data.msg);
          setTimeout(() => {
            setMsg("");
          }, 15000);
        });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  return (
    <>
      {/*
            This example requires updating your template:

            ```
            <html class="h-full bg-gray-50">
            <body class="h-full">
            ```
        */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={Register}>
            {msg && (
              <div className="text-center rounded-lg border-4 border-sky-100 border-l-sky-300">
                <CheckCircleIcon className="h-6 w-6 fill-blue-500 -mb-5" />
                <p className="m-3 text-slate-500">
                  {msg} <br />
                  <a href="/">Login here...</a>
                </p>
              </div>
            )}
            {error && (
              <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300">
                <ExclamationIcon className="h-6 w-6 fill-red-500 -mb-5" />
                <p className="m-3 text-slate-500">{error}</p>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">Username</label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="sr-only">Nama Lengkap</label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="sr-only">Job Desk</label>
                <select
                  class="form-select appearance-none
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
                  value={jobdesk}
                  onChange={(e) => setJobdesk(e.target.value)}
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
              <div>
                <label className="sr-only">Aktif Sejak</label>
                <input
                  type="date"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Aktif Sejak"
                  value={aktifSejak}
                  onChange={(e) => setAktifSejak(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="sr-only">WhatsApp Contact</label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="WhatsApp Contact"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="sr-only">Nomor Telp</label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nomor Telp"
                  value={telp}
                  onChange={(e) => setTelp(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
