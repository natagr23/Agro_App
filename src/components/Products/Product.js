// import './task.css';
import { useState } from 'react';
import ProductItem from './ProductItem';
import EditProduct from './EditProduct';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { db } from '../Api/firebase-config';
import Button from '@mui/material/Button';
import { List, ListItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Product({ id, name, description, latitude, longitude, place }) {
  // const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
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
    <>
      <div style={{ height: 200, width: 1000 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
                <TableCell>Place Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{latitude}</TableCell>
                <TableCell>{longitude}</TableCell>
                <TableCell>{place}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    type="submit"
                    color="error"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    type="submit"
                    color="success"
                    onClick={() => setOpen({ ...open, edit: true })}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => setOpen({ ...open, view: true })}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {open.view && (
          <ProductItem
            onClose={handleClose}
            name={name}
            description={description}
            open={open.view}
            latitude={latitude}
            longitude={longitude}
            place={place}
          />
        )}

        {open.edit && (
          <EditProduct
            onClose={handleClose}
            toEditName={name}
            toEditDescription={description}
            toEditLatitude={latitude}
            toEditLongitude={longitude}
            toEditPlace={place}
            open={open.edit}
            id={id}
          />
        )}
      </div>
    </>
  );
}

export default Product;
