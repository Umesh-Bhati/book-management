import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/models';
import { getUser, login, signup } from './usersThunks';

interface IUserState {
	data: Omit<IUser, 'password'>;
	isAuthenticated: boolean;
	isLoading: boolean;
	error?: string | null;
}

const initialState: IUserState = {
	data: { name: '', email: '' },
	isAuthenticated: false,
	isLoading: false,
	error: "",
}


const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {

	},
	extraReducers(builder) {
		builder.addCase(signup.pending, state => {
			state.isLoading = true;
		})
			.addCase(signup.fulfilled, (state) => {
				state.isLoading = false;
				state.isAuthenticated = true
			})
			.addCase(signup.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false
				state.error = action.error.message;
			})


		builder.addCase(login.pending, state => {
			state.isLoading = true;
		})
			.addCase(login.fulfilled, (state) => {
				state.isLoading = false;
				state.isAuthenticated = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false
				state.error = action.error.message;
			})


		builder.addCase(getUser.pending, (state) => {
			state.isLoading = true;
		})
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.isLoading = false;
			if (action.payload?.success) {
				state.isAuthenticated = true;
				state.data = action.payload?.data
			}
		})
		builder.addCase(getUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isAuthenticated = false;
			state.error = action.error.message;
		})
	},
});

export const userReducer = userSlice.reducer;