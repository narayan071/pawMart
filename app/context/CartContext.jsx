import React, { createContext, useContext, useReducer } from 'react';
const initialState = {
  items: [],
};
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + 1,
        };
        return { items: updatedItems };
      } else {
        return { items: [...state.items, { ...action.payload, quantity: 1 }] };
      }

    case REMOVE_ITEM:
      return {
        items: state.items
          .map(item => 
            item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter(item => item.quantity > 0),
      };

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
