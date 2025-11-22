import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/apiClient";

export const fetchProducts = createAsyncThunk(
    "catalog/fetchProdutc",
    async () => {
        return await requests.products.list()
    }
)

export const fetchProductById = createAsyncThunk(
    "catalog/fetchProductById",
    async (productId) => {
        return await requests.products.details(productId)
    }
)

const productsAdaptor = createEntityAdapter();
const initialState = productsAdaptor.getInitialState({
    status : "idle",
    isLoaded: false 
})

export const CatalogSlice = createSlice({
    name : "catalog",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.pending, (state) =>{
            state.status = "pendingFetchProducts"
        })

        builder.addCase(fetchProducts.fulfilled, (state, action) =>{
            productsAdaptor.setAll(state, action.payload)
            state.isLoaded = true
            state.status = "idle"
        })

        builder.addCase(fetchProducts.rejected, (state) =>{
            state.status = "idle"
        })

        builder.addCase(fetchProductById.pending, (state) =>{
            state.status = "pendingfetchProductById"
        })

        builder.addCase(fetchProductById.fulfilled, (state, action) =>{
            productsAdaptor.upsertOne(state, action.payload)
            state.isLoaded = true
            state.status = "idle"
        })

        builder.addCase(fetchProductById.rejected, (state) =>{
            state.status = "idle"
        })
    }
});

export const {
    selectById: selectProductById,
    selectAll: selectAllProducts,
    selectTotal: selectTotalProducts
} = productsAdaptor.getSelectors((state) => state.catalog)