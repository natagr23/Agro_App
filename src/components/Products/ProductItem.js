// import Modal from './Modal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';

function ProductItem({ onClose, open, title, description }) {
  return (
    <Modal onClose={onClose} open={open}>
      {/* <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      > */}
      <Box
        sx={{ mt: 10 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <h2>Product Item</h2>
        <h2>{title}</h2>
        <p>{description}</p>

        <Button sx={{ border: '1px dashed grey' }} onClick={onClose}>
          x
        </Button>
      </Box>
      {/* </Grid> */}
    </Modal>
  );
}

export default ProductItem;
