import React, { useState, useEffect } from "react";
import './UpdateItem.css'

const API_URI =`http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ itemId }) => {
  // Step 1: Initialize state to store existing item data
  const [item, setItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 2: Fetch existing item data when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URI}/${itemId}`);
        if (!response.ok) throw new Error("Failed to fetch item");
        
        const data = await response.json();
        setItem(data);
        setUpdatedItem({ name: data.name, description: data.description }); // Pre-fill form
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  // Step 3: Handle input changes
  const handleChange = (e) => {
    setUpdatedItem({
      ...updatedItem,
      [e.target.name]: e.target.value,
    });
  };

  // Step 4: Handle form submission (Update API request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URI}/${itemId}`, {
        method: "PUT", // or PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) throw new Error("Update failed");

      const updatedData = await response.json();
      setItem(updatedData); // Update state with new data
      alert("Item updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Step 5: Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Update Item</h2>
      {item ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updatedItem.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={updatedItem.description}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>Item not found</p>
      )}
    </div>
  );
};

export default UpdateItem;
