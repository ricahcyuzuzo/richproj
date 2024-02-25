import React, { useEffect, useRef, useState } from 'react'
import Photo from '../../assets/print.png';
import { URL } from '../../config/api';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print'

const DamagedAdmin = () => {
    const [damaged, setDamaged] = useState([]);
    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Depreciated",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });
    
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const results = await axios.get(`${URL}/api/depreciated`);
        setDamaged(results.data.depreciated);
    }

  return (
    <div className='w-full'>
        <div className='flex flex-row justify-between mt-20 px-10'>
            <div />
            <img onClick={() => {
                handlePrint(null, () => contentToPrint.current);
            }} src={Photo} className='w-[54px] h-[66px]' />
        </div>
        <div ref={contentToPrint} className='mt-[70px] w-[95%] mx-auto'>
        <h1 className='text-3xl font-bold text-center '>Depreciated</h1>
            <div class="relative overflow-x-auto sm:rounded-lg mt-[30px]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Damaged Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Thoughts
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { damaged.map((item, idx) => <tr key={idx} class="odd:bg-white even:bg-gray-50 border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.asset.name}
                            </th>
                            <td class="px-6 py-4">
                                {item.damagedTime}
                            </td>
                            <td class="px-6 py-4">
                                {item.thoughts}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>


        </div>
    </div>
  )
}

export default DamagedAdmin
