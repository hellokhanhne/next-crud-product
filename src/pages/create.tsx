import { useAppDispatch } from "app/hooks";
import { createProduct } from "app/reducer/productSlice";
import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface IInitState {
  productName: string;
  price: string;
  urlImage: string;
}

const initState: IInitState = {
  productName: "",
  price: "",
  urlImage: "",
};

const Create = () => {
  const [product, setProduct] = useState<IInitState>(initState);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useAppDispatch();
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      createProduct({
        ...product,
        price: parseFloat(product.price),
        createDate: new Date().toLocaleDateString(),
        updateDate: null,
      })
    );

    setProduct(initState);
  };
  return (
    <div className="mt-5">
      <Form onSubmit={handleFormSubmit}>
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

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default Create;
