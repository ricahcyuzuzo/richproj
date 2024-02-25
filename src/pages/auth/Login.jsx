import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../config/api';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();
    const [focused, setFocused] = useState(true);
    const [data, setData] = useState({
        email: '',
        password: '',
        loading: false,
    });

    const handleChange = (e) => {
        if (focused === 'email') {
            setData({ ...data, email: e.target.value });
        }else{
            setData({ ...data, password: e.target.value });
        }
    }

    const handleLogin = async () => {
        try {
            setData({ ...data, loading: true });
            const payload ={
                email: data.email,
                password: data.password,
            };
    
            const config = {
                method: "POST",
                url: `${URL}/api/login`,
                headers: {},
                data: payload,
            }
    
            const results = await axios.request(config);
            if (results) {
                setData({ ...data, loading: false });
                window.localStorage.setItem('token', results.data.token);
                window.localStorage.setItem('role', jwtDecode(results.data.token).user.role);
                window.location.href = '/';
            }
        } catch (error) {
            setData({ ...data, loading: false });
            console.log(error, 'Error');
            alert(error.response.data.message);
        }
    }

  return (
    <div className='w-full h-full bg-white flex flex-col items-center justify-center'>
        <h1 className='font-bold text-[#106FC5] text-[40px] mt-[100px]'>AUCA Asset Lifecycle Management System</h1>
        <h2 className='text-[30px] text-black font-bold mt-[60px]'>Login</h2>
        
        <input type="email" value={data.email} onChange={handleChange} onFocus={() => setFocused('email')} className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-5' placeholder='Email' />
        <input type="password" value={data.password} onChange={handleChange} onFocus={() => setFocused('password')} className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#F4F4F4] px-5 mt-4' placeholder='Password' />
        <button onClick={handleLogin} className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] bg-[#68A7E2] text-white font-bold text-[16px] px-5 mt-5'>
            { data.loading ? "Loading..." : "Login" }
        </button>
        <Link to={'/signup'} className='w-[561px] h-[55px] rounded-[10px] border-[1px] border-[#68A7E2] text-[#68A7E2] bg-white font-bold text-[16px] px-5 mt-5 flex items-center justify-center'>
            Sign up
        </Link>
    </div>
  )
}

export default Login