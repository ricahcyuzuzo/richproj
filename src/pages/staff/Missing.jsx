import React, { useContext, useEffect, useState } from 'react'
import List from '../../components/List';
import Context from '../../components/Context';
import { URL } from '../../config/api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Missing = () => {
    const [assets, setAssets] = useState([]);
    const [selectedAssets, setSelectedAsset] = useState();
    const [data , setData] = useState({
        date: '',
        thoughts: '',
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
                missingTime: data.date,
                thoughts: data.thoughts,
                userId,
            };

            const results = await axios.post(`${URL}/api/missing`, payload);
            alert(results.data.message);
            setData({ date: '', thoughts: '', loading: false });
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    

  return (
    <div className='w-full flex flex-col'>
        <h1 className='text-3xl font-bold text-center mt-20'>Report Missing</h1>
        <div className='mt-[50px] flex flex-col items-center justify-center'>
            <List selectedItem={selectedAssets} setSelectedItem={setSelectedAsset} data={assets} />
            <input value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} type="date" className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Missing Time' />
            <textarea value={data.thoughts} onChange={(e) => setData({ ...data, thoughts: e.target.value })} className='w-[561px] h-[155px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Thoughts' ></textarea>
            <button onClick={handleBorrow} className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#68A7E2] text-white font-bold text-[16px] px-5 mt-5'>
                { data.loading ? 'Loading...' : 'Submit' }
            </button>
        </div>
    </div>
  )
}

export default Missing