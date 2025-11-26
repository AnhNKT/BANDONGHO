import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { id, brand } = useParams<{ id: string; brand?: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBrand, setLoadingBrand] = useState(false);
  const [error, setError] = useState("");

  /** ===============================
   *  LẤY SẢN PHẨM (MongoDB hoặc Brand)
   *  =============================== */
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        let data: Product | null = null;

        // 1️⃣ Thử lấy từ collection "products"
        const resProduct = await fetch(`http://127.0.0.1:5000/api/products/${id}`);
        if (resProduct.ok) data = await resProduct.json();

        // 2️⃣ Nếu không có → thử lấy từ collection brand
        if (!data && brand) {
          const resBrand = await fetch(
            `http://127.0.0.1:5000/api/products/brand/${brand}/${id}`
          );
          if (resBrand.ok) data = await resBrand.json();
        }

        if (!data) throw new Error("Không tìm thấy sản phẩm.");
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, brand]);

  /** ===============================
   *  LẤY SẢN PHẨM CÙNG THƯƠNG HIỆU
   *  =============================== */
  useEffect(() => {
    if (!product?.brand) return;

    const fetchBrandProducts = async () => {
      try {
        setLoadingBrand(true);

        const res = await fetch(
          `http://127.0.0.1:5000/api/products/brand/${product.brand.toLowerCase()}`
        );

        if (!res.ok) return;

        const data = await res.json();
        setBrandProducts(data.filter((p: Product) => p._id !== product._id));
      } finally {
        setLoadingBrand(false);
      }
    };

    fetchBrandProducts();
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert("Đã thêm vào giỏ hàng!");
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      navigate("/cart");
    }
  };

  if (loading)
    return <div className="container mt-5 pt-4">Đang tải...</div>;
  if (error)
    return <div className="container mt-5 pt-4 text-danger">{error}</div>;
  if (!product)
    return <div className="container mt-5 pt-4">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="product-detail-page container mt-5 pt-4">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={product.image || "/images/default-product.png"}
            alt={product.name}
            className="product-detail-img"
            onError={(e: any) => (e.target.src = "/images/default-product.png")}
          />
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>Thương hiệu: {product.brand}</p>
          <p>{product.description}</p>
          <h4>{product.price?.toLocaleString()} ₫</h4>

          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-outline-primary" onClick={handleAddToCart}>
              🛒 Thêm vào giỏ
            </button>
            <button className="btn btn-success" onClick={handleBuyNow}>
              💳 Mua ngay
            </button>
          </div>
        </div>
      </div>

      <div className="brand-products mt-5">
        <h3>Sản phẩm cùng thương hiệu</h3>

        {loadingBrand ? (
          <p>Đang tải...</p>
        ) : brandProducts.length === 0 ? (
          <p>Không có sản phẩm cùng thương hiệu.</p>
        ) : (
          <div className="row">
            {brandProducts.map((p) => (
              <div key={p._id} className="col-md-3 mb-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
