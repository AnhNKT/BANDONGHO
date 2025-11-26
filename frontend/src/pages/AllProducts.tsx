import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";

const AllProducts: React.FC = () => {
  const { brand } = useParams<{ brand: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!brand) return;

    const fetchBrandProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://127.0.0.1:5000/api/products/brand/${brand.toLowerCase()}`);
        if (!res.ok) throw new Error("Không lấy được sản phẩm của thương hiệu này");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandProducts();
  }, [brand]);

  if (loading) return <div className="container mt-5 pt-4">Đang tải...</div>;
  if (error) return <div className="container mt-5 pt-4 text-danger">{error}</div>;
  if (products.length === 0)
    return <div className="container mt-5 pt-4">Không có sản phẩm của thương hiệu {brand}</div>;

  return (
    <div className="container mt-5 pt-4">
      <h2>Sản phẩm thương hiệu {brand}</h2>
      <div className="row mt-4">
        {products.map((product) => (
          <div key={product._id} className="col-md-3 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
