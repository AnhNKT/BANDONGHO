// src/pages/AllProducts.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";
import "./AllProducts.css";

const AllProducts: React.FC = () => {
  const { brand } = useParams<{ brand: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        if (!brand) throw new Error("Thiếu thương hiệu");

        const res = await fetch(`http://127.0.0.1:5000/api/products/brand/${brand.toLowerCase()}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Lỗi server");
        }

        const data: Product[] = await res.json();
        if (!data || data.length === 0) {
          setError(`Không tìm thấy sản phẩm cho thương hiệu "${brand}"`);
          setProducts([]);
        } else {
          setProducts(data);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Lỗi server");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand]);

  if (loading)
    return (
      <div className="container-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    );

  if (error)
    return (
      <div className="container-center text-danger">
        <h5>{error}</h5>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          ⬅ Quay lại
        </button>
      </div>
    );

  return (
    <div className="all-products container">
      <h2 className="page-title">Sản phẩm đồng hồ {brand}</h2>
      {products.length === 0 ? (
        <p className="text-center mt-4">Không có sản phẩm nào.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
