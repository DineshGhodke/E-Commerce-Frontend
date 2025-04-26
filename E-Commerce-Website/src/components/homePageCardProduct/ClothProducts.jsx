// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ClothProductCard = () => {
//     const [products, setProducts] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Replace with your API endpoint or the data source URL
//         fetch('https://your-api-url.com/products') 
//             .then((response) => response.json())
//             .then((data) => setProducts(data))
//             .catch((error) => console.error('Error fetching data:', error));
//     }, []);

//     return (
//         <div className='mt-4'>
//             <div className='mb-4'>
//                 <h1 className='h4'>BestSelling Products</h1>
//             </div>

//             <div className='container'>
//                 <div className='row'>
//                     {products.map((item, index) => {
//                         const { image, title, price } = item;
//                         return (
//                             <div key={index} className='col-12 col-sm-6 col-md-3 mb-4'>
//                                 <div className='card h-100 shadow' style={{ minHeight: '360px' }}>
//                                     <div
//                                         style={{
//                                             height: '180px',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             overflow: 'hidden',
//                                             padding: '10px'
//                                         }}
//                                         onClick={() => navigate('/productInfo', { state: item })}
//                                     >
//                                         <img
//                                             src={image}
//                                             alt="product"
//                                             style={{ maxHeight: '100%', maxWidth: '100%', cursor: 'pointer' }}
//                                         />
//                                     </div>
//                                     <div className='card-body text-center'>
//                                         <h6 className='card-title'>{title.substring(0, 30)}...</h6>
//                                         <p className='card-text text-success fw-bold'>₹ {price}</p>
//                                     </div>
//                                     <div className='card-footer text-center'>
//                                         <button className='btn btn-primary btn-sm w-100'>Add to Cart</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ClothProductCard;
