import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/index"
import modalSlice from "./features/cart/modalSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalSlice,
    }
})