// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ElectronicsProductCard = () => {
//   const [electronicProducts, setElectronicProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Replace with your API endpoint or data source URL
//     fetch('https://your-api-url.com/electronics-products') 
//       .then((response) => response.json())
//       .then((data) => setElectronicProducts(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-4">Top Electronics</h4>
//       <div className="row">
//         {electronicProducts.map((item) => (
//           <div key={item.id} className="col-12 col-sm-6 col-md-3 mb-4">
//             <div className="card h-100">
//               <img
//                 onClick={() => navigate("/productInfo", { state: item })} // ✅ passing full item to ProductInfo
//                 src={item.image}
//                 alt={item.title}
//                 className="card-img-top img-fluid"
//                 style={{ height: "200px", objectFit: "contain", cursor: "pointer" }}
//               />
//               <div className="card-body">
//                 <h6 className="card-title text-truncate">{item.title}</h6>
//                 <p className="card-text fw-bold">₹ {item.price}</p>
//               </div>
//               <div className="card-footer">
//                 <button className="btn btn-primary btn-sm w-100">Add to Cart</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ElectronicsProductCard;
