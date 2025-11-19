import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="container mt-5 pt-5">
        <h3>Giỏ hàng trống</h3>
      </div>
    );

  return (
    <div className="cart-page container mt-5 pt-4">
      <h2 className="mb-4 text-center">Giỏ hàng</h2>

      <div className="cart-header row fw-bold py-2 border-bottom">
        <div className="col-md-3 text-center">Hình ảnh</div>
        <div className="col-md-4">Thông tin sản phẩm</div>
        <div className="col-md-2 text-center">Giá</div>
        <div className="col-md-2 text-center">Số lượng</div>
        <div className="col-md-1 text-center">Xóa</div>
      </div>

      {cart.map(product => (
        <div key={product._id} className="cart-item row align-items-center py-3 border-bottom">
          {/* IMAGE */}
          <div className="col-md-3 text-center">
            <img src={product.image} alt={product.name} className="cart-img" />
          </div>

          {/* INFO */}
          <div className="col-md-4">
            <h5>{product.name}</h5>
            <p className="text-muted">{product.brand}</p>
            <small>{product.description}</small>
          </div>

          {/* PRICE */}
          <div className="col-md-2 text-center fw-bold text-primary">
            {product.price.toLocaleString()} ₫
          </div>

          {/* QUANTITY */}
          <div className="col-md-2 text-center">
            <input
              type="number"
              min={1}
              max={product.stock}
              value={product.quantity}
              onChange={e => updateQuantity(product._id, Number(e.target.value))}
              className="form-control text-center"
            />
          </div>

          {/* DELETE BTN */}
          <div className="col-md-1 text-center">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFromCart(product._id)}
            >
              X
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL & BUTTONS */}
      <div className="mt-4 text-end">
        <h4 className="fw-bold mb-3">
          Tổng tiền: <span className="text-success">{totalPrice.toLocaleString()} ₫</span>
        </h4>

        <button className="btn btn-danger me-3" onClick={clearCart}>
          Xóa toàn bộ
        </button>

        <button
          className="btn btn-success"
          onClick={() => navigate("/checkout")}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
