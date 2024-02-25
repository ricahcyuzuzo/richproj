import React, { useEffect, useState } from 'react'
import Photo from '../../assets/print.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../config/api';

const Assets = () => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await axios.get(`${URL}/api/assets`);
        setAssets(data.data.assets);
        console.log(data.data);
    }

    const handleDisposed = async (id, disposed) => {
        await axios.patch(`${URL}/api/dispose`, { id, disposed });
        getData();
        alert(payload.data.message);
    }

    const handleRequestForecast = async (asset) => {
        const data = await axios.post(`${URL}/api/llama/forecast`, {
            asset,
            request: `Predict the forecast of a ${asset.name} now for example, Just not for the future purchase. Clarify what problems it would get in 5 years from now. When it should be replaced. Use few words. `
        });

        alert(data.data.message);
    }

  return (
    <div className='w-full'>
        <div className='flex flex-row justify-between mt-20'>
            <div />
            <h1 className='text-3xl font-bold text-center '>Assets</h1>
            <div className='flex flex-row gap-5'>
                <Link to={'/assets/new'} className='items-center flex justify-center w-[100px] h-[50px] bg-sky-600 text-white rounded-lg'>Add Asset</Link>
                {/* <img src={Photo} className='w-[54px] h-[66px]' /> */}
            </div>
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
                                Serial Number
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Usage
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Forecast
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { assets.map((item, idx) => <tr key={idx} class="odd:bg-white even:bg-gray-50 border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                { item.name }
                            </th>
                            <td class="px-6 py-4">
                                { item.sn }
                            </td>
                            <td class="px-6 py-4">
                                { item.usage }
                            </td>
                            <td class="px-6 py-4">
                                { item.status === 'inuse' ? <span className='text-white bg-green-700 px-2 py-1'>In Use</span> : <span className='text-white bg-red-700 py-1 px-2'>Disposed</span> }
                            </td>
                            <td class="px-6 py-4 text-sky-600">
                                {
                                    item.status === 'inuse'?
                                    <button onClick={() => handleDisposed(item._id, false)} className='w-[100px] h-[50px] rounded-lg bg-red-700 text-white'>Dispose</button>
                                    :
                                    <button onClick={() => handleDisposed(item._id, true)} className='w-[100px] h-[50px] rounded-lg bg-green-500 text-white'>UnDispose</button>
                                }
                            </td>
                            <td class="px-6 py-4 text-sky-600">
                            <button onClick={() => handleRequestForecast(item)} className='w-[100px] h-[50px] rounded-lg bg-green-500 text-white'>Request Forecast</button>

                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>


        </div>
    </div>
  )
}

export default Assets
