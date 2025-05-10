import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';  // ✅ added import
import './ProductInfo.css';

function ProductInfo() {
  const { state } = useLocation();

  if (!state) {
    return <h4 className="text-center mt-5">No product selected!</h4>;
  }

  const { image, title, desc, price, categoryName, discount, productId } = state;
  console.log("Received Product ID:", productId); // Debug log

  const handleOrder = () => {
    alert(`Order placed for: ${title}`);
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: productId,
        image: image,
        name: title,
        price: price,
        quantity: 1,
        desc: desc
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    let storedProductIds = JSON.parse(localStorage.getItem("productIds")) || [];
    if (!storedProductIds.includes(productId)) {
      storedProductIds.push(productId);
    }
    localStorage.setItem("productIds", JSON.stringify(storedProductIds));

    console.log("Cart items:", cartItems);
    console.log("Stored product IDs:", storedProductIds);

    // ✅ replaced alert with Swal.fire
    Swal.fire({
      title: 'Success!',
      text: `Product "${title}" added to cart successfully!`,
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
            <Button variant="primary" onClick={handleAddToCart} className='add-cart-button mt-2'>
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