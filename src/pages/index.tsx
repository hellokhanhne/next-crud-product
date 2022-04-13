import { useAppSelector } from "app/hooks";
import CreateForm from "components/formCreate";
import ModalCreate from "components/modalCreate";
import Product from "components/product";
import { Row } from "react-bootstrap";

function Home() {
  const { products } = useAppSelector((state) => state.products);

  return (
    <>
      <ModalCreate />
      <div className="mt-5">
        <Row xs={1} md={3} className="g-4">
          {products.map((p, idx) => (
            <Product key={idx} product={p} />
          ))}
        </Row>
      </div>
    </>
  );
}

export default Home;
