import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const { cart } = useCart();

  // Tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 30) {
          navbar.classList.add("navbar-scrolled");
        } else {
          navbar.classList.remove("navbar-scrolled");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* ===== LOGO ===== */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/t.a.png"
            alt="Logo"
            height={70}
            className="d-inline-block align-text-top me-2"
          />
          <span className="fw-bold text-dark fs-5">T.AWatch</span>
        </Link>

        {/* ===== MENU GIỮA ===== */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <a className="nav-link active" aria-current="page" href="#">
                Xu hướng 2025
              </a>
            </li>

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
                {[
                  "Rolex",
                  "Casio",
                  "Seiko",
                  "Omega",
                  "Patek Philippe",
                  "Audemars",
                  "Tag Heuer",
                  "Citizen",
                  "Tissot",
                  "Longines",
                ].map((brand) => (
                  <li key={brand}>
                    <a className="dropdown-item" href="#">
                      Đồng hồ {brand}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link" href="#">
                Nam
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">
                Nữ
              </a>
            </li>

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
                <li>
                  <a className="dropdown-item" href="#">
                    Dây đồng hồ
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Loa Bluetooth
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Tai nghe
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* ===== SEARCH + CART ===== */}
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
