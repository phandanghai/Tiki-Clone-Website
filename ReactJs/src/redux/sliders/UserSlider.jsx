import {createSlice} from '@reduxjs/toolkit'

const initiaState = {
    loading : false,
    isSuccess : false,
    user : {
    }
}

const userSlider = createSlice({
    name : 'user',
    initialState : initiaState,
    reducers : {
        getUserStart:(state) => {
            state.loading = true;
            state.isSuccess = false;
        },
        getUserSuccess : (state,action) => {
            state.loading = false;
            state.isSuccess = true;
            state.user = action.payload;
        },
        getUserFail : (state) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
})

export const { getUserFail,getUserStart,getUserSuccess} = userSlider.actions;

export default userSlider.reducer;