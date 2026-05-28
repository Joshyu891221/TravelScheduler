import { createSlice } from '@reduxjs/toolkit';

const travelSlice = createSlice({
    name: 'travel',
    initialState: {
        travels: []
    },
    reducers: {
        getTravels: (state, action) => {
            state.travels = [action.payload];
        }
    }
});

export const { getTravels } = travelSlice.actions;
export default travelSlice.reducer;