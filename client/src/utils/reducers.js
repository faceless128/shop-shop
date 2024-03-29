import { useReducer } from 'react';

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of 'UPDATE_PRODUCTS', return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    // if action type value is the value of 'UPDATE_CATEGORIES', return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories]
      };
    // if the action type value is the value of 'UPDATE_CURRENT_CATEGORY', return a new state obect with an updated currentCategory value
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }
    // if action type value is the value of 'ADD_TO_CART', return a new state object with an updated cart array
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      };
    // if action type value is the value of 'ADD_MULTIPLE_TO_CART', return a new state object with an updated cart array, adding multiple objects
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    // if action type value is the value of 'REMOVE_FROM_CART', return a new state object with an updated cart array, removing objects and closing the cart if no objects remain
    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };
    // if action type value is the value of 'UPDATE_CART_QUANTITY', return a new state object with an updated cart quantity for the item
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        })
      };
    // if action type value is the value of 'CLEAR_CART', return a new state object with an empty cart array and closing the cart
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };
    // if action type value is the value of 'CLEAR_CART', return a new state object with an empty cart array and closing the cart
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };
   // if it's none of thes actions, do not update state at all and keep things the same!
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}