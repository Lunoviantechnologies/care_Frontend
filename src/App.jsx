import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenExpired } from './utils/authUtils';
import { logout } from './features/auth/authSlice';
import ScrollToTop from './scrollToTop';

function App() {

  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.auth);

  useEffect(() => {
    if (accessToken && isTokenExpired(accessToken)) {
      dispatch(logout());
    }
  }, [accessToken]);

  return (
    <div className="App">

      <ScrollToTop />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default App;
