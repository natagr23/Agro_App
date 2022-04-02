import * as React from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

export default function Login() {
  return (
    <>
      <main>
        <h2>Services</h2>
        <p>Login....</p>

        <FormControl>
          <Input
            // id="my-input"
            aria-describedby="my-helper-text"
            // ref={1}
            id="email"
            label="E-Mail"
            type="email"
            // isValid={}
            // value={value}
            // onChange={onChange}
            // onBlur={}
          />
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            // ref={passwordInputRef}
            // id="password"
            label="Password"
            type="password"
            // isValid={passwordIsValid}
            // value={passwordState.value}
            // onChange={passwordChangeHandler}
            // onBlur={validatePasswordHandler}
          />

          <Box
            sx={{
              p: 5,
              pb: 1,
            }}
          >
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </FormControl>
      </main>
    </>
  );
}
