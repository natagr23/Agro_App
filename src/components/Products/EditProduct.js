// import Modal from './Modal';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Api/firebase-config';

function EditProduct({ open, onClose, toEditTitle, toEditDescription, id }) {
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);

  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, 'products', id);
    try {
      await updateDoc(taskDocRef, {
        title: title,
        description: description,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditProduct;
