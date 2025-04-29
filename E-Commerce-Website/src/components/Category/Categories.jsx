import React from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

// Direct category data with categoryId
const categoryData = [
  { image: "/Categoryphoto/fashan.png", name: "Fashion", id: 1 },
  { image: "/Categoryphoto/apple-iphone-14-pro-max-1 - Copy.jpg", name: "Phone", id: 2 },
  { image: "/Categoryphoto/laptop1.jpeg", name: "Laptop", id: 3 },
  { image: "/Categoryphoto/food.jpeg", name: "Food", id: 4 },
  { image: "/Categoryphoto/beuty.jpeg", name: "Beauty & Toys", id: 5 },
  { image: "/Categoryphoto/Gorcey.webp", name: "Grocery", id: 6 },
  { image: "/Categoryphoto/book.jpeg", name: "Books", id: 7 },
];

// Categories component
const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="categories-container">
      <div className="categories-scroll">
        {categoryData.map((item, index) => (
          <div key={index} className="category-item">
            <div
              className="category-circle"
              onClick={() => navigate(`/category/${item.id}`)} // Now using categoryId
            >
              <img src={item.image} alt={item.name} className="category-image" />
            </div>
            <h1 className="category-name">{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
