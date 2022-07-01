// import './task.css';
import { useState } from 'react';
import ProductItem from './ProductItem';
import EditProduct from './EditProduct';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { db } from '../Api/firebase-config';
import Button from '@mui/material/Button';
// import { ButtonBase } from '@mui/material';

function Product({ id, name, description, completed }) {
  // const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update firestore */
  // const handleChange = async () => {
  //   const productDocRef = doc(db, 'products', id);
  //   try {
  //     await updateDoc(productDocRef, {
  //       completed: checked,
  //     });
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

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
    <>
      <div>
        <div>
          {/* <input
            id={`checkbox-${id}`}
            className="checkbox-custom"
            name="checkbox"
            checked={checked}
            onChange={handleChange}
            type="checkbox"
          /> */}
          {/* <label
            htmlFor={`checkbox-${id}`}
            className="checkbox-custom-label"
            onClick={() => setChecked(!checked)}
          ></label> */}
        </div>
        <div className="task__body">
          <h2>{name}</h2>
          <p>{description}</p>
          <div className="task__buttons">
            <div className="task__deleteNedit">
              <Button
                className="task__editButton"
                onClick={() => setOpen({ ...open, edit: true })}
              >
                Edit
              </Button>
              <Button className="task__deleteButton" onClick={handleDelete}>
                Delete
              </Button>
            </div>
            <Button onClick={() => setOpen({ ...open, view: true })}>
              View
            </Button>
          </div>
        </div>

        {open.view && (
          <ProductItem
            onClose={handleClose}
            name={name}
            description={description}
            open={open.view}
          />
        )}

        {open.edit && (
          <EditProduct
            onClose={handleClose}
            toEditName={name}
            toEditDescription={description}
            open={open.edit}
            id={id}
          />
        )}
      </div>
    </>
  );
}

export default Product;
