const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// Food related API calls
export const getFoods = async () => {
  return fetchWithAuth('/foods');
};

export const createFood = async (foodData) => {
  return fetchWithAuth('/foods', {
    method: 'POST',
    body: JSON.stringify(foodData),
  });
};

// Order related API calls
export const getOrders = async () => {
  return fetchWithAuth('/orders');
};

export const createOrder = async (orderData) => {
  return fetchWithAuth('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
};

// User related API calls
export const updateUser = async (userId, userData) => {
  return fetchWithAuth(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};