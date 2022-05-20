import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
// import SearchBar from '../../components/SearchBar/SearchBar';
// import { AuthProvider } from '../AuthContext/AuthContext';

import Stack from '@mui/material/Stack';

export default function Account() {
  // const ctx = useContext(AuthProvider);
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
      navigate('/SignIn');
    }
  }, [navigate]);
  return (
    <>
      <div> Account</div>
      <p> Account...</p>

      <p> Account...</p>
      <p> Account...</p>
      <Stack direction="row" spacing={2}>
        <Button>Create Products</Button>
      </Stack>

      <Button onClick={handleLogout}>Log out</Button>
      {/* <SearchBar /> */}
    </>
  );
}
