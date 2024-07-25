import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthService = () => {
    const apiUrl = 'http://localhost:5000/api/auth/login';
    return apiUrl;
};

const getStoredUser = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
};

const storedUser = getStoredUser();
const initialState = {
    isLoggedIn: !!storedUser && !!storedUser.token,
    user: storedUser,
    roles: storedUser ? jwtDecode(storedUser.token) : [],
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk('user/loginUser', async ({ username, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(AuthService(), { username, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: "Unknown error occurred" });
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            state.isLoggedIn = false;
            state.user = null;
            state.roles = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const token = action.payload.token;
                const decodedToken = jwtDecode(token);
                console.log("udhchudhcuhdc", decodedToken);
                state.isLoggedIn = true;
                state.user = action.payload;
                state.roles = decodedToken.roles || [];
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message || 'Invalid Username and Password' : 'Unknown error';
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
