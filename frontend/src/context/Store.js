import React, { createContext, useReducer } from "react";

const initialState = {
  cart: { cartItems: JSON.parse(localStorage.getItem('cart') || '[]') },
  user: JSON.parse(localStorage.getItem('user') || 'null')
};

export const Store = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const exist = state.cart.cartItems.find(x => x.product === item.product);
      const cartItems = exist
        ? state.cart.cartItems.map(x => x.product === exist.product ? item : x)
        : [...state.cart.cartItems, item];
      localStorage.setItem('cart', JSON.stringify(cartItems));
      return { ...state, cart: { cartItems } };
    }
    case 'REMOVE_FROM_CART': {
      const cartItems = state.cart.cartItems.filter(x => x.product !== action.payload);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      return { ...state, cart: { cartItems } };
    }
    case 'CLEAR_CART': {
      localStorage.removeItem('cart');
      return { ...state, cart: { cartItems: [] } };
    }
    case 'SET_USER': {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      return { ...state, user: null, cart: { cartItems: [] } };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}
