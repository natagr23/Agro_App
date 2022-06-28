// inputReducer shop
//https://health-bloom.vercel.app/index
//https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/

// react vercel.app DocRef = doc(db

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ProductManager from './ProductManager';

// import { useRouter } from 'next/router';

export default function CreateProducts() {
  return (
    <>
      <Box
        sx={{
          '& > :not(style)': { m: 11, width: '100%' },
          width: '100%',
          // maxWidth: 50,
          // bgTableCellor: 'background.paper',
        }}
        autoComplete="on"
      >
        <ProductManager />
      </Box>
    </>
  );
}
