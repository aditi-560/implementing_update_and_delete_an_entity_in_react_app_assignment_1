import React, { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [door, setDoor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const doorId = 1; // Change this to fetch a different door

  // Fetch the specific door when the component mounts
  useEffect(() => {
    const fetchDoor = async () => {
      try {
        const response = await fetch(`${API_URI}/${doorId}`);
        if (!response.ok) throw new Error("Failed to fetch door");

        const data = await response.json();
        setDoor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoor();
  }, [doorId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return <UpdateItem itemId={doorId} />;
}

export default App;
