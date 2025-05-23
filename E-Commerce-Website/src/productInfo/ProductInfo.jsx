import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './ProductInfo.css';

function ProductInfo() {
  const { state } = useLocation();
  const { updateCartCount } = useContext(CartContext);

  if (!state) {
    return <h4 className="text-center mt-5">No product selected!</h4>;
  }

  const { image, title, desc, price, categoryName, discount, productId } = state;

  const handleOrder = () => {
    Swal.fire({
      title: 'Order Placed!',
      text: `Order placed for: ${title}`,
      icon: 'info',
      confirmButtonText: 'OK',
    });
  };

  const handleAddToCart = async () => {
    // ✅ 1. Local cart logic (works even without login)
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: productId,
        image,
        name: title,
        price,
        quantity: 1,
        desc
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Maintain product ID list
    let storedProductIds = JSON.parse(localStorage.getItem("productIds")) || [];
    if (!storedProductIds.includes(productId)) {
      storedProductIds.push(productId);
    }
    localStorage.setItem("productIds", JSON.stringify(storedProductIds));

    updateCartCount(); // 🔄 Update cart icon

    // ✅ 2. Backend cart logic (only if logged in)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
      try {
        await axios.post("http://localhost:8081/cart/addcart", {
          userId: user.userId,
          productId: productId,
          quantity: 1
        });
        console.log("✅ Cart saved to backend");
      } catch (error) {
        console.error("❌ Backend cart save failed:", error);
        // Optional: Silent fail
      }
    } else {
      console.log("ℹ️ Not logged in - skipping backend cart save");
    }

    // ✅ 3. Success alert (always shown)
    Swal.fire({
      title: 'Added to Cart!',
      text: `Product "${title}" added to cart.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <Container className="product-info-container">
      <Row>
        <Col md={5} className="text-center">
          <Card className="product-image-card">
            <img src={image} alt={title} className="img-fluid product-img" />
          </Card>
        </Col>

        <Col md={7}>
          <h4>{title}</h4>
          <h5 className="text-success">
            ₹ {price} &nbsp;
            {discount && (
              <>
                <span className="strike-price">
                  ₹{parseInt(price * (1 + discount / 100))}
                </span>
                <span className="discount"> &nbsp; {discount}% off</span>
              </>
            )}
          </h5>
          <p className="badge bg-light text-dark mt-2">Free Delivery</p>
          <p><strong>Category:</strong> {categoryName}</p>
          <p><strong>Description:</strong> {desc}</p>

          <div className="button-tow">
            <Button variant="primary" onClick={handleAddToCart} className="add-cart-button mt-2">
              🛒 Add to Cart
            </Button>
            <Button variant="primary" onClick={handleOrder}>
              » Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductInfo;






// import React, { useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Container, Button, Row, Col, Card } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import './ProductInfo.css';
// import { CartContext } from '../context/CartContext';

// function ProductInfo() {
//   const { state } = useLocation();
//   const { addToCart } = useContext(CartContext);

//   if (!state) {
//     return <h4 className="text-center mt-5">No product selected!</h4>;
//   }

//   const { image, title, desc, price, categoryName, discount, productId } = state;

//   const handleOrder = () => {
//     alert(`Order placed for: ${title}`);
//   };

//   const handleAddToCart = async () => {
//     try {
//       const userId = parseInt(localStorage.getItem("id"), 10);

//       if (!userId) {
//         Swal.fire({
//           title: 'Error!',
//           text: 'User not logged in. Please log in to add items to the cart.',
//           icon: 'error',
//           confirmButtonText: 'OK',
//         });
//         return;
//       }

//       await addToCart({
//         userId: userId,
//         productId: productId,
//         quantity: 1,
//       });

//       Swal.fire({
//         title: 'Success!',
//         text: `Product "${title}" added to cart successfully!`,
//         icon: 'success',
//         confirmButtonText: 'OK',
//       });
//     } catch (err) {
//       console.error('Error adding to cart:', err);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Something went wrong while adding to cart.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     }
//   };

//   return (
//     <Container className="product-info-container">
//       <Row>
//         <Col md={5} className="text-center">
//           <Card className="product-image-card">
//             <img src={image} alt={title} className="img-fluid product-img" />
//           </Card>
//         </Col>
//         <Col md={7}>
//           <h4>{title}</h4>
//           <h5 className="text-success">
//             ₹ {price} &nbsp;
//             {discount && (
//               <>
//                 <span className="strike-price">₹{parseInt(price * (1 + discount / 100), 10)}</span>
//                 <span className="discount"> &nbsp; {discount}% off</span>
//               </>
//             )}
//           </h5>
//           <p className="badge bg-light text-dark mt-2">Free Delivery</p>
//           <p><strong>Category:</strong> {categoryName}</p>
//           <p><strong>Description:</strong> {desc}</p>
//           <div className="button-tow">
//             <Button variant="primary" onClick={handleAddToCart} className="add-cart-button mt-2">
//               🛒 Add to Cart
//             </Button>
//             <Button variant="primary" onClick={handleOrder}>
//               » Buy Now
//             </Button>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ProductInfo;