import type { FC, ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useCart, type CartProduct } from "../context/CartContext";
import "./CartPage.css";

const CartPage: FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "info">("cart");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();
    alert(
      `Cảm ơn ${customer.name}! Đơn hàng của bạn đã được đặt.\nTổng: ${totalPrice.toLocaleString()} ₫`
    );
    clearCart();
    setCheckoutStep("cart");
  };

  if (cart.length === 0 && checkoutStep === "cart") {
    return (
      <div className="cart-container mt-5 pt-4">
        <h2>Giỏ hàng trống.</h2>
      </div>
    );
  }

  return (
    <div className="cart-container mt-5 pt-4">
      {checkoutStep === "cart" ? (
        <>
          <h2>Giỏ hàng</h2>
          <div className="cart-items">
            {cart.map((item: CartProduct) => (
              <div key={item._id} className="cart-item d-flex align-items-center mb-3">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="ms-3 flex-fill">
                  <h5>{item.name}</h5>
                  <p>Thương hiệu: {item.brand}</p>
                  <p>{item.description}</p>
                  <p>Số lượng: 
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                      className="quantity-input ms-2"
                    />
                  </p>
                  <p>Giá: {(item.price * item.quantity).toLocaleString()} ₫</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h4>Tổng: {totalPrice.toLocaleString()} ₫</h4>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-secondary" onClick={clearCart}>
              Xóa tất cả
            </button>
            <button
              className="btn btn-success"
              onClick={() => setCheckoutStep("info")}
            >
              Thanh toán
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Thông tin khách hàng</h2>
          <form onSubmit={handlePayment} className="d-flex flex-column gap-3 mt-3">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={customer.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={customer.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={customer.phone}
              onChange={handleChange}
              required
            />
            <button className="btn btn-success mt-2" type="submit">
              Hoàn tất thanh toán
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CartPage;
