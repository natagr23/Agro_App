// import Modal from './Modal';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Api/firebase-config';

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

function EditProduct({
  name,
  onClose,
  toEditName,
  toEditDescription,
  id,
  completed,
  open,
}) {
  const [productName, setProductName] = useState(toEditName);
  const [productDescription, setProductDescription] =
    useState(toEditDescription);
  const [checked, setChecked] = useState(completed);

  const handleChange = async () => {
    const taskDocRef = doc(db, 'products', id);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Box component="form" onSubmit={handleChange} noValidate sx={modalStyle}>
        <Stack spacing={3}>
          <TextField
            minRows={1}
            name="title"
            // onChange={(e) => setProductName(e.target.value.toUpperCase())}
            // value={productName}
            placeholder={productName}
            variant="filled"
            id="add Product"
            // checked={checked}
            onChange={(e) => setProductName(e.target.value.toUpperCase())}
            label="Enter Product Name"
            onClick={() => setChecked(!checked)}
          />

          <TextField
            minRows={1}
            name="description"
            // checked={checked}
            onChange={(e) => setProductDescription(e.target.value)}
            variant="filled"
            placeholder={productDescription}
            // value={productDescription}
            label="Enter Product Description"
            onClick={() => setChecked(!checked)}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="baseline"
            spacing={1}
          >
            <Button variant="contained" type="submit" onClick={onClose}>
              Edit
            </Button>

            <Button variant="outlined" color="error" onClick={onClose}>
              Close
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
    // <Modal onClose={onClose} open={open}>
    //   <form onSubmit={handleUpdate} className="editTask">
    //     <input
    //       type="text"
    //       name="title"
    //       onChange={(e) => setTitle(e.target.value.toUpperCase())}
    //       value={title}
    //     />
    //     <textarea
    //       onChange={(e) => setEditDescription(e.target.value)}
    //       value={editDescription}
    //     ></textarea>
    //     <Button type="submit">Edit</Button>
    //   </form>
    // </Modal>
  );
}

export default EditProduct;
