import API_BASE_URL from "../config/api";

// Add a new property
export const addProperty = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/properties/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to add property");
  }

  return res.json(); // returns the added property object
};

// Fetch all properties from backend
export const fetchProperties = async () => {
  const res = await fetch(`${API_BASE_URL}/properties`);
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to fetch properties");
  }
  return res.json(); // returns array of property objects
};
