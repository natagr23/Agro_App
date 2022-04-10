import * as React from 'react';
import { useState } from 'react';
import { auth } from '../Api/firebase-config';

import { sendPasswordResetEmail } from 'firebase/auth';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
// import Button from '../../components/common/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleReset(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('password reset email sent');
        setMessage('Check your email to reset passowrd');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          toast.error('Please check the Email');
        }

        setError('Email not found');
        // ..
      });
  }

  return (
    <React.Fragment>
      {/* <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 7, width: '25ch' },
        }}
        noValidate
        autoComplete="on"
      > */}
      <h2>
        <br /> Password Reset Page
      </h2>

      <form onSubmit={handleReset}>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}

        <label>Email</label>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="E-mail"
        />

        <FilledInput
          type="submit"
          value="Submit"
          color="primary"
          variant="filled"
          inputProps={{
            'aria-label': 'weight',
          }}
        />
        <p>
          <Link to="/">Cancel</Link>
        </p>
      </form>
      {/* </Box> */}
    </React.Fragment>
  );
}

export default ForgotPassword;
