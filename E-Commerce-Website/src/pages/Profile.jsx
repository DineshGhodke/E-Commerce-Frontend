import React from 'react';

function Profile() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <h2 className="text-center mt-5">Please login to view your profile.</h2>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Profile</h2>
      <div className="card p-4 shadow-sm">
        <p><strong>Name:</strong> Dinesh Ghodke</p>
        <p><strong>Email:</strong> dinesh@example.com</p>
        <p><strong>Role:</strong> User</p>
      </div>
    </div>
  );
}

export default Profile;
