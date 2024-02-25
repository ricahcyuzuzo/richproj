import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../../config/api';
import Photo from '../../assets/print.png';
import Modal from 'react-modal';


function AdminForecasts() {
    const [forecasts, setForecasts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contents, setContents] = useState({});

    useEffect(() => {
        getForeCasts();
    }, []);

    const getForeCasts = async () => {
        const results = await axios.get(`${URL}/api/llama/forecasts`);
        setForecasts(results.data.forecasts);
    }

    const SimpleModal = ({ isOpen, onClose, assetName, content }) => {
        return (
          <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 flex items-center justify-center z-50 outline-none"
            overlayClassName="fixed inset-0 bg-gray-800"
          >
            <div className="bg-white p-8 rounded w-[80%]">
              <h1 className="text-xl font-bold mb-4">Fore Cast for {assetName}</h1>
              <p className="text-gray-700">{content}</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
                Close
              </button>
            </div>
          </Modal>
        );
      };

  return (
    <div className='w-full'>
        <div className='flex flex-row justify-between mt-20 px-10'>
            <div />
            <h1 className='text-3xl font-bold text-center '>Forecasts</h1>
        </div>
        <div className='mt-[70px] w-[95%] mx-auto'>
            <div class="relative overflow-x-auto sm:rounded-lg mt-[30px]">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Asset
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { forecasts.map((item, idx) => <tr onClick={() => {
                            setContents(item);
                            setIsModalOpen(true);
                        }} key={idx} class="cursor-pointer odd:bg-white even:bg-gray-50 border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.asset.name}
                            </th>
                            <td class="px-6 py-4">
                                {item.description.slice(0, 150) + "..." }
                            </td>
                        </tr>)}

                        <SimpleModal isOpen={isModalOpen} onClose={() => {
                            setIsModalOpen(false)
                            setContents({});
                        }} assetName={contents?.asset?.name} content={contents?.description} />
                    </tbody>
                </table>
            </div>


        </div>
    </div>
  )
}

export default AdminForecasts