import * as React from "react";
import "./cart-item.scss";

const CartItem = ({
  title,
  image = "https://via.placeholder.com/100",
  price,
  discount,
  color,
  sz,
  qnt,
}) => {
  const [quantity, setQuantity] = React.useState(qnt);
  return (
    <>
      <tr className="cart-item">
        <td className="ci_image">
          <img src={image} alt={title} width="60px" />
        </td>
        <td className="ci_name">{title}</td>

        <td>
          <div className="ci_quantity">
            <button
              className="btn btn-light"
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="btn btn-light"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </td>
        <td className="ci_discount">
          <span>{sz}</span>
        </td>
        <td className="ci_discount">
          <span
            style={{ background: color, display: "block", marginRight: "10px" }}
          >
            {color}
          </span>
        </td>
        <td className="ci_discount">{discount}%</td>
        <td className="ci_price">
          {(price - (price * discount) / 100) * quantity} TK
        </td>

        <td className="ci_btn">
          <button type="button" className="btn btn-danger">
            Del
          </button>
        </td>
      </tr>
    </>
  );
};
export default CartItem;
