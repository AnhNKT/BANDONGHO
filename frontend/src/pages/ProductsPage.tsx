// src/pages/ProductsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import "./ProductsPage.css";

const ProductsPage: React.FC = () => {
  const { brand } = useParams<{ brand: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!brand) return;

    const fetchProductsByBrand = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/products/brand/${brand}`);
        if (!res.ok) throw new Error("Lỗi server");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByBrand();
  }, [brand]);

  if (loading) return <div className="container-center mt-5">Đang tải sản phẩm...</div>;
  if (error) return (
    <div className="container-center mt-5 text-danger">
      {error}
      <br />
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        ⬅ Quay lại
      </button>
    </div>
  );

  return (
    <div className="products-page container mt-5">
      <h2 className="text-center mb-4">Sản phẩm hãng: {brand}</h2>
      {products.length === 0 ? (
        <p className="text-center">Không có sản phẩm nào.</p>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
