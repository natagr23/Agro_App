import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { AuthContext } from '../AuthContext/AuthContext';
import Stack from '@mui/material/Stack';
import Image from '../Data/ag.jpg';

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
      <img src={`${Image}`} alt="image_ag" width="1000" />
      <div> Account</div>
      <p> Account...</p>

      <Stack direction="row" spacing={2}>
        <Button>Create Products</Button>
      </Stack>
    </>
  );
}
