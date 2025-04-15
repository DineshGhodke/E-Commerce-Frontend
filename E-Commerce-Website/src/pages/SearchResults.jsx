import React from "react";
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const query = new URLSearchParams(useLocation().search);
  const q = query.get("q");

  return (
    <div className="container mt-5">
      <h2>Search Results for: "{q}"</h2>
      <p>Matching products will be displayed here.</p>
    </div>
  );
}
