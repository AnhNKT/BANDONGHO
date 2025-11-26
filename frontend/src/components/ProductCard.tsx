import React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import "./ProductCard.css";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const productUrl = product.brand
    ? `/products/${product.brand.toLowerCase()}/${product._id}`
    : `/product/${product._id}`;

  return (
    <div
      className="product-card"
      onClick={() => navigate(productUrl)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={product.image || "/images/default-product.png"}
        alt={product.name}
        className="product-image"
        onError={(e: any) => (e.target.src = "/images/default-product.png")}
      />
      <div className="product-info">
        <h5 className="product-name">{product.name}</h5>
        {product.brand && <p className="brand">{product.brand}</p>}
        {product.price !== undefined && (
          <p className="price">{product.price.toLocaleString()} ₫</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
