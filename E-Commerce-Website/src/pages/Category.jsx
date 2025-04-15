import React from "react";
import { useParams } from "react-router-dom";

export default function Category() {
  const { categoryName } = useParams();

  return (
    <div className="container mt-5">
      <h2>Category: {categoryName}</h2>
      <p>Products under "{categoryName}" category will be shown here.</p>
    </div>
  );
}
