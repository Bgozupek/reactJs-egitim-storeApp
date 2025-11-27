import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { router } from "../../App";
import requests from "../../api/apiClient";

const initialState = {
    user: null,
    status : "idle"
}

export const loginUser = createAsyncThunk(
    "account/login",
    async (data, thunkAPI) => {
        try{
            const user = await requests.account.loginUser(data);
            localStorage.setItem("user", JSON.stringify(user));
            return user
        }
        catch (error){
            return thunkAPI.rejectWithValue({message: error.message})
        }
    }   
)

export const registerUser = createAsyncThunk(
    "account/register",
    async (data, thunkAPI) => {
        try{
            await requests.account.registerUser(data);
            router.navigate("/login")
        }
        catch (error){
            return thunkAPI.rejectWithValue({message: error.message})
        }
    }   
)

export const getUser = createAsyncThunk(
    "account/getUser",
    async (thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
        try{
            const user = await requests.account.getUser();
            localStorage.setItem("user", JSON.stringify(user))
            return user 
        }
        catch (error){
            return thunkAPI.rejectWithValue({message: error.message})
            
        }
    },{
        condition: () => {
            if(!localStorage.getItem("user")) return false;
        }
    }  
)

export const accountSlice = createSlice({
    name:"account",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user")
            router.navigate("/")
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.status = "pending"

        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = "idle"
            router.navigate("/products")

        })
        builder.addCase(loginUser.rejected, (state) => {
            state.status = "idle"

        })
        builder.addCase(registerUser.pending, (state) => {
            state.status = "pending"

        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = "idle"

        })
        builder.addCase(registerUser.rejected, (state) => {
            state.status = "idle"

        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload

        })
        builder.addCase(getUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem("user")
            router.navigate("/login")
        })
        
    }
})

export const { setUser, logout } = accountSlice.actions; 