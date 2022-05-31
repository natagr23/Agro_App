import Modal from './Modal';

function ProductItem({ onClose, open, title, description }) {
  return (
    <Modal modalLable="Task Item" onClose={onClose} open={open}>
      <div className="taskItem">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Modal>
  );
}

export default ProductItem;
