import { hideMessage, Message } from "app/reducer/messageSlice";
import { getProducts } from "app/reducer/productSlice";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { Container, Nav, Navbar, Toast } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";

function Layout({ children }) {
  const dispatch = useAppDispatch();
  const message = useAppSelector(Message);
  //
  useEffect(() => {}, [message]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Head>
        <title>Product CRUD</title>
      </Head>
      <main>
        <Container>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <span className="nav-link">
                    <Link href="/">Products</Link>
                  </span>
                  <span className="nav-link">
                    <Link href="/create">Create product</Link>
                  </span>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Toast
            onClose={() => dispatch(hideMessage({}))}
            show={message.show}
            delay={message.options.autoHideDuration}
            autohide
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1000,
            }}
          >
            <Toast.Header>
              <strong className="me-auto">{message.options.title}</strong>
            </Toast.Header>
            <Toast.Body>{message.options.message}</Toast.Body>
          </Toast>

          {children}
        </Container>
      </main>
    </>
  );
}

export default Layout;
