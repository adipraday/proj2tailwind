import { ExclamationIcon, LockClosedIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { userLogin } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    userLogin({
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((error) => {
        setMsg(error);
        setTimeout(() => {
          setError("");
        }, 15000);
      });
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" id="login_form" onSubmit={Auth}>
            {msg && (
              <div className="text-center rounded-lg border-4 border-rose-100 border-l-rose-300">
                <ExclamationIcon className="h-6 w-6 fill-red-500 -mb-5" />
                <p className="m-3 text-slate-500">{msg}</p>
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
                <label htmlFor="fl_email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="fl_email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="fl_password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="fl_password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  or Register here
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
