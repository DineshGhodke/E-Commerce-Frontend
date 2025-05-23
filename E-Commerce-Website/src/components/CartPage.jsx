// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(cart);
//   }, []);

//   const updateProductIdsStorage = (updatedCart) => {
//     const productIds = updatedCart.map((item) => item.productId || item.id);
//     localStorage.setItem("productIds", JSON.stringify(productIds));
//   };

//   const handleRemove = (productId) => {
//     const updatedCart = cartItems.filter(
//       (item) => item.productId !== productId && item.id !== productId
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//     updateProductIdsStorage(updatedCart);
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
//         cartItems: cartItems,
//         totalAmount: totalAmount,
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
//                 <tr key={item.productId || item.id}>
//                   <td>
//                     <img
//                       src={
//                         item.image && item.image !== ""
//                           ? item.image
//                           : "https://via.placeholder.com/100"
//                       }
//                       alt={item.name || item.title}
//                       style={{
//                         width: "80px",
//                         height: "80px",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </td>
//                   <td>{item.name || item.title}</td>
//                   <td>{item.desc || "No description available"}</td>
//                   <td>{item.quantity || 1}</td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() =>
//                         handleRemove(item.productId || item.id)
//                       }
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="d-flex justify-content-end align-items-center">
//             <h5 className="mr-3">Total Price: ₹ {total}/-</h5>
//             <button className="btn btn-success" onClick={handleCheckout}>
//               Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;


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

  const saveCartToStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    updateProductIdsStorage(updatedCart);
  };

  const handleRemove = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId && item.id !== productId
    );
    saveCartToStorage(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const handleQuantityChange = (productId, increment) => {
    const updatedCart = cartItems.map((item) => {
      if (item.productId === productId || item.id === productId) {
        const newQty = (item.quantity || 1) + increment;
        // Prevent quantity from going below 1
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    saveCartToStorage(updatedCart);
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

    navigate("/checkout", {
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
                <th>Price (₹)</th>
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
                  <td>{item.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(item.productId || item.id, -1)
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity || 1}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(item.productId || item.id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item.productId || item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Clear Cart button below the table, aligned left */}
          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <button className="btn btn-danger" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>

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

