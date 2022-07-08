import {createSlice} from '@reduxjs/toolkit';
const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      {
        //console.log(action)
        return action.payload;
      }
    },
    setBill(state, action) {
      return state.map(item => item.quantity >= 1)
    },
    increment(state, {payload}) {
      return state.map(item =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    },
    decrement(state, {payload}) {
      return state.map(item =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      );
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      return state.filter(item => item.id !== itemId);
    },
    clear(state) {
      return [];
    },
  },
});

export const {setCart, increment, decrement, removeItem, clear} =
  cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
