import React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import "./ProductCard.css";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h5>{product.name}</h5>
        <p className="brand">{product.brand}</p>
        <p className="price">{product.price.toLocaleString()} ₫</p>
      </div>
    </div>
  );
};

export default ProductCard;
