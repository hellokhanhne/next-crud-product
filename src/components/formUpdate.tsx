import { useAppDispatch } from "app/hooks";
import { setUpdateProduct, updateProduct } from "app/reducer/productSlice";
import { Product } from "interface";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface IInitState {
  productName: string;
  price: string;
  urlImage: string;
}

interface IProps {
  updateProductData: Product;
  handleClose: () => void;
}

const UpdateForm = ({ updateProductData, handleClose }: IProps) => {
  const router = useRouter();

  const [product, setProduct] = useState<IInitState>({
    price: updateProductData.price.toString(),
    productName: updateProductData.productName,
    urlImage: updateProductData.urlImage,
  });

  const dispatch = useAppDispatch();
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        id: updateProductData.id,
        product: {
          ...updateProductData,
          ...product,
          price: parseFloat(product.price),
          updateDate: new Date().toLocaleDateString(),
        },
      })
    );

    dispatch(setUpdateProduct(null));
    router.push("/");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="id">
        <Form.Label>Product id</Form.Label>
        <Form.Control
          type="text"
          name="productName"
          readOnly
          required
          value={updateProductData.id}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          type="text"
          name="productName"
          placeholder="Enter product name"
          required
          value={product.productName}
          onChange={handleOnChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="urlImage">
        <Form.Label>Product image</Form.Label>
        <Form.Control
          type="text"
          name="urlImage"
          placeholder="Enter product image"
          required
          value={product.urlImage}
          onChange={handleOnChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Product price</Form.Label>
        <Form.Control
          name="price"
          type="text"
          placeholder="Enter product price"
          required
          value={product.price}
          onChange={handleOnChange}
        />
      </Form.Group>
      <div className="text-right">
        <Button
          variant="secondary"
          className="mr-2"
          type="button"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default UpdateForm;
