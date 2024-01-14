import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";

const MessagePage = () => {
  const navigate = useNavigate();
  const axiosJWT = axios.create();

  const [, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [users, setUsers] = useState([]);

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [phonenumber, setPhoneNumber] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    refreshToken();
    getUsers();
    // eslint-disable-next-line
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
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
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `bearer ${response.data.accessToken}`;
        setToken(response.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  //   const testconsole = async (e) => {
  //     e.preventDefault();
  //     console.log(phonenumber);
  //     console.log(text);
  //   };

  const sendMessage = async (e) => {
    e.preventDefault();
    const apiUrl =
      "https://api.360messenger.net/sendMessage/FlHHLUSjjcAWgramCMz9Mkvb4UHljWqf1sg";

    const formData = new FormData();
    formData.append("phonenumber", phonenumber);
    formData.append("text", text);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Bad Request: ${response.statusText}`);
      }

      const responseData = await response.json();

      setPhoneNumber("");
      setText("");
      setMsg(responseData.msg);
      setTimeout(() => {
        setMsg("");
      }, 15000);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 15000);
    }
  };

  return (
    <>
      <div className="container mx-auto bg-cyan-700 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-1">
          Messages
        </h1>
      </div>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2>Send WhatsApp Message</h2>
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
          <form onSubmit={sendMessage}>
            {/* <div>
              <label className="text-slate-500 antialiased">Phone Number</label>
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="f3_phonenumber"
                placeholder="Phone Number"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div> */}
            <div>
              <label className="text-slate-500 antialiased">To :</label>
              <select
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="f3_phonenumber"
                placeholder="Phone Number"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              >
                <option value="">Sending to...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.whatsapp}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-500 antialiased">Message</label>
              <textarea
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="f3_text"
                rows="7"
                placeholder="Text message"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
            </div>
            <br />
            <br />
            <div>
              <button className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Send
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessagePage;
