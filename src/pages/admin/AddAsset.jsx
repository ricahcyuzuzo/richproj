import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../../config/api';

const AddAsset = () => {
    const [data, setData] = useState({
        name: '',
        sn: '',
        usage: '',
        loading: false,
    });

    const handleAddAsset = async () => {

        setData({ ...data, loading: true });
        const payload = await axios.post(`${URL}/api/asset`, {
            name: data.name,
            sn: data.sn,
            usage: data.usage,
        });

        alert(payload.data.message);
        setData({ name: '', sn: '', usage: '', loading: false });
    }


  return (
    <div className='w-full flex flex-col'>
        <h1 className='text-3xl font-bold text-center mt-20'>Add Asset</h1>
        <div className='mt-[50px] flex flex-col items-center justify-center'>
            
            <input onChange={(e) => setData({ ...data, name: e.target.value})} type="text" className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Asset Name' />
            <input onChange={(e) => setData({ ...data, sn: e.target.value})} type="text" className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Serial Number' />
            <textarea onChange={(e) => setData({ ...data, usage: e.target.value})} className='w-[561px] h-[155px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Usage' ></textarea>
            <button onClick={handleAddAsset} className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#68A7E2] text-white font-bold text-[16px] px-5 mt-5'>
                { data.loading ? 'Loading' : 'Submit' }
            </button>
        </div>
    </div>
  )
}

export default AddAsset