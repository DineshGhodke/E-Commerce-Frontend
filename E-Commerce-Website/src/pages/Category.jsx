import React from "react";
import { useParams } from "react-router-dom";

export default function Category() {
  const {categoryId } = useParams();

  return (
    <div className="container mt-5">
      <h2>Category: {categoryId}</h2>
      <p>Products under "{categoryId}" category will be shown here.</p>
    </div>
  );
}
