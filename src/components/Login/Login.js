import * as React from 'react';
import Form from '../../components/common/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Login() {
  return (
    <Router>
      <>
        <h2>Login</h2>
        <p>Login....</p>
        <Routes>
          <Route path="/login" element={<Form />} />
          <Route path="/register" element={<Form />} />
        </Routes>
      </>
    </Router>
  );
}

// import Input from '@mui/material/Input';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import Box from '@mui/material/Box';

// <FormControl>
//           <Input
//             // id="my-input"
//             aria-describedby="my-helper-text"
//             // ref={1}
//             id="email"
//             label="E-Mail"
//             type="email"
//             // isValid={}
//             // value={value}
//             // onChange={onChange}
//             // onBlur={}
//           />
//           <Input
//             id="my-input"
//             aria-describedby="my-helper-text"
//             // ref={passwordInputRef}
//             // id="password"
//             label="Password"
//             type="password"
//             // isValid={passwordIsValid}
//             // value={passwordState.value}
//             // onChange={passwordChangeHandler}
//             // onBlur={validatePasswordHandler}
//           />

//           <Box
//             sx={{
//               p: 5,
//               pb: 1,
//             }}
//           >
//             <Button type="submit" variant="contained">
//               Login
//             </Button>
//           </Box>
//         </FormControl>
