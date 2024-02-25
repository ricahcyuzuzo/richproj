import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../../config/api';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [counts, setCounts] = useState({});
    
    useEffect(() => {
        getAcquisitions();
        getCounts();
    }, []);

    const getAcquisitions = async () => {
        const token = window.localStorage.getItem('token');
        const userId = jwtDecode(token).user._id;
        const results = await axios.get(`${URL}/api/acquisition?userId=${userId}`);
        setHistory(results.data.acquisitions);
    }

    const getCounts = async () => {
        try {
            const token = window.localStorage.getItem('token');
            const userId = jwtDecode(token).user._id;

            const results = await axios.get(`${URL}/api/staff/counts?userId=${userId}`);

            setCounts(results.data.counts);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
  return (
    <div className='w-[94%] h-screen'>
        <div className='flex w-[90%] flex-row justify-between items-center mx-5 mt-9'>
            <h1 className='text-[20px] font-bold'>User Dashboard</h1>
            <div className='flex flex-row items-center justify-center gap-5'>
                <div>
                    <h1 className='text-[16px] font-bold text-[#418ABF]'>Hello Richard</h1>
                    <h1 className='text-[16px] font-bold text-[#707376] text-right'>Staff</h1>
                </div>
                <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" className='w-[85px] h-[85px]' alt="Profile" />
            </div>
        </div>

        <div className='mt-[60px] w-[70%] mx-auto flex flex-row justify-between'>
            <div className='w-[272px] bg-[#D9D9D9] h-[153px] rounded-3xl flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold text-black w-[95px] text-center'>Acquisitions</h1>
                <h2 className='text-6xl font-bold text-black'>{counts?.acquisitions}</h2>
            </div>
            <div className='w-[272px] bg-[#D9D9D9] h-[153px] rounded-3xl flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold text-black w-[95px] text-center'>Missing Assets</h1>
                <h2 className='text-6xl font-bold text-black'>{counts?.missing}</h2>
            </div>
            <div className='w-[272px] bg-[#D9D9D9] h-[153px] rounded-3xl flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold text-black w-[95px] text-center'>Damaged Assets</h1>
                <h2 className='text-6xl font-bold text-black'>{counts?.depreciated}</h2>
            </div>
        </div>

        <div className='mt-[70px] w-[95%] mx-[20px]'>
            <h1 className='text-2xl font-bold'>Asset Borrowed</h1>
            <div class="relative overflow-x-auto sm:rounded-lg mt-[30px]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Borrowed Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Return Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Reason
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {history.map((item, idx) =>  <tr key={idx} class="odd:bg-white even:bg-gray-50 border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.asset.name}
                            </th>
                            <td class="px-6 py-4">
                                {item.borrowTime}
                            </td>
                            <td class="px-6 py-4">
                                {item.returnTime}
                            </td>
                            <td class="px-6 py-4">
                                {item.reason}
                            </td>
                            <td class={`px-6 py-4 ${item.status === 'pending' ? 'text-yellow-600' : item.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                                {item.status}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>


        </div>
    </div>
  )
}

export default Dashboard