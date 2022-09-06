import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TagIcon, UserCircleIcon, MapIcon, DocumentAddIcon, InformationCircleIcon, CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";

const TerbitkanWO = () => {

    const axiosJWT = axios.create();
    const { id } = useParams();

    const [workorders, setWorkOrders] = useState('');
    const [availabletechnician, setAvailableTechnician] = useState('');
    const [id_teknisi, setIdTeknisi] = useState('');
    const [teknisiwo, setTeknisiWO] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getWorkOrder()
    }, []);
    const getWorkOrder = async() => {
        const resWorkOrders = await axiosJWT.get(`http://localhost:5000/workorder/${id}`);
        setWorkOrders(resWorkOrders.data);
    }

    useEffect(() => {
        getAvailableTechnician()
    }, []);
    const getAvailableTechnician = async() => {
        const resAvailableTechnician = await axiosJWT.get(`http://localhost:5000/getavailabletechnician`);
        setAvailableTechnician(resAvailableTechnician.data);
    }

    const addTechnician = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/logactivitywo', {
                id_user: id_teknisi,
                id_description: id
            })
            .then((response) => {
                setIdTeknisi('')
                setMsg(response.data.msg)
                    setTimeout(() => {
                        setMsg('')
                    }, 30000)
                    window.location.reload(false)
            })
        } catch (error) {
            if (error.response) {
                setError(error.response.data.msg)
                    setTimeout(() => {
                        setError('')
                    }, 3000)
            }
        }
    }

    useEffect(() => {
        getTeknisiWo()
    }, []);
    const getTeknisiWo = async() => {
        const resTeknisiWO = await axiosJWT.get(`http://localhost:5000/loggetteknisiwo/${id}`);
        setTeknisiWO(resTeknisiWO.data);
    }

    const hapusDataTeknisiWO = async(id_user, id_description) =>{
        try {
            await axios.delete(`http://localhost:5000/deletelogworkorder`,{
                data: {
                    id_user: id_user,
                    id_description: id_description
                }
            })
            .then((response) => {
                setMsg(response.data.msg)
                setTimeout(() => {
                    setMsg('')
                }, 30000)
                window.location.reload(false)
          }
        );
        } catch (error) {
            console.log(error);
        }
    }

    const selesaiTT = () => {
        navigate('/workorder');
    }

    return(
        <>
        <div className="container mx-auto bg-gray-50 p-8 antialiased">
            <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">Tambahkan Team Teknis</h1>
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
                                    <TagIcon className='h-7 w-7 fill-blue-500 -mb-6'/><p className='ml-7 text-slate-500'>No. Work Order</p>
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    <UserCircleIcon className='h-7 w-7 fill-blue-500 -mb-6'/><p className='ml-7 text-slate-500'>Cust Info</p>
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    <MapIcon className='h-7 w-7 fill-blue-500 -mb-6'/><p className='ml-7 text-slate-500'>Location</p>
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    <DocumentAddIcon className='h-7 w-7 fill-blue-500 -mb-6'/><p className='ml-7 text-slate-500'>Description</p>
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    <InformationCircleIcon className='h-7 w-7 fill-blue-500 -mb-6'/><p className='ml-7 text-slate-500'>Status</p>
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                { Object.values(workorders).map((workorder) => (
                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={workorder.id}>
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
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto bg-gray-50 p-8 antialiased">
            <form onSubmit={addTechnician}>
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
            <table>
                <thead>
                <tr>
                    <th>
                        <select 
                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700
                        bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition 
                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                        aria-label="Default select example"
                        value={id_teknisi} onChange={(e) => setIdTeknisi(e.target.value)} required
                        >
                            <option value=''>Pilih Teknisi</option>
                            { Object.values(availabletechnician).map((availabletechnician) => (
                            <option key={availabletechnician.id} value={availabletechnician.id}>{availabletechnician.name}</option>
                            ))}
                        </select>
                    </th>
                    <th>
                        <button
                            className="group relative w-full flex justify-center 
                            py-2 px-4 border border-transparent text-sm font-medium 
                            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            + Tambahkan Teknisi
                        </button>
                    </th>
                </tr>
                </thead>
            </table>
            </form>
            <br/>
            
            <table>
            <tbody>
            { Object.values(teknisiwo).map((teknisiwo) => (
                <tr key={teknisiwo.name}>
                    <td>{teknisiwo.name}</td>
                    <td>// {teknisiwo.description}</td>
                    <td>
                        <button
                            onClick={ () => hapusDataTeknisiWO(teknisiwo.id_user, teknisiwo.id_description)}
                            className="group relative w-full flex justify-center 
                            py-2 px-4 border border-transparent text-sm font-medium 
                            rounded-md text-white bg-red-400 hover:bg-red-500 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300">
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
            </table>
            <br/><br/><br/>
            <button
                onClick={selesaiTT}
                className="group relative w-full flex justify-center 
                py-2 px-4 border border-transparent text-sm font-medium 
                rounded-md text-white bg-green-600 hover:bg-green-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                {'<<'} Kembali
            </button>
        </div>
        </>
    )
}

export default TerbitkanWO;