// import React from "react";
// import { useParams } from "react-router-dom";

// export default function Category() {
//   const {categoryId } = useParams();

//   return (
//     <div className="container mt-5">
//       <h2>Category: {categoryId}</h2>
//       <p>Products under "{categoryId}" category will be shown here.</p>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Category() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/products/categories/${categoryId}`)

      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Category: {categoryId}</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="row">
          {products.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price}</p>
                  <p className="text-muted">{product.description}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}