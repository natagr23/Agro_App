//https://bluuweb.github.io/react-udemy/07-crud-firestore/#crear-proyecto
//https://github.com/bluuweb/react-udemy/tree/master/src/07-crud-firestore

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../Api/firebase-config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'id', headerName: 'Product Id', width: 150 },
  { field: 'name', headerName: 'Product Name', width: 150 },
  { field: 'description', headerName: 'Product Description', width: 200 },
  { field: 'created', headerName: 'Product Date', width: 400 },
];

function ProductManager({ name, description, id, completed }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectionModel, setSelectionModel] = useState(false);

  const [open, setOpen] = useState({ edit: false, view: false });
  const [checked, setChecked] = useState(completed);

  useEffect(() => {
    const productColRef = query(
      collection(db, 'products'),
      orderBy('created', 'desc')
    );
    onSnapshot(productColRef, (snapshot) => {
      // console.log(snapshot.docs);
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const eliminar = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      const arrayFiltrado = products.filter((item) => item.id !== id);
      setProducts(arrayFiltrado);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

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
    <>
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
          <Button
            variant="contained"
            onClick={() => setOpen({ ...open, edit: true })}
            color="success"
          >
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => eliminar()}>
            Delete
          </Button>
        </Stack>

        <div style={{ height: 400, width: 800 }}>
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
            onSelectionModelChange={(id) => {
              setSelectionModel(id);
              const selectedIDs = new Set(id);
              const selectedRowData = products.filter((product) =>
                selectedIDs.has(product.id)
              );
              console.log(selectedRowData);
              setProducts(selectedRowData);

              // const deselectedRowData = products.filter(
              //   (product) => selectedIDs.has(product.id)
              // );

              // if (setProducts(deselectedRowData)) {
              //   setProducts('');
              // }
            }}
          />
        </div>

        {openAddModal && (
          <AddProduct
            onClose={() => setOpenAddModal(false)}
            open={openAddModal}
          />
        )}
        {open.edit && (
          <EditProduct
            onClose={() => setOpenEditModal(false)}
            open={open.edit}
            toEditTitle={name}
            toEditDescription={description}
            id={id}
          />
        )}
      </Stack>

      <Stack spacing={1} justifyContent="flex-end" alignItems="baseline">
        <h3> Add Product</h3>
        <Button
          variant="contained"
          type="submit"
          onClick={() => setOpenAddModal(true)}
        >
          Add Product
        </Button>
      </Stack>
      <div style={{ height: 400, width: 1000 }}>
        <TableContainer component={Paper}>
          <Table>
            <caption>Product User List</caption>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell onChange={handleChange}>
                    {product.data.name}
                  </TableCell>
                  <TableCell onChange={handleChange}>
                    {product.data.description}
                  </TableCell>
                  <TableCell>
                    {product.data.created.toDate().toString()}
                  </TableCell>
                  <Button
                    variant="contained"
                    type="submit"
                    color="error"
                    onClick={() => eliminar(product.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    color="success"
                    onClick={() => setOpen({ ...open, edit: true })}
                  >
                    Edit
                  </Button>
                  {open.edit && (
                    <EditProduct
                      onClose={handleClose}
                      toEditTitle={name}
                      toEditDescription={description}
                      open={open.edit}
                      id={id}
                    />
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ProductManager;

{
  /* <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {products.map((product) => (
            <ListItem ListItem key={product.id}>
              <span>{product.data.name}</span>
              <span>{product.data.description}</span>
              <span>{product.data.created.toDate().toString()}</span>
              {openAddModal && (
                <AddProduct
                  onClose={() => setOpenAddModal(false)}
                  open={openAddModal}
                />
              )}
              <Button variant="contained" type="submit" color="error">
                Delete
              </Button>
              <Button variant="contained" type="submit" color="success">
                Edit
              </Button>
            </ListItem>
          ))}
        </List> */
}
