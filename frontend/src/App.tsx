import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import AllProducts from "./pages/AllProducts";


const App: React.FC = () => {
  const location = useLocation();

  const shouldHideNavbar =
    location.pathname === "/login" || location.pathname.startsWith("/admin");

  return (
    <div className="app-container">
      {!shouldHideNavbar && <Navbar />}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<Admin />} />
          <Route path="/admin/orders" element={<Admin />} />
          {/* Trang sản phẩm theo hãng */}
          <Route path="/products/:brand" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
