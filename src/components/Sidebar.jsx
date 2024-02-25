import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [role, setRole] = useState('staff');
  
  useEffect(() => {
    const role = window.localStorage.getItem("role");
    setRole(role);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <div className='w-[231px] h-screen bg-[#CEDEEA] flex flex-col justify-between'>
        <img src={Logo} alt="Logo" className='w-[213px] h-[73px] mt-4 mx-auto' />
        {
          role === 'staff' ?
          <div className='w-[84%] mx-auto flex flex-col gap-5'>
            <Link to='/' className='text-[20px] font-bold' >Home</Link>
            <Link to='/history' className='text-[20px]' >Acquisitions</Link>
            <Link to='/report-missing' className='text-[20px]' >Report Missing</Link>
            <Link to='/report-damaged' className='text-[20px]' >Report Damaged</Link>
            {/* <Link to='/report-forecast' className='text-[20px]' >Forecast</Link> */}
          </div>
          : 
          <div className='w-[84%] mx-auto flex flex-col gap-5'>
            <Link to='/' className='text-[20px] font-bold' >Home</Link>
            <Link to='/assets' className='text-[20px]' >Assets</Link>
            <Link to='/missing' className='text-[20px]' >Missing</Link>
            <Link to='/damages' className='text-[20px]' >Damages</Link>
            <Link to='/acquisition' className='text-[20px]' >Acquisitions</Link>
            <Link to='/forecasts' className='text-[20px]' >Forecasts</Link>
          </div>
        }
        <button onClick={handleLogout} className='bg-[#CD385C] w-[177px] h-[57px] rounded-[10px] mx-auto mb-4'>
            Logout
        </button>
    </div>
  )
}

export default Sidebar