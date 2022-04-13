import { useAppDispatch } from "app/hooks";
import { setUpdateProduct } from "app/reducer/productSlice";
import ModalUpdate from "components/modalUpdate";
import { IMAGE_BASE_URL } from "constant/url";
import { Product } from "interface";
import { getIdProducts, getOneProduct } from "lib/product";
import Image from "next/image";
import React from "react";
import { Button } from "react-bootstrap";

interface IProps {
  product: Product;
}

const Product = ({ product }: IProps) => {
  const dispatch = useAppDispatch();

  const handleClickEdit = () => {
    dispatch(setUpdateProduct(product));
  };

  return (
    <>
      <div className="mt-4">
        <div className="d-flex ">
          <Image
            objectFit="cover"
            width={500}
            height={500}
            src={`${IMAGE_BASE_URL}/${product.urlImage}`}
            loader={() => `${IMAGE_BASE_URL}/${product.urlImage}`}
          />
          <div className="p-4 " style={{ flex: 1 }}>
            <div className="d-flex justify-content-between">
              <h3>{product.productName}</h3>
              <Button
                onClick={handleClickEdit}
                variant="warning"
                size="sm"
                className="text-white"
              >
                Edit product
              </Button>
            </div>
            <p>
              <strong>Price : </strong>
              {product.price}
            </p>
            <p>
              <strong>Created at : </strong>
              {product.createDate}
            </p>
            <p>
              <strong>Updated at : </strong>
              {product.updateDate}
            </p>
          </div>
        </div>
      </div>
      <ModalUpdate />
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = await getIdProducts();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const product = await getOneProduct(params.id);
  return {
    props: {
      product,
    },
  };
};

export default Product;
