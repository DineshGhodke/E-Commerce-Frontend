import React from 'react';
import { useNavigate } from 'react-router-dom';

const electronicProducts = [
  {
    id: 1,
    image: "/ElectronicsImages/apple-iphone-14-pro-max-1.jpg",
    title: "Apple iPhone 14 Pro Max",
    desc: "Latest iPhone with advanced features",
    price: 150000,
    category: "Electronics"
  },
  {
    id: 2,
    image: "/ElectronicsImages/Boot HeadPhone.jpeg",
    title: "Wireless Earbuds",
    desc: "High-quality sound with long battery life",
    price: 1000,
    category: "Electronics"
  },
  {
    id: 3,
    image: "/ElectronicsImages/iphone Watch.jpeg",
    title: "Watch iPhone",
    desc: "Smartwatch with fitness tracking and notifications",
    price: 1999,
    category: "Electronics"
  },
  {
    id: 4,
    image: "/ElectronicsImages/laptop1.jpeg",
    title: "ASUS Laptop",
    desc: "High-performance laptop for multitasking",
    price: 40000,
    category: "Electronics"
  }
];

const ElectronicsProductCard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Top Electronics</h4>
      <div className="row">
        {electronicProducts.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="card h-100">
              <img
                onClick={() => navigate("/productInfo", { state: item })} // ✅ passing full item to ProductInfo
                src={item.image}
                alt={item.title}
                className="card-img-top img-fluid"
                style={{ height: "200px", objectFit: "contain", cursor: "pointer" }}
              />
              <div className="card-body">
                <h6 className="card-title text-truncate">{item.title}</h6>
                <p className="card-text fw-bold">₹ {item.price}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary btn-sm w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsProductCard;
