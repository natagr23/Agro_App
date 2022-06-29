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

function EditProduct({ onClose, toEditName, toEditDescription, id, open }) {
  const [name, setName] = useState(toEditName);
  const [description, setDescription] = useState(toEditDescription);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, 'products', id);
    try {
      await updateDoc(taskDocRef, {
        name: name,
        description: description,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Box component="form" onSubmit={handleUpdate} noValidate sx={modalStyle}>
        <Stack spacing={3}>
          <TextField
            minRows={1}
            // name="title"

            value={name}
            // placeholder={productName}
            variant="filled"
            id="add Product"
            // checked={checked}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            label="Enter Product Name"
            // onClick={() => setChecked(!checked)}
          />

          <TextField
            minRows={1}
            name="description"
            // checked={checked}
            onChange={(e) => setDescription(e.target.value)}
            variant="filled"
            // placeholder={productDescription}
            value={description}
            label="Enter Product Description"
            // onClick={() => setChecked(!checked)}
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
