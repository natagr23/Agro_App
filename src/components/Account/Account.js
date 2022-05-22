import React, { useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
// import SearchBar from '../../components/SearchBar/SearchBar';
import { AuthContext } from '../AuthContext/AuthContext';
import Stack from '@mui/material/Stack';
import { signOut } from 'firebase/auth';
import { auth } from '../Api/firebase-config';

export default function Account() {
  const ctx = useContext(AuthContext);
  const handleLogout = () => {
    ctx.updateUser(null);
    signOut(auth);
    navigate('/components/Home/Home');
  };
  let navigate = useNavigate();
  useEffect(() => {
    if (ctx.currentUser) {
      navigate('/components/Account/Account');
    }

    if (!ctx.currentUser) {
      navigate('/components/Login/SignIn');
    }
  }, [navigate, ctx.currentUser]);
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
