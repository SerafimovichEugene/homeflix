import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface HardDeleteModalProps {
  isShow: boolean;
  handleSubmit: () => void;
  handleClose: () => void;
}

export const HardDeleteModal: FC<HardDeleteModalProps> = ({ isShow, handleSubmit, handleClose }) => {
  return (
    <Modal show={isShow} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Alert!</Modal.Title>
      </Modal.Header>
      <Modal.Body>This video will be deleted from file system irreversibly!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} size="sm">
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} size="sm">
          Do it
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
