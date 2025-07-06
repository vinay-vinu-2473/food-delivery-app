export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const getTotalItems = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const updateCartItem = (cartItems, itemId, newQuantity) => {
  return cartItems.map((item) =>
    item.id === itemId ? { ...item, quantity: newQuantity } : item
  );
};

export const removeCartItem = (cartItems, itemId) => {
  return cartItems.filter((item) => item.id !== itemId);
};

export const addToCart = (cartItems, newItem) => {
  const existingItem = cartItems.find((item) => item.id === newItem.id);

  if (existingItem) {
    return updateCartItem(
      cartItems,
      newItem.id,
      existingItem.quantity + 1
    );
  }

  return [...cartItems, { ...newItem, quantity: 1 }];
};