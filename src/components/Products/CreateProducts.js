//inputReducer shop
//https://health-bloom.vercel.app/index
//https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/

//react vercel.app DocRef = doc(db

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ProductManager from './ProductManager';
import Wrapper from '../Wrapper/Wrapper';

import { db } from '../Api/firebase-config';

import { collection, query, where, onSnapshot } from 'firebase/firestore';
import classes from './myParties.module.css';
import { useAuthState } from '../../Context/AuthContext_reducer';

import { Avatar, Skeleton } from '@mui/material';
import moment from 'moment';
// import { useRouter } from 'next/router';

export default function CreateProducts() {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthState();
  React.useEffect(() => {
    const docRef = collection(db, 'parties');
    const q = query(
      docRef
      // where('created_By', '==', user.user.uid)
      //   orderBy("created_At", "desc")
    );
    const _parties = [];
    onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            const data = { ...change.doc.data(), id: change.doc.id };

            await _parties.push(data);
            setParties(_parties);
            console.log(parties);
            setLoading(false);
          }
        });
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  // const router = useRouter();
  const HoolaaSkels = () => {
    return (
      <Box display="flex" padding="20px 10px">
        <Box width="40%" display="flex" gap="15px" alignItems="center">
          <Box>
            {' '}
            <Skeleton
              style={{ borderRadius: '4px' }}
              variant="rectangular"
              height={51}
              width={51}
            />
          </Box>
          <Box width="100%" display="flex" flexDirection="column" gap="6px">
            <Skeleton width={Math.floor(Math.random() * 120) + 65} />
            <Skeleton width={Math.floor(Math.random() * 70) + 50} />
          </Box>
        </Box>
        <Box
          width="60%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box width="50%">
            <Skeleton width={20} />
          </Box>
          <Box width="50%">
            <Skeleton width={20} />
          </Box>

          <Box width="50%">
            {' '}
            <Skeleton width={Math.floor(Math.random() * 100) + 30} />
          </Box>
        </Box>
      </Box>
    );
  };
  const SkelHeader = () => {
    return (
      <Box display="flex" padding="20px 0" fontWeight="600">
        <Box width="40%">
          <Skeleton width={60} />
        </Box>
        <Box display="flex" width="60%">
          <Box width="50%">
            <Skeleton width={60} />
          </Box>
          <Box width="50%">
            <Skeleton width={70} />
          </Box>
          <Box width="50%">
            <Skeleton width={50} />
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <>
      <div>
        <Box
          sx={{
            '& > :not(style)': { m: 9, width: '30ch' },
            width: '100%',
            // maxWidth: 0,
            // bgTableCellor: 'background.paper',
          }}
          autoComplete="on"
        >
          <ProductManager />
        </Box>
      </div>
    </>
  );
}
