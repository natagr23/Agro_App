// import Modal from './Modal';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Api/firebase-config';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function EditProduct({
  onClose,
  toEditName,
  toEditDescription,
  toEditLatitude,
  toEditLongitude,
  toEditPlace,
  id,
  open,
}) {
  const [name, setName] = useState(toEditName);
  const [description, setDescription] = useState(toEditDescription);
  const [latitude, setLatitude] = useState(toEditLatitude);
  const [longitude, setLongitude] = useState(toEditLongitude);
  const [place, setPlace] = useState(toEditPlace);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const productDocRef = doc(db, 'products', id);
    try {
      await updateDoc(productDocRef, {
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
        place: place,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Stack spacing={3}>
        <Box component="form" onSubmit={handleUpdate} sx={modalStyle}>
          {/* <form onSubmit={handleUpdate} className="editTask"> */}
          <Stack
            direction="row"
            // justifyContent="flex-end"
            alignItems="baseline"
            // divider={
            //   <Divider
            //     variant="inset"
            //     component="li"
            //     orientation="horizontal"
            //     flexItem
            //   />
            // }
            spacing={1}
          >
            <Typography
              sx={{ mt: 0.5, ml: 9 }}
              color="text.primary"
              display="block"
              variant="caption"
            >
              Product Name
            </Typography>
            <TextField
              type="text"
              name="title"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Typography
              sx={{ mt: 0.5, ml: 9 }}
              color="text.primary"
              display="block"
              variant="caption"
            >
              Description
            </Typography>
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <Typography
              sx={{ mt: 0.5, ml: 9 }}
              color="text.primary"
              display="block"
              variant="caption"
            >
              Latitude
            </Typography>
            <TextField
              onChange={(e) => setLatitude(+e.target.value)}
              value={latitude}
            />
            <Typography
              sx={{ mt: 0.5, ml: 9 }}
              color="text.primary"
              display="block"
              variant="caption"
            >
              Longitude
            </Typography>
            <TextField
              onChange={(e) => setLongitude(+e.target.value)}
              value={longitude}
            />
            <Typography
              sx={{ mt: 0.5, ml: 9 }}
              color="text.primary"
              display="block"
              variant="caption"
            >
              Place
            </Typography>
            <TextField
              onChange={(e) => setPlace(e.target.value)}
              value={place}
            />
          </Stack>
          <Stack
            direction="column"
            justifyContent="flex-end"
            // alignItems="baseline"
            spacing={1}
          >
            <Button type="submit">Edit</Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Close{' '}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Modal>
  );
}

export default EditProduct;
