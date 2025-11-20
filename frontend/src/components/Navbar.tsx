import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        window.scrollY > 30
          ? navbar.classList.add("navbar-scrolled")
          : navbar.classList.remove("navbar-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Danh sách hãng + key để dẫn tới collection
  const brands = [
    { name: "Rolex", key: "rolex" },
    { name: "Casio", key: "casio" },
    { name: "Seiko", key: "seiko" },
    { name: "Omega", key: "omega" },
    { name: "Patek Philippe", key: "patekphilippe" },
    { name: "Audemars", key: "audemars" },
    { name: "Tag Heuer", key: "tagheuer" },
    { name: "Citizen", key: "citizen" },
    { name: "Tissot", key: "tissot" },
    { name: "Longines", key: "longines" },
  ];

  const handleBrandClick = (brandKey: string) => {
    navigate(`/products/${brandKey}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid d-flex align-items-center justify-content-between">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/t.a.png"
            alt="Logo"
            height={70}
            className="d-inline-block align-text-top me-2"
          />
          <span className="fw-bold text-dark fs-5">T.AWatch</span>
        </Link>

        {/* MENU CHÍNH */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">

            <li className="nav-item mx-2">
              <a className="nav-link active" href="#">
                Xu hướng 2025
              </a>
            </li>

            {/* MENU HÃNG ĐỒNG HỒ */}
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="watchDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Đồng hồ
              </a>
              <ul className="dropdown-menu" aria-labelledby="watchDropdown">
                {brands.map((b) => (
                  <li key={b.key}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleBrandClick(b.key)}
                    >
                      Đồng hồ {b.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link" href="#">Nam</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">Nữ</a>
            </li>

            {/* PHỤ KIỆN */}
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="accessoryDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Phụ kiện
              </a>
              <ul className="dropdown-menu" aria-labelledby="accessoryDropdown">
                <li><a className="dropdown-item" href="#">Dây đồng hồ</a></li>
                <li><a className="dropdown-item" href="#">Loa Bluetooth</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Tai nghe</a></li>
              </ul>
            </li>

          </ul>
        </div>

        {/* TÌM KIẾM + GIỎ HÀNG */}
        <div className="d-flex align-items-center gap-3">
          <form className="d-flex search-form" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Tìm sản phẩm..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success ms-2" type="submit">
              <FaSearch />
            </button>
          </form>

          <Link to="/cart" className="btn btn-outline-primary position-relative cart-btn">
            <FaShoppingCart />
            {totalQuantity > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
