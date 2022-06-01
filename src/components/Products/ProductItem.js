// import Modal from './Modal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function ProductItem({ onClose, open, title, description }) {
  return (
    <Modal onClose={onClose} open={open}>
      <Box sx={{ mt: 10 }}>
        <Button onClick={onClose}>x</Button>
        <div className="taskItem">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </Box>
    </Modal>
  );
}

export default ProductItem;
