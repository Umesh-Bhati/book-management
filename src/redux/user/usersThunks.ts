import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndPints } from "../../constants/api.services";
import { IUser } from "../../types/models";

const { user } = apiEndPints

export const signup = createAsyncThunk('auth/signup', async (userData: IUser) => {
    try {
        const response = await axios.post(user.SIGNUP, userData);
        return response.data
    } catch (error) {
        return error
    }
});
export const login = createAsyncThunk('auth/login', async (userData: Omit<IUser, 'name'>) => {
    try {
        const response = await axios.post(user.LOGIN, userData);
        return response.data
    } catch (error) {
        return error
    }
});
export const getUser = createAsyncThunk('user/getUser', async () => {
    try {
        const response = await axios.get('/');
        return response.data
    } catch (error) {
        return error
    }
});