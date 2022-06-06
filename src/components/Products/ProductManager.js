import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../Api/firebase-config';
import AddProduct from './AddProduct';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

const columns = [
  { field: 'id', headerName: 'Product Id', width: 150 },
  { field: 'name', headerName: 'Product Name', width: 150 },
  { field: 'description', headerName: 'Product Description', width: 200 },
  { field: 'created', headerName: 'Product Date', width: 200 },
];

function ProductManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [products, setProducts] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(
      collection(db, 'products'),
      orderBy('created', 'desc')
    );
    onSnapshot(taskColRef, (snapshot) => {
      console.log(snapshot.docs);
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <Stack spacing={1} justifyContent="flex-end" alignItems="baseline">
      <header>Product Manager</header>

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="baseline"
        spacing={1}
      >
        <Button variant="contained" onClick={() => setOpenAddModal(true)}>
          Add
        </Button>
        <Button variant="contained" color="success">
          Edit
        </Button>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </Stack>

      <div style={{ height: 400, width: 700 }}>
        <DataGrid
          rows={products.map((product) => ({
            id: product.id,
            name: product.data.name,
            description: product.data.description,
            created: product.data.created.toDate(),
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      {openAddModal && (
        <AddProduct
          onClose={() => setOpenAddModal(false)}
          open={openAddModal}
        />
      )}
    </Stack>
  );
}

export default ProductManager;
