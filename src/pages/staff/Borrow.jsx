import React, { useContext, useEffect, useState } from 'react'
import List from '../../components/List';
import Context from '../../components/Context';
import { URL } from '../../config/api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Borrow = () => {
    const [assets, setAssets] = useState([]);
    const [selectedAssets, setSelectedAsset] = useState();
    const [data , setData] = useState({
        date: '',
        reason: '',
        loading: false,
    })

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await axios.get(`${URL}/api/assets`);
        setAssets(data.data.assets);
        setSelectedAsset(data.data.assets[0]);
    }

    const handleBorrow = async () => {  
        try {
            setData({ ...data, loading: true });

            const token = window.localStorage.getItem('token');
            const userId = jwtDecode(token).user._id;

            const payload = {
                asset: selectedAssets,
                returnTime: data.date,
                reason: data.reason,
                userId,
            };

            const results = await axios.post(`${URL}/api/borrow`, payload);
            alert(results.data.message);
            setData({ date: '', reason: '', loading: false });
        } catch (error) {
            alert(error.response.data.message);
            setData({ loading: false });
        }
    }
    

  return (
    <div className='w-full flex flex-col'>
        <h1 className='text-3xl font-bold text-center mt-20'>Borrow Asset</h1>
        <div className='mt-[50px] flex flex-col items-center justify-center'>
            <List selectedItem={selectedAssets} setSelectedItem={setSelectedAsset} data={assets} />
            <input onChange={(e) => setData({ ...data, date: e.target.value, })} value={data.date} type="date" className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Return Time' />
            <textarea onChange={(e) => setData({ ...data, reason: e.target.value })} value={data.reason} className='w-[561px] h-[155px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Reason' ></textarea>
            <button onClick={handleBorrow} className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#68A7E2] text-white font-bold text-[16px] px-5 mt-5'>
                { data.loading ? 'Loading...' : 'Submit' }
            </button>
        </div>
    </div>
  )
}

export default Borrow