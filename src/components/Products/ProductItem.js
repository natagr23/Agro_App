// import Modal from './Modal';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ProductItem({ onClose, open, name, description }) {
  return (
    <Modal onClose={onClose} open={open}>
      <div style={{ height: 400, width: 1000 }}>
        <TableContainer component={Paper}>
          <Table>
            <caption>Product User List</caption>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Modal>
  );
}

export default ProductItem;
