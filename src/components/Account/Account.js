import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { AuthContext } from '../AuthContext/AuthContext';
import Stack from '@mui/material/Stack';

export default function Account() {
  const ctx = useContext(AuthContext);

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
    </>
  );
}
