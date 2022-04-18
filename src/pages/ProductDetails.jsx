import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Rating from "../components/Rating";
import "./product-details.scss";
import Card from "../components/Card";
import { CartContext, ProductsContext, UserContext } from "../context";
import { app } from "../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const ProductDetails = () => {
  const { user } = React.useContext(UserContext);
  const { products } = React.useContext(ProductsContext);
  const { setCart } = React.useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [selColor, setSelColor] = React.useState("");
  const [size, setSize] = React.useState("");

  useEffect(() => {
    let product = products.find((product) => product.id === id);
    setProduct(product);
    setSize(product?.available_size[0]);
    setSelColor(product?.available_color[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // handle card
  const handleAddToCart = (pro) => {
    setCart((cart) => [...cart, { ...pro, color: selColor, size, quantity }]);
    let db = getFirestore(app);
    let cartRef = collection(db, "carts");
    addDoc(cartRef, {
      uid: user.uid,
      product: { ...pro, color: selColor, size, quantity },
    });
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="pd-image">
              {product && <img src={product?.image} alt={product.name} />}
            </div>
          </div>
          <div className="col-md-8">
            <div className="pd-details">
              <h3> {product?.name} </h3>
              <Rating rating={product?.rating} />
              <p className="mt-2">
                Category: <span> {product?.category} </span>
              </p>
              <p>
                Discount: <span> {product?.discount}% </span>
              </p>
              <h6>
                Price:
                <span className="ms-2">
                  {Number(product?.price) -
                    (Number(product?.price) * Number(product?.discount)) /
                      100}{" "}
                  Tk
                  <del className="ms-1 text-danger">
                    <sub>{Number(product?.price)} TK</sub>
                  </del>
                </span>
              </h6>
              <p>
                Size:
                <select
                  className="ms-3 _size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {product?.available_size.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </p>

              <p className="d-flex align-items-cetner">
                Color:
                {product?.available_color.map((color) => (
                  <span
                    key={color}
                    style={{ backgroundColor: color }}
                    className={`ms-2 color-sel ${
                      selColor === color ? "selected" : ""
                    }`}
                    onClick={() => setSelColor(color)}
                  />
                ))}
              </p>

              <div className="qantity">
                <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>
                  -
                </button>
                <div className="display"> {quantity} </div>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <div className="btn-grp">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <Link to="/body-size" className="btn btn-outline-primary ms-2">
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <section className="my-5">
          <table className="_table">
            <thead>
              <tr>
                <th style={{ width: "150px" }}>#</th>
                <th>Discription</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "150px" }}>Name</td>
                <td>{product?.name}</td>
              </tr>
              <tr>
                <td style={{ width: "150px" }}>Category</td>
                <td>{product?.category}</td>
              </tr>
              <tr>
                <td style={{ width: "150px" }}>Price</td>
                <td>
                  <span className="ms-2">
                    {Number(product?.price) -
                      (Number(product?.price) * Number(product?.discount)) /
                        100}
                    Tk
                    <del className="ms-1 text-danger">
                      <sub>{Number(product?.price)} TK</sub>
                    </del>
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "150px" }}>Discount</td>
                <td>{product?.discount} %</td>
              </tr>
              <tr>
                <td style={{ width: "150px" }}>Color</td>
                <td>
                  {product?.available_color.map((color) => (
                    <span
                      key={color}
                      style={{ backgroundColor: color }}
                      className="ms-1 color-sel"
                    />
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <hr />
        <section className="my-5">
          <div className="row">
            {products?.map((product) => (
              <div
                className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                key={product.id}
              >
                <Card product={product} path={`/product/${product.id}`} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetails;
