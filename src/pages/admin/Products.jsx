import * as React from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context";
import "./products.scss";

const Product = (product) => {
  return (
    <>
      <tr>
        <td>{product.id}</td>
        <td>
          <img src={product.image} alt={product.name} width="60px" />
        </td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.discount}</td>
        <td>{product.rating}</td>
        <td>{product.category}</td>
        <td>{product.available_size}</td>
        <td>{product.available_color}</td>
        <td>{product.description}</td>
      </tr>
    </>
  );
};

const Products = () => {
  const { products } = React.useContext(ProductsContext);
  return (
    <div className="container py-3">
      <div className="d-flex align-items-center mb-3">
        <h3>Products</h3>
        <Link to="/admin/product/add" className="ms-auto btn btn-primary">
          + Add Product
        </Link>
      </div>
      <div className="products-table">
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Size</th>
              <th>Color</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
