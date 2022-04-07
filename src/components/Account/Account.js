import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function Account() {
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/components/Home/Home');
  };
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/components/Account/Account');
    }

    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <>
      <div> Account</div>
      <p> Account...</p>

      <p> Account...</p>
      <Button onClick={handleLogout}>Log out</Button>
      <SearchBar />
    </>
  );
}
