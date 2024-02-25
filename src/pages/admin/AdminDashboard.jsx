import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../../config/api';

const AdminDashboard = () => {
    const [counts, setCounts] = useState({});

    useEffect(() => {
        getCounts();
    }, []);

    const getCounts = async () => {
        try {

            const results = await axios.get(`${URL}/api/admin/counts`);

            setCounts(results.data.counts);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
  return (
    <div className='w-[94%] h-screen'>
        <div className='flex w-[90%] flex-row justify-between items-center mx-5 mt-9'>
            <h1 className='text-[20px] font-bold'>Admin Dashboard</h1>
            <div className='flex flex-row items-center justify-center gap-5'>
                <div>
                    <h1 className='text-[16px] font-bold text-[#418ABF]'>Hello Richard</h1>
                    <h1 className='text-[16px] font-bold text-[#707376] text-right'>Admin</h1>
                </div>
                <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" className='w-[85px] h-[85px]' alt="Profile" />
            </div>
        </div>

        <div className='mt-[60px] w-[95%] gap-10 mx-auto flex flex-row flex-wrap justify-center'>
            <div className='w-[272px] bg-[#D9D9D9] h-[153px] rounded-3xl flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold text-black w-[95px] text-center'>Total Assets</h1>
                <h2 className='text-6xl font-bold text-black'>{counts?.assets}</h2>
            </div>
            <div className='w-[272px] bg-[#D9D9D9] h-[153px] rounded-3xl flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold text-black w-[95px] text-center'>Missing Assets</h1>
                <h2 className='text-6xl font-bold text-black'>{counts?.missing}</h2>
            </div>
            <div className='w-[272px] bg-[#D9D9D9] h-[153px] rounded-3xl flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold text-black w-[95px] text-center'>Damaged Assets</h1>
                <h2 className='text-6xl font-bold text-black'>{counts?.depreciated}</h2>
            </div>
            <div className='w-[272px] bg-[#D9D9D9] h-[153px] rounded-3xl flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold text-black w-[95px] text-center'>Acquisitions</h1>
                <h2 className='text-6xl font-bold text-black'>{counts?.acquisitions}</h2>
            </div>
            <div className='w-[272px] bg-[#D9D9D9] h-[153px] rounded-3xl flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold text-black w-[95px] text-center'>Forecasts</h1>
                <h2 className='text-6xl font-bold text-black'>{counts?.forecasts}</h2>
            </div>
        </div>
        </div>
  )
}

export default AdminDashboard