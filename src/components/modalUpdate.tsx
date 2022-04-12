import { useAppDispatch, useAppSelector } from "app/hooks";
import { setUpdateProduct } from "app/reducer/productSlice";
import { Product } from "interface";
import React from "react";
import { Modal } from "react-bootstrap";
import UpdateForm from "./formUpdate";

function ModalUpdate() {
  const product: Product = useAppSelector(
    (state) => state.products.updateProductData
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setUpdateProduct(null));
  };

  return (
    <>
      <Modal show={Boolean(product)} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product && (
            <UpdateForm updateProductData={product} handleClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalUpdate;
