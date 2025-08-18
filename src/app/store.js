import { configureStore } from "@reduxjs/toolkit";
import productReducre from '../features/shopCart/productSlice'
import cartReducer from '../features/shopCart/cartSlice'

export const store = configureStore({
    reducer: {
        products : productReducre,
        cart: cartReducer
    }
})