import * as React from "react";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { ProductsContext } from "../context";

import "./products.scss";

const Products = () => {
  const { products } = React.useContext(ProductsContext);

  return (
    <Layout>
      <div className="container">
        <section>
          {products.length > 0 ? (
            <>
              <div className="section-title">
                <h5>Shirt</h5>
                <span />
              </div>
              <div className="row">
                {products?.filter(p=>p.category.toLowerCase()==='shirt').map((product) => (
                  <div
                    className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                    key={product.id}
                  >
                    <Card product={product} path={`/product/${product.id}`} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h5 className="py-5">Loading...</h5>
          )}
        </section>

        <section>
          {products.length > 0 ? (
            <>
              <div className="section-title">
                <h5>Pant</h5>
                <span />
              </div>
              <div className="row">
                {products?.filter(p=>p.category.toLowerCase()==='pant').map((product) => (
                  <div
                    className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                    key={product.id}
                  >
                    <Card product={product} path={`/product/${product.id}`} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h5 className="py-5">Loading...</h5>
          )}
        </section>
      </div>
    </Layout>
  );
};
export default Products;
