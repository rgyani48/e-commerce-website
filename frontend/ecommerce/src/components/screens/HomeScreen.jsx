import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Product.jsx";
import { listProducts } from "../../actions/productsActions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Message from "../Message.jsx";
import Loader from "../Loader.jsx";

function HomeScreen() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const productsList = useSelector((state) => state.productsList);

  const { error, loading } = productsList;

const products = Array.isArray(productsList.products)
  ? productsList.products
  : [];

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.productname?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText)
    );
  });

  return (
    <Container>
      <br />

      <h1>Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* Products */}
          <Row>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Col
                  key={product.id || product._id || index}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="mb-4"
                >
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <Col>
                <div className="text-center py-5">
                  <h4>No products found</h4>
                  <p className="text-muted">
                    Try searching with another product name or brand.
                  </p>
                </div>
              </Col>
            )}
          </Row>
        </>
      )}
    </Container>
  );
}

export default HomeScreen;
