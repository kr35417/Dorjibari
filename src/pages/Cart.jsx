import * as React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import Layout from "../components/Layout";
import { CartContext } from "../context";
const Cart = () => {
  const { cart } = React.useContext(CartContext);
  return (
    <Layout>
      <div className="container">
        <div className="row my-5">
          <div className="col-8">
            <div className="carts">
              <h4 className="mb-2">Carts</h4>
              <hr />
              {cart ? (
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Size</th>
                      <th>Color</th>
                      <th>Discount</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((c) => {
                      return (
                        <CartItem
                          key={c.id}
                          title={c.name}
                          image={c.image}
                          price={c.price}
                          discount={c.discount}
                          qnt={c.quantity}
                          color={c.color}
                          sz={c.size}
                        />
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h4>No item in cart</h4>
              )}
            </div>
          </div>
          <div className="col-4">
            <div className="cart-summary" style={{ width: "250px" }}>
              <h4 className="mb-2">Cart Summary</h4>
              <hr />
              <div className="cart-summary-item d-flex align-items-center justify-content-between">
                <h6>Subtotal</h6>
                <h6>
                  <span>
                    {cart
                      ? cart.reduce((a, c) => a + c.price * c.quantity, 0)
                      : 0}{" "}
                    TK
                  </span>
                </h6>
              </div>
              <div className="cart-summary-item d-flex align-items-center justify-content-between">
                <h5>Total: </h5>
                <h5>
                  <span>
                    {cart
                      ? cart.reduce((a, c) => a + c.price * c.quantity, 0)
                      : 0}{" "}
                    TK
                  </span>
                </h5>
              </div>
              <Link to="/body-size" className="btn btn-primary col-12 mt-3">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
