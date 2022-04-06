import React, { useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Home() {
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  };
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/components/Home/Home');
    }

    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <>
      <div> Home Page</div>
      <p> Home...</p>
      <Button onClick={handleLogout}>Log out</Button>
      <SearchBar />
    </>
  );
}
