// import Modal from './Modal';
import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';

import TextareaAutosize from '@mui/material/TextareaAutosize';

import { db } from '../Api/firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuthState } from '../../Context/AuthContext_reducer';

function AddProduct({ onClose, open }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  // const { user } = useAuthState();
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now(),
        created_At: Timestamp.fromDate(new Date()),
        // created_By: user.user.uid,
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
          sx={{ mt: 10 }}
        >
          {/* <form onSubmit={handleSubmit} className="addTask" name="addTask"> */}
          <Button onClick={onClose}>x</Button>
          <TextareaAutosize
            minRows={1}
            name="title"
            onChange={(e) => setTitle(e.target.value.toUpperCase())}
            value={title}
            placeholder="Enter title"
            variant="filled"
            id="add Product"
            label="add Product"
          />
          <TextareaAutosize
            minRows={1}
            style={{ width: 200 }}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task decription"
            value={description}
          />
          {/* <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task decription"
            value={description}
          ></textarea> */}

          <Button type="submit">Done</Button>
          {/* </form> */}
        </Box>
      </Modal>
    </>
  );
}

export default AddProduct;
