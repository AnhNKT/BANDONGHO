import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByBrand } from "../api/products";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

const AllProducts: React.FC = () => {
  const { brand } = useParams<{ brand: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!brand) return;

    const fetchProducts = async () => {
      setLoading(true);

      // Chuẩn hóa brand làm collection name
      const collectionName = brand.toLowerCase();
      const data = await getProductsByBrand(collectionName);

      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [brand]);

  if (loading) return <h3 className="text-center mt-5">Đang tải sản phẩm...</h3>;

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">
        Sản phẩm hãng <span className="text-primary">{brand?.toUpperCase()}</span>
      </h2>

      {products.length === 0 ? (
        <h4 className="text-center">Không có sản phẩm nào!</h4>
      ) : (
        <div className="row g-4">
          {products.map((item) => (
            <div className="col-md-3" key={item._id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
