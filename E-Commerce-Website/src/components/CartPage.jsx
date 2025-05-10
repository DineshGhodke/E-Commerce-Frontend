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


// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";

// const CartPage = () => {
//   const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const navigate = useNavigate();

//   const updateProductIdsStorage = (updatedCart) => {
//     const productIds = updatedCart.map((item) => item.id);
//     localStorage.setItem("productIds", JSON.stringify(productIds));
//   };

//   const handleRemove = (itemId) => {
//     removeFromCart(itemId);
//     const updatedCart = cartItems.filter((item) => item.id !== itemId);
//     updateProductIdsStorage(updatedCart);
//   };

//   const handleQuantityChange = (itemId, currentQty, delta) => {
//     const newQty = currentQty + delta;
//     if (newQty >= 1) {
//       updateQuantity(itemId, newQty);
//     }
//   };

//   const handleCheckout = () => {
//     if (!isLoggedIn || !user) {
//       alert("Please log in to checkout.");
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     const totalAmount = cartItems.reduce(
//       (sum, item) => sum + item.price * (item.quantity || 1),
//       0
//     );

//     navigate("/payment", {
//       state: {
//         userId: user.userId,
//         cartItems,
//         totalAmount,
//       },
//     });
//   };

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * (item.quantity || 1),
//     0
//   );

//   return (
//     <div className="container mt-4">
//       <h3>My Cart</h3>
//       {cartItems.length === 0 ? (
//         <p>Your cart is currently empty.</p>
//       ) : (
//         <>
//           <table className="table table-striped">
//             <thead className="thead-dark">
//               <tr>
//                 <th>Product</th>
//                 <th>Name</th>
//                 <th>Description</th>
//                 <th>Quantity</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id}>
//                   <td>
//                     <img
//                       src={item.image || "https://via.placeholder.com/100"}
//                       alt={item.name || "No Name"}
//                       style={{ width: "80px", height: "80px", objectFit: "cover" }}
//                     />
//                   </td>
//                   <td>{item.name || "No Name"}</td>
//                   <td>{item.desc || "No description available"}</td>
//                   <td>
//                     <div className="d-flex align-items-center">
//                       <button
//                         className="btn btn-sm btn-outline-secondary me-1"
//                         onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
//                       >
//                         −
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         className="btn btn-sm btn-outline-secondary ms-1"
//                         onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td>
//                     <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="d-flex justify-content-between align-items-center">
//             <button className="btn btn-outline-danger" onClick={() => {
//               clearCart();
//               updateProductIdsStorage([]);
//             }}>
//               Clear Cart
//             </button>
//             <div className="d-flex align-items-center">
//               <h5 className="me-3">Total: ₹{total}</h5>
//               <button className="btn btn-primary" onClick={handleCheckout}>
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;
