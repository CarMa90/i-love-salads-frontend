const CART_ITEMS = "cartItems";

export const setCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem(CART_ITEMS, cartItems);
};

export const getCartItems = () => {
  return localStorage.getItem(CART_ITEMS);
};

export const removeCartItems = () => {
  localStorage.removeItem(CART_ITEMS);
};
