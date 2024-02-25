import React, { useState } from 'react'
import List from '../../components/List';

const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: false },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

const Forecast = () => {
    const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <div className='w-full flex flex-col'>
        <h1 className='text-3xl font-bold text-center mt-20'>Forcasting data feed</h1>
        <div className='mt-[50px] flex flex-col items-center justify-center'>
            <List selectedItem={selectedPerson} setSelectedItem={setSelectedPerson} data={people} />
            <input type="date" className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Missing Time' />
            <textarea className='w-[561px] h-[155px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Your thoughts' ></textarea>
            <button className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#68A7E2] text-white font-bold text-[16px] px-5 mt-5'>
                Submit
            </button>
        </div>
    </div>
  )
}

export default Forecast