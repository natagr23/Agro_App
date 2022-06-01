import Product from './Product';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../Api/firebase-config';
import AddProduct from './AddProduct';

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
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="taskManager">
      <header>Product Manager</header>
      <div className="taskManager__container">
        <Button onClick={() => setOpenAddModal(true)}>Add Product +</Button>
        <div className="taskManager__tasks">
          {products.map((products) => (
            <Product
              id={products.id}
              key={products.id}
              completed={products.data.completed}
              title={products.data.title}
              description={products.data.description}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddProduct
          onClose={() => setOpenAddModal(false)}
          open={openAddModal}
        />
      )}
    </div>
  );
}

export default ProductManager;
