//https://bluuweb.github.io/react-udemy/07-crud-firestore/#crear-proyecto
//https://github.com/bluuweb/react-udemy/tree/master/src/07-crud-firestore

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../Api/firebase-config';

import AddProduct from './AddProduct';

import Product from './Product';

import Stack from '@mui/material/Stack';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';

function ProductManager({ id, name, description, completed }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  // const [openEditModal, setOpenEditModal] = useState(false);
  const [products, setProducts] = useState([]);

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

  return (
    <>
      {openAddModal && (
        <AddProduct
          onClose={() => setOpenAddModal(false)}
          open={openAddModal}
        />
      )}

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

      <div>
        {products.map((product) => (
          <Product
            id={product.id}
            key={product.id}
            // completed={products.data.completed}
            name={product.data.name}
            description={product.data.description}
          />
        ))}
      </div>
    </>
  );
}

export default ProductManager;
