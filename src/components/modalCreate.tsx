import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CreateForm from "./formCreate";

function ModalCreate() {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <>
      <div className="text-right mt-5">
        <Button variant="primary " onClick={handleOpen}>
          Create product
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCreate;
