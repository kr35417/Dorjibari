import * as React from "react";
import Rating from "./Rating";
import "./card.scss";
import { Link } from "react-router-dom";

const Card = ({ product, path }) => {
  let { name, image, rating, price, discount } = product;

  return (
    <>
      <div className="card">
        <span className="discount-mark"> {discount}% </span>
        <div className="card-header">
          <img src={image} alt={name} />
        </div>
        <div className="card-body">
          <div className="card-title">
            <Link to={path}> {name}</Link>
          </div>
          <Rating rating={rating} />
          <div className="card-price">
            <span>
              {Number(price) - (Number(price) * Number(discount)) / 100}TK{" "}
              <del>
                <sub>{price}Tk</sub>
              </del>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
