import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../../config/api';
import { Link } from 'react-router-dom';

const History = () => {
    const [history, setHistory] = useState([]);
    
    useEffect(() => {
        getAcquisitions();
    }, []);

    const getAcquisitions = async () => {
        const token = window.localStorage.getItem('token');
        const userId = jwtDecode(token).user._id;

        const results = await axios.get(`${URL}/api/acquisition?userId=${userId}`);
        setHistory(results.data.acquisitions);
    }

  return (
    <div className='w-full'>
        <div className='flex flex-row justify-between items-center mt-20 w-[95%] mx-auto'>
            <h1 className='text-3xl font-bold text-center'>Acquisition History</h1>
            <Link to={'/borrow'} className='w-[100px] h-[50px] rounded-lg bg-sky-600 text-white flex justify-center items-center'>Borrow</Link>
        </div>
        <div className='mt-[70px] w-[95%] mx-auto'>
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

export default History