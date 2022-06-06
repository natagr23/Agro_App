// import Modal from './Modal';
import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { db } from '../Api/firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddProduct({ onClose, open }) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  // const { user } = useAuthState();
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        name: productName,
        description: productDescription,
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Modal onClose={onClose} open={open}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={modalStyle}
        >
          <Stack spacing={2}>
            <TextField
              minRows={1}
              name="title"
              onChange={(e) => setProductName(e.target.value.toUpperCase())}
              value={productName}
              placeholder=""
              variant="filled"
              id="add Product"
              label="Enter Product Name"
            />

            <TextField
              minRows={1}
              onChange={(e) => setProductDescription(e.target.value)}
              variant="filled"
              placeholder=""
              value={productDescription}
              label="Enter Product Description"
            />

            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="baseline"
              spacing={1}
            >
              <Button variant="contained" type="submit">
                Add
              </Button>

              <Button variant="outlined" color="error" onClick={onClose}>
                Close
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default AddProduct;
