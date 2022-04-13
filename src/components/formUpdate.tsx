import { useAppDispatch } from "app/hooks";
import { setUpdateProduct, updateProduct } from "app/reducer/productSlice";
import axios from "axios";
import { BASE_URL, IMAGE_BASE_URL } from "constant/url";
import { Product } from "interface";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, RefObject, useRef, useState } from "react";
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
  const [file, setFile] = useState(null);

  const [product, setProduct] = useState<IInitState>({
    price: updateProductData.price.toString(),
    productName: updateProductData.productName,
    urlImage: updateProductData.urlImage,
  });

  const ref: RefObject<HTMLInputElement> = useRef();

  const dispatch = useAppDispatch();
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let filename: string;
    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      filename = (await axios.post(`${BASE_URL}/upload`, formdata)).data;
    }

    dispatch(
      updateProduct({
        id: updateProductData.id,
        product: {
          ...updateProductData,
          ...product,
          price: parseFloat(product.price),
          updateDate: new Date().toLocaleDateString(),
          urlImage: file ? filename : updateProductData.urlImage,
        },
      })
    );

    dispatch(setUpdateProduct(null));
    router.push("/");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "file") {
      return setFile(e.target.files[0]);
    }
    return setProduct({
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
          onChange={handleOnChange}
        />
      </Form.Group>
      {(product.urlImage || file) && (
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "50%",
            marginBottom: "20px",
          }}
        >
          <Image
            src={
              file
                ? URL.createObjectURL(file)
                : `${IMAGE_BASE_URL}/${product.urlImage}`
            }
            loader={() =>
              file
                ? URL.createObjectURL(file)
                : `${IMAGE_BASE_URL}/${product.urlImage}`
            }
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
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default UpdateForm;
