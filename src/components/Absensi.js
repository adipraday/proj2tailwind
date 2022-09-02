import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid'
import {  } from "react-router-dom";

const Absensi = () => {

    

    const [, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    const [msg, setMsg] = useState('');
    const [error] = useState('');

    const [absensis, setAbsensis] = useState([]);

    const navigate = useNavigate();
    const axiosJWT = axios.create();


    useEffect(() => {
        refreshToken()
    }, []);
    
    const refreshToken = async() => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if(error.response){
                navigate('/');
            }
        }
    }

    axiosJWT.interceptors.request.use(async(config) =>{
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `bearer ${response.data.accessToken}`;
            setToken(response.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    });

    useEffect(() => {
        getAbsensis()
    }, []);

    const getAbsensis = async() => {
        const resAbsensis = await axiosJWT.get('http://localhost:5000/absensi', {
            headers:{
                Authorization: `bearer ${token}`
            }
        });
        setAbsensis(resAbsensis.data);
    }

    const hapusDataAbsensi = async (id) =>{
        try {
            await axios.delete(`http://localhost:5000/deleteabsensi/${id}`)
            .then((response) => {
                // getAbsensis()
                setMsg(response.data.msg)
                setTimeout(() => {
                    setMsg('')
                }, 15000)
                window.location.reload(false)
          }
        );
        } catch (error) {
            console.log(error);
        }
    }

    const GtAddAbsensi = () => {
        navigate('/addabsensi');
    }

    return(
        <>

        <div className="container mx-auto bg-gray-50 p-8 antialiased">
            <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-10">Absensi</h1>
            <button
                                                onClick={()=> GtAddAbsensi()}
                                                className="inline-block px-6 py-2.5 bg-blue-600 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-blue-700 
                                                hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-blue-800 
                                                active:shadow-lg transition duration-150 ease-in-out">
                                                + Add Absensi
                                            </button>
        </div>

        <div className="container mx-auto bg-gray-50 p-8 antialiased">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            {
                                msg && (
                                    <div className='text-center rounded-lg border-4 border-rose-100 border-l-rose-300'>
                                        <CheckCircleIcon className='h-6 w-6 fill-rose-500 -mb-5'/>
                                        <p className='m-3 text-slate-500'>{msg}</p>
                                    </div>
                                )
                            }
                            {
                                error && (
                                    <div className='text-center rounded-lg border-4 border-rose-100 border-l-rose-300'>
                                        <ExclamationIcon className='h-6 w-6 fill-red-500 -mb-5'/>
                                        <p className='m-3 text-slate-500'>{error}</p>
                                    </div>
                                )
                            }
                            <table className="min-w-full">
                                <thead className="bg-blue-100 border-b">
                                    <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Nama Karyawan
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Keterangan
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Note
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        .
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                { absensis.map((absensi, index) => (
                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={absensi.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}.</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {absensi.nama}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {absensi.tgl_absensi}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {absensi.keterangan}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {absensi.note}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <button
                                                className="inline-block px-6 py-2.5 bg-blue-600 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-blue-700 
                                                hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-green-800 
                                                active:shadow-lg transition duration-150 ease-in-out">
                                                Info
                                            </button>{' '}
                                            <button
                                                onClick={()=> hapusDataAbsensi(absensi.id)}
                                                className="inline-block px-6 py-2.5 bg-red-600 
                                                text-white font-medium text-xs leading-tight 
                                                uppercase rounded-full shadow-md hover:bg-red-700 
                                                hover:shadow-lg focus:bg-red-700 focus:shadow-lg 
                                                focus:outline-none focus:ring-0 active:bg-green-800 
                                                active:shadow-lg transition duration-150 ease-in-out">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    )) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default Absensi;