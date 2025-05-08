// import React, { useState, useEffect } from "react";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const userId = localStorage.getItem("id") || "N/A";
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCartItems(cart);
//   }, []);

//   const handleRemove = (id) => {
//     const updatedCart = cartItems.filter((item) => item.id !== id);
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };
//   const handlePlaceOrder = () => {
//     // Logic to place the order
//     alert("Order placed successfully!"+userId );
//   }
//   const total = cartItems.reduce((sum, item) => sum + item.price, 0);

//   return (
//     <div className="container mt-4">
//       <h3>My Cart</h3>
//       {cartItems.length === 0 ? (
//         <p>Your cart is currently empty.</p>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <div key={item.id} className="card mb-3">
//               <div className="card-body d-flex justify-content-between align-items-center">
//                 <div>
//                   <h5>{item.name}</h5>
//                   <p>₹{item.price}</p>
//                 </div>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleRemove(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <h4>Total: ₹{total}</h4>
//           <button className="btn btn-success" onClick={handlePlaceOrder}>Place Order</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;
import React, { useState, useEffect } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn || !user) {
      alert("Please log in to place an order.");
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

    const orderData = {
      userId: user.userId,
      totalAmount: totalAmount,
      status: "Pending",
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity || 1,
        price: item.price,
      })),
    };

    try {
      console.log("Order Data:"+ orderData);

      const response = await fetch("http://localhost:8081/order/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response:', result);

      if (response.ok) {
        alert(result);
        localStorage.removeItem("cartItems");
        setCartItems([]);
      } else {
        setError("Failed to place order: " + result);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setError("An error occurred while placing the order.");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="container mt-4">
      <h3>My Cart</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>₹{item.price} × {item.quantity || 1}</p>
                  <p>Subtotal: ₹{item.price * (item.quantity || 1)}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h4>Total: ₹{total}</h4>
          <button className="btn btn-success" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
