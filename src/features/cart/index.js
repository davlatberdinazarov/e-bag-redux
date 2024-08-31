import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from "../../cartItems";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

// Asynchronous action to fetch cart items
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkApi) => {
    try {
      return cartItems
    } catch (error) {
      return thunkApi.rejectWithValue('Something went wrong');
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    increase: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find(item => item.id === itemId);
      if (cartItem) {
        cartItem.amount++;
      }
    },
    decrease: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find(item => item.id === itemId);
      if (cartItem) {
        cartItem.amount--;
        if (cartItem.amount <= 0) {
          state.cartItems = state.cartItems.filter(item => item.id !== itemId);
        }
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
        state.amount = state.cartItems.reduce((total, item) => total + item.amount, 0);
        state.total = state.cartItems.reduce((total, item) => total + item.amount * item.price, 0);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.error(action.payload); // Log the error for debugging
        state.isLoading = false;
      });
  },
});

export default cartSlice.reducer;
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
