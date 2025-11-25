import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../pages/counter/counterSlice";
import { CatalogSlice } from "../pages/catalog/catalogSlice";
import { accountSlice } from "../pages/account/accountSlice";
import { cartSlice } from "../pages/cart/cartSlice";

export const store = configureStore({
    reducer:{
        counter: counterSlice.reducer,
        cart: cartSlice.reducer,
        catalog: CatalogSlice.reducer,
        account: accountSlice.reducer,
    },
})