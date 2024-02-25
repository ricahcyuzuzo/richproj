import './App.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Layout from './pages/layout';
import Dashboard from './pages/staff/Dashboard';
import Borrow from './pages/staff/Borrow';
import History from './pages/staff/History';
import Missing from './pages/staff/Missing';
import MissingAdmin from './pages/admin/Missing';
import Damaged from './pages/staff/Damaged';
import Forecast from './pages/staff/Forecast';
import AdminDashboard from './pages/admin/AdminDashboard';
import Assets from './pages/admin/Assets';
import DamagedAdmin from './pages/admin/Damaged';
import AddAsset from './pages/admin/AddAsset';
import Context from './components/Context';
import axios from 'axios';
import { URL } from './config/api';
import Acquisitions from './pages/admin/Acquisitions';
import AdminForecasts from './pages/admin/Forecasts';

function App() {
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getData()
    const token = window.localStorage.getItem('token');
    const role = window.localStorage.getItem('role');
    setIsLoggedIn(token ? true : false);
    setRole(role);
  }, []);

  const getData = async () => {
    const data = await axios.get(`${URL}/api/assets`);
    setAssets(data.data.assets);
}



  return (
    <Context.Provider value={{ assets, setAssets }} >
    <BrowserRouter>
      <Routes>
        {
          !isLoggedIn ? 
          <Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        :
        <>
          {
            role === 'staff' ? 
            <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='/borrow' element={<Borrow />} />
            <Route path='/history' element={<History />} />
            <Route path='/report-missing' element={<Missing />} />
            <Route path='/report-damaged' element={<Damaged />} />
            <Route path='/report-forecast' element={<Forecast />} />
          </Route>
            :
            <Route path='/' element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='/assets' element={<Assets />} />
            <Route path='/assets/new' element={<AddAsset />} />
            <Route path='/missing' element={<MissingAdmin />} />
            <Route path='/damages' element={<DamagedAdmin />} />
            <Route path='/acquisition' element={<Acquisitions />} />
            <Route path='/Forecasts' element={<AdminForecasts />} />
          </Route>
          }
        </>
        }
      </Routes>
    </BrowserRouter>
    </Context.Provider>
  )
}

export default App
