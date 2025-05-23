// import React, { useState } from "react";

// const AddAddressForm = ({ userId, onAddressAdded }) => {
//   const [fullName, setFullName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [addressLine1, setAddressLine1] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [country, setCountry] = useState("India");
//   const [isDefault, setIsDefault] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const newAddress = {
//       userId,             // Backend expects 'userId'
//       fullName,           // Backend expects 'fullName'
//       phoneNumber,        // Backend expects 'phoneNumber'
//       addressLine1,       // Backend expects 'addressLine1'
//       city,
//       state,
//       pincode,
//       country,
//       isDefault           // Backend expects 'isDefault' (tinyint)
//     };

//     try {
//       const response = await fetch("http://localhost:8081/useraddress/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newAddress)
//       });

//       if (response.ok) {
//         alert("Address added successfully!");
//         // Reset form fields
//         setFullName("");
//         setPhoneNumber("");
//         setAddressLine1("");
//         setCity("");
//         setState("");
//         setPincode("");
//         setCountry("India");
//         setIsDefault(false);
//         if (onAddressAdded) onAddressAdded(); // Callback to refresh address list
//       } else {
//         const data = await response.text();
//         setError(data || "Failed to add address");
//       }
//     } catch (error) {
//       setError("Failed to connect to the server.");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: "500px", marginTop: "20px" }}>
//       <h5>Add New Address</h5>

//       <div className="form-group">
//         <label>Full Name</label>
//         <input
//           type="text"
//           className="form-control"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Phone Number</label>
//         <input
//           type="tel"
//           pattern="[0-9]{10}"
//           maxLength={10}
//           className="form-control"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Address Line</label>
//         <input
//           type="text"
//           className="form-control"
//           value={addressLine1}
//           onChange={(e) => setAddressLine1(e.target.value)}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>City</label>
//         <input
//           type="text"
//           className="form-control"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>State</label>
//         <input
//           type="text"
//           className="form-control"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label>Pincode</label>
//         <input
//           type="text"
//           className="form-control"
//           value={pincode}
//           onChange={(e) => setPincode(e.target.value)}
//           maxLength={6}
//         />
//       </div>

//       <div className="form-group">
//         <label>Country</label>
//         <input
//           type="text"
//           className="form-control"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//         />
//       </div>

//       <div className="form-group form-check mt-2">
//         <input
//           type="checkbox"
//           className="form-check-input"
//           checked={isDefault}
//           onChange={(e) => setIsDefault(e.target.checked)}
//         />
//         <label className="form-check-label">Set as default address</label>
//       </div>

//       {error && <div className="alert alert-danger mt-2">{error}</div>}

//       <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
//         {loading ? "Adding..." : "Add Address"}
//       </button>
//     </form>
//   );
// };

// export default AddAddressForm;


import React, { useState, useEffect } from 'react';

function UserAddress() {
  const storedUser = JSON.parse(localStorage.getItem("user")); // get logged-in user
  const loggedInUserId = storedUser?.userId || ""; // extract userId safely

  const initialFormState = {
    userid: loggedInUserId,
    fullname: '',
    phoneNumber: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    country: ''
  };

  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch('http://localhost:8081/useraddress/view');
      const data = await response.json();
      // Filter only addresses of logged-in user
      const filtered = data.filter(addr => addr.userid === loggedInUserId);
      setAddresses(filtered);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:8081/useraddress/update/${editingId}`
      : 'http://localhost:8081/useraddress/add';

    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userid: loggedInUserId }),
      });

      if (response.ok) {
        fetchAddresses();
        setFormData({ ...initialFormState, userid: loggedInUserId });
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (address) => {
    if (address.userid === loggedInUserId) {
      setFormData(address);
      setEditingId(address.id);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/useraddress/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchAddresses();
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ ...initialFormState, userid: loggedInUserId });
    setEditingId(null);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Your Address Manager</h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row g-3">
          {/* UserID field is hidden or readonly */}
          <input
            type="hidden"
            name="userid"
            value={formData.userid}
          />

          <div className="col-md-6">
            <input
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <input
              name="addressLine1"
              placeholder="Address Line 1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-4">
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-4">
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-4">
            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Add'} Address
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <tr key={addr.id}>
                  <td>{addr.id}</td>
                  <td>{addr.fullname}</td>
                  <td>{addr.phoneNumber}</td>
                  <td>{addr.addressLine1}</td>
                  <td>{addr.city}</td>
                  <td>{addr.state}</td>
                  <td>{addr.pincode}</td>
                  <td>{addr.country}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(addr)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(addr.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No addresses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserAddress;

