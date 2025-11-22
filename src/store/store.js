import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../pages/counter/counterSlice";
import { cartSlice } from "../pages/cart/cartSlice";
import { CatalogSlice } from "../pages/catalog/catalogSlice";

export const store = configureStore({
    reducer:{
        counter: counterSlice.reducer,
        cart: cartSlice.reducer,
        catalog: CatalogSlice.reducer,
    },
})