import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const userId = parseInt(localStorage.getItem("id"), 10);

//   useEffect(() => {
//     if (userId) {
//       fetchCart();
//     } else {
//       console.error("User ID not found in localStorage");
//     }
//   }, []);

//   const fetchCart = async () => {
//     try {
//       if (!userId) {
//         console.error("Cannot fetch cart: User ID is missing");
//         return;
//       }
//       const res = await axios.get(`http://localhost:8081/cart/view/${userId}`);
//       setCartItems(res.data);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   const addToCart = async ({ productId, quantity }) => {
//     try {
//       if (!userId) {
//         throw new Error("User ID is missing. Cannot add to cart.");
//       }
//       await axios.post(`http://localhost:8081/cart/addcart`, {
//         userId,
//         productId,
//         quantity,
//       });
//       await fetchCart();
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       throw err; // Rethrow so the caller (e.g., ProductInfo) can handle it
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     try {
//       if (!userId) {
//         throw new Error("User ID is missing. Cannot remove item from cart.");
//       }
//       await axios.delete(`http://localhost:8081/cart/deleteItem/${itemId}`);
//       await fetchCart();
//     } catch (err) {
//       console.error("Error removing item:", err);
//     }
//   };

//   const clearCart = async () => {
//     try {
//       if (!userId) {
//         throw new Error("User ID is missing. Cannot clear cart.");
//       }
//       await axios.delete(`http://localhost:8081/cart/clear/${userId}`);
//       await fetchCart();
//     } catch (err) {
//       console.error("Error clearing cart:", err);
//     }
//   };

//   const updateQuantity = async (itemId, quantity) => {
//     try {
//       if (!userId) {
//         throw new Error("User ID is missing. Cannot update quantity.");
//       }
//       await axios.put(`http://localhost:8081/cart/update/${itemId}`, {
//         quantity,
//       });
//       await fetchCart();
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         updateQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };