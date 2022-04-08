import React from 'react';

import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function ForgotPassword() {
  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 5, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <h3 textAlign="center" margin="0 0 2rem 0">
          Forgot Password
        </h3>
        <TextField margin="0 0 1rem 0" textAlign="center">
          Enter your email.
        </TextField>
        <TextField>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
          />
        </TextField>
      </Box>
    </React.Fragment>
  );
}
