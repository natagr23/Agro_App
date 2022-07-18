// import Modal from './Modal';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ProductItem({
  onClose,
  open,
  name,
  description,
  latitude,
  longitude,
  place,
}) {
  return (
    <Modal onClose={onClose} open={open}>
      <div style={{ height: 400, width: 1000 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
                <TableCell>Place</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{latitude}</TableCell>
                <TableCell>{longitude}</TableCell>
                <TableCell>{place}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Modal>
  );
}

export default ProductItem;
