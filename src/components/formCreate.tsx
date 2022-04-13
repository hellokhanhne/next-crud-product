import { useAppDispatch } from "app/hooks";
import { createProduct } from "app/reducer/productSlice";
import axios from "axios";
import { BASE_URL } from "constant/url";
import Image from "next/image";
import { FormEvent, RefObject, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface IInitState {
  productName: string;
  price: string;
}

const initState: IInitState = {
  productName: "",
  price: "",
};

interface IProps {
  handleClose: () => void;
}

const CreateForm = ({ handleClose }: IProps) => {
  const [product, setProduct] = useState<IInitState>(initState);
  const [file, setFile] = useState(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "file") {
      return setFile(e.target.files[0]);
    }
    return setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const ref: RefObject<HTMLInputElement> = useRef();

  const dispatch = useAppDispatch();
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    const res = await axios.post(`${BASE_URL}/upload`, formdata);
    dispatch(
      createProduct({
        ...product,
        price: parseFloat(product.price),
        createDate: new Date().toLocaleDateString(),
        updateDate: null,
        urlImage: res.data,
      })
    );
    ref.current.value = "";
    setFile(null);
    setProduct(initState);
  };
  return (
    <div>
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
        <Form.Group className="mb-3" controlId="file">
          <Form.Label>Product image</Form.Label>
          <Form.Control
            className="form-control"
            type="file"
            name="file"
            ref={ref}
            required
            onChange={handleOnChange}
          />
        </Form.Group>

        {file && (
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "50%",
              marginBottom: "20px",
            }}
          >
            <Image
              src={URL.createObjectURL(file)}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}

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
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateForm;
