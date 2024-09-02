const API_URL = 'http://localhost:5000/api';

export const getFoods = async () => {
  const res = await fetch(`${API_URL}/getFoods`);
  const data = await res.json();
  return data;
};
export const getAllCategories = async () => 
  {
    const res = await fetch(`${API_URL}/getAllcategories`);
   const  data = await res.json()
   return data;
  }
export const createFood = async (foodData) => {
  const res = await fetch(`${API_URL}/postFood`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(foodData)
  });
  const data = await res.json();
  return data;
};

export const getCart = async () => {
  const res = await fetch(`${API_URL}/cart`);
  const data = await res.json();
  return data;
};

export const addToCart = async (foodId) => {
  const res = await fetch(`${API_URL}/addToCart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ foodId })
  });
  const data = await res.json();
  return data;
};

export const removeCartItem = async (itemId) => {
  const res = await fetch(`${API_URL}/removeCart/${itemId}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  return data;
};

export const getFoodById = async (id) => {
  const res = await fetch(`${API_URL}/foods/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch food item');
  }
  const data = await res.json();
  return data;
};
export const getSubcategoriesByCategory = async (categoryId) => {
  const res = await fetch(`${API_URL}/subcategories/${categoryId}`);
  const data = res.json()
  return data
};

