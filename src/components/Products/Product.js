import { useState } from 'react';
import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
import ProductItem from './ProductItem';
import EditProduct from './EditProduct';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../Api/firebase-config';

import { Input, InputLabel } from '@mui/material';

function Product({ id, title, description, completed }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update firestore */
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

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'products', id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <Input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          onChange={handleChange}
          type="checkbox"
        />
        <InputLabel
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></InputLabel>
      </div>
      <div className="task__body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <Button onClick={() => setOpen({ ...open, edit: true })}>
              Edit
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={() => setOpen({ ...open, view: true })}>
              View
            </Button>
          </div>
        </div>
      </div>

      {open.view && (
        <ProductItem
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditProduct
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default Product;
