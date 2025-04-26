import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './CategoryBar.css'; // Optional custom CSS

const categories = [
  { name: 'Kilos', image: '/images/kilos.png' },
  { name: 'Mobiles', image: '/images/mobiles.png' },
  { name: 'Fashion', image: '/images/fashion.png' },
  { name: 'Electronics', image: '/images/electronics.png' },
  { name: 'Home & Furniture', image: '/images/furniture.png' },
  { name: 'Appliances', image: '/images/appliances.png' },
  { name: 'Flight Bookings', image: '/images/flight.png' },
  { name: 'Beauty, Toys & More', image: '/images/beauty.png' },
  { name: 'Two Wheelers', image: '/images/bike.png' }
];

export default function CategoryBar() {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate(`/category/${name}`);
  };

  return (
    <div className="d-flex justify-content-around flex-wrap my-4">
      {categories.map((cat, index) => (
        <div key={index} className="text-center mx-3 category-item" onClick={() => handleCategoryClick(cat.name)}>
          <img src={cat.image} alt={cat.name} width="60" height="60" />
          <p className="mt-2">{cat.name}</p>
        </div>
      ))}
    </div>
  );
}
