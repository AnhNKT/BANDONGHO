import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/api";
import type { Product } from "../types";
import "./Home.css";

const Home: React.FC = () => {
  const location = useLocation(); // 👉 Phải nằm bên trong component
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.scrollToTrend) {
      const section = document.getElementById("trend-2025");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();

        const standardized: Product[] = data.map((p: any) => ({
          _id: p._id,
          name: p.name,
          description: p.description ?? "",
          price: p.price ?? 0,
          brand: p.brand ?? "",
          image: p.image ?? "/images/default.png",
          stock: p.stock ?? 0,
        }));

        setProducts(standardized);
      } catch (err) {
        console.error(err);
        setError("Không thể tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      {/* Carousel */}
      <div
        id="carouselExampleControls"
        className="carousel slide mt-3"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {[ 
            { src: "/images/84_1655262592.png", alt: "Banner 1" },
            { src: "/images/hinh-nen-dong-ho-cho-may-tinh-dep_113844621.jpg", alt: "Banner 2" },
            { src: "/images/10-thuong-hieu-dong-ho-cao-cap.jpg", alt: "Banner 3" }
          ].map((banner, idx) => (
            <div key={banner.src} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
              <img src={banner.src} className="d-block w-100" alt={banner.alt} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Product Grid */}
      <h1 className="section-title mt-4" id="trend-2025">Xu hướng năm 2025</h1>
      {loading && <p>Đang tải sản phẩm...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && products.length === 0 && <p>Không có sản phẩm nào.</p>}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
