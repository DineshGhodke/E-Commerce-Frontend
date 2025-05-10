import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cart);
  }, []);

  const updateProductIdsStorage = (updatedCart) => {
    const productIds = updatedCart.map((item) => item.productId || item.id);
    localStorage.setItem("productIds", JSON.stringify(productIds));
  };

  const handleRemove = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId && item.id !== productId
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    updateProductIdsStorage(updatedCart);
  };

  const handleCheckout = () => {
    if (!isLoggedIn || !user) {
      alert("Please log in to checkout.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    navigate("/payment", {
      state: {
        userId: user.userId,
        cartItems: cartItems,
        totalAmount: totalAmount,
      },
    });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="container mt-4">
      <h3>My Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId || item.id}>
                  <td>
                    <img
                      src={
                        item.image && item.image !== ""
                          ? item.image
                          : "https://via.placeholder.com/100"
                      }
                      alt={item.name || item.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{item.name || item.title}</td>
                  <td>{item.desc || "No description available"}</td>
                  <td>{item.quantity || 1}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleRemove(item.productId || item.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end align-items-center">
            <h5 className="mr-3">Total Price: ₹ {total}/-</h5>
            <button className="btn btn-success" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
