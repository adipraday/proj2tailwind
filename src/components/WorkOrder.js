import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";

const WorkOrder = () => {

    const navigate = useNavigate();
    const axiosJWT = axios.create();

    const [, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [workorders, setWorkOrders] = useState('');

    const BtAddWorkOrder = () => {
        navigate('/addworkorder');
    }

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
        getWorkOrder()
    }, []);

    const getWorkOrder = async() => {
        const resWorkOrders = await axiosJWT.get('http://localhost:5000/workorders', {
            headers:{
                Authorization: `bearer ${token}`
            }
        });
        setWorkOrders(resWorkOrders.data);
    }

    const hapusDataWO = async (id) =>{
        try {
            await axios.delete(`http://localhost:5000/deleteworkorder/${id}`)
            .then((response) => {
                window.location.reload(false)
                return alert("Data telah dihapus")
          }
        );
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>

        <div className="container mx-auto bg-gray-50 p-8 antialiased">
            <table className="float-right bottom">
                <thead>
                    <tr>
                        <td>
                            <div>
                                <label className="sr-only">
                                    Masukkan No. Work Order
                                </label>
                                <input
                                type="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Masukkan No. Work Order"
                                />
                            </div>
                        </td>
                        <td>
                            <button
                                className="inline-block px-6 py-2.5 bg-green-400 
                                text-white font-medium text-xs leading-tight 
                                uppercase rounded-full shadow-md hover:bg-green-500 
                                hover:shadow-lg focus:bg-green-700 focus:shadow-lg 
                                focus:outline-none focus:ring-0 active:bg-green-600 
                                active:shadow-lg transition duration-150 ease-in-out btn-lg">
                                Terbitkan Work Order
                            </button>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>

        <div className="container mx-auto bg-gray-50 p-8 antialiased">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-blue-100 border-b">
                                    <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        No. Work Order
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Cust Info
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Location
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Description
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Status
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        .
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                { Object.values(workorders).map((workorder, index) => (
                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={workorder.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}.</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <b>{workorder.no_wo}</b>
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <b>{workorder.nama_client} / {workorder.id_pelanggan}</b><br/>
                                            {workorder.email} / {workorder.contact_person}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <b>{workorder.alamat}</b><br/>
                                            {workorder.tikor}<br/>
                                            {workorder.link_tikor}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <b>{workorder.paket_berlangganan}</b><br/>
                                            {workorder.label_fat}<br/>
                                            {workorder.note}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <b>{workorder.status}</b><br/>
                                            {workorder.updatedAt}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={()=> hapusDataWO(workorder.id)}
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
                                ))}
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

export default WorkOrder