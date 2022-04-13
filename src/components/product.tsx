import { useAppDispatch } from "app/hooks";
import { deleteProduct } from "app/reducer/productSlice";
import { Product } from "interface";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { IMAGE_BASE_URL } from "constant/url";

interface IProps {
  product: Product;
}

const Product = ({ product }: IProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    Swal.fire({
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      title: "Are you sure to delete ?",
      text: "You won't be able to revert this!",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteProduct(product.id));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };
  return (
    <>
      <Col>
        <Card className="mb-4 position-relative">
          <Button
            className="delete-btn"
            variant="danger"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Image
            objectFit="cover"
            width="100%"
            height={300}
            src={`${IMAGE_BASE_URL}/${product.urlImage}`}
            loader={() => `${IMAGE_BASE_URL}/${product.urlImage}`}
          />
          <Card.Body>
            <Card.Title>
              <Link href={`/products/${product.id}`}>
                {product.productName}
              </Link>{" "}
            </Card.Title>
            <Card.Text>{product.price}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Product;
