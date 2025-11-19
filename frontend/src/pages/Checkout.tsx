import React from "react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Đặt hàng thành công!");

    clearCart();
  };

  return (
    <div className="checkout-container container mt-4">
      <h2 className="mb-4 fw-bold text-center">Thanh toán</h2>

      <div className="row">

        {/* ===== FORM NHẬP THÔNG TIN ===== */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="checkout-form p-4 shadow rounded">

            <h4 className="mb-3">Thông tin khách hàng</h4>

            <div className="mb-3">
              <label className="form-label">Họ và tên</label>
              <input type="text" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input type="text" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Địa chỉ giao hàng</label>
              <textarea className="form-control" rows={3} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Đặt hàng
            </button>

          </form>
        </div>

        {/* ===== DANH SÁCH SẢN PHẨM ===== */}
        <div className="col-md-6">
          <div className="checkout-summary p-4 shadow rounded">

            <h4 className="mb-3">Đơn hàng của bạn</h4>

            {cart.map((item) => (
              <div key={item._id} className="d-flex justify-content-between py-2 border-bottom">
                <span>{item.name} x {item.quantity}</span>
                <span className="fw-bold text-danger">{(item.price * item.quantity).toLocaleString()} ₫</span>
              </div>
            ))}

            <h4 className="mt-3 text-end">
              Tổng tiền: <span className="text-danger">{totalPrice.toLocaleString()} ₫</span>
            </h4>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
