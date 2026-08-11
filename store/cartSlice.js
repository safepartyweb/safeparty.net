import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage if exists
const loadCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const initialState = {
  cartItems: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /*
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(i => i.productId === item.productId);

      if (existItem) {
        // If product exists, update quantity
        existItem.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    */
    addToCart: (state, action) => {
      const item = action.payload;
    
      // For variable products, compare both productId and variationId
      const existItem = state.cartItems.find(i =>
        i.productId === item.productId &&
        (item.isVariable ? i.variationId === item.variationId : true)
      );
    
      if (existItem) {
        existItem.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
    
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    /*
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.productId !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    */
    removeFromCart: (state, action) => {
      const { productId, variationLabel } = action.payload;
      state.cartItems = state.cartItems.filter(item =>
        !(item.productId === productId && item.variation?.label === variationLabel)
      );
    },
    /*
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find(i => i.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    */
    updateQuantity: (state, action) => {
      const { productId, quantity, variationLabel } = action.payload;
      state.cartItems = state.cartItems.map(item => {
        if (
          item.productId === productId &&
          item.variation?.label === variationLabel
        ) {
          return { ...item, quantity };
        }
        return item;
      });
    },   

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify([]));
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
