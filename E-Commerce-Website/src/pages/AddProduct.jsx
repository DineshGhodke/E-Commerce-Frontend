// import React, { useState } from 'react';

// function AddProduct() {
//   const [product, setProduct] = useState({ name: '', price: '' });

//   const handleChange = (e) =>
//     setProduct({ ...product, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Product added (UI only)');
//   };

//   return (
//     <div className="card p-4 shadow">
//       <h3 className="mb-4">Add New Product</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Product Name</label>
//           <input type="text" className="form-control" name="name" onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Price</label>
//           <input type="number" className="form-control" name="price" onChange={handleChange} required />
//         </div>
//         <button className="btn btn-success w-100">Add Product</button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;
