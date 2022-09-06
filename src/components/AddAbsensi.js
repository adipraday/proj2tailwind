import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid'

const AddAbsensi = () => {

    const navigate = useNavigate();

    const [, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    const [id_user, setId_user] = useState('');
    const [tgl_absensi, setTgl_absensi] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [note, setNote] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const [users, setUsers] = useState([]);

    const axiosJWT = axios.create();

    useEffect(() => {
        refreshToken()
        getUsers();
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

    const getUsers = async() => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers:{
                Authorization: `bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    const saveAbsensi = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/addabsensi', {
                id_user: id_user,
                tgl_absensi: tgl_absensi,
                keterangan: keterangan,
                note: note
            })
            .then((response) => {
                    setId_user('')
                    setTgl_absensi('')
                    setKeterangan('')
                    setNote('')
                    setMsg(response.data.msg)
                    setTimeout(() => {
                        setMsg('')
                    }, 15000)
              }
            );
        } catch (error) {
            if (error.response) {
                setError(error.response.data.msg)
                    setTimeout(() => {
                        setError('')
                    }, 3000)
            }
        }
    }

    return (
    <>

    <div className="container mx-auto bg-gray-50 p-8 antialiased">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white mb-10">Add Absensi</h1>
    </div>


    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <form className="mt-8 space-y-6" onSubmit={saveAbsensi}>
                {
                    msg && (
                        <div className='text-center rounded-lg border-4 border-sky-100 border-l-sky-300'>
                            <CheckCircleIcon className='h-6 w-6 fill-blue-500 -mb-5'/>
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
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label className="sr-only">
                        Nama Karyawan
                        </label>
                        <select className="form-select appearance-none
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
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                        value={id_user} onChange={(e) => setId_user(e.target.value)} required
                        >
                            <option value="">Nama Karyawan</option>
                            { users.map((user, index) => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                            )) }
                        </select>
                    </div><br/>
                    <div>
                        <label className="sr-only">
                        Tanggal Absensi
                        </label>
                        <input
                        type="date"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Tgl Absensi"
                        value={tgl_absensi} onChange={(e) => setTgl_absensi(e.target.value)}
                        required
                        />
                    </div><br/>
                    <div>
                        <label className="sr-only">
                        Keterangan Kehadiran
                        </label>
                        <select className="form-select appearance-none
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
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                        value={keterangan} onChange={(e) => setKeterangan(e.target.value)} required
                        >
                            <option value="">Keterangan</option>
                            <option value="Tanpa Keterangan">Tanpa Keterangan</option>
                            <option value="Sakit">Sakit</option>
                            <option value="Izin">Izin</option>
                        </select>
                    </div><br/>
                    <div>
                        <label className="sr-only">
                        Note
                        </label>
                        <textarea
                        value={note} onChange={(e) => setNote(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Note"
                        ></textarea>
                    </div><br/>
                </div>

                <div>
                <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Simpan
                </button>
                <br/>
                <a href="/absensi">{'<<'}Kembali ke tabel absensi</a>
                </div>
            </form>
        </div>
    </div>

    </>
    )
}

export default AddAbsensi