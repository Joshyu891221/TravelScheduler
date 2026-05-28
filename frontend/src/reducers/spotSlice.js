import { createSlice } from '@reduxjs/toolkit';

const spotSlice = createSlice({
    name: 'spot',
    initialState: {
        spots: []
    },
    reducers: {
        getTravelSpot: (state, action) => {
            state.spots = [action.payload.spots];
        }
    }
});

export const { getTravelSpot } = spotSlice.actions;
export default spotSlice.reducer;