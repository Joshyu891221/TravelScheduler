import { createSlice } from '@reduxjs/toolkit';

const userspotSlice = createSlice({
    name: 'userspot',
    initialState: {
        undone_spots: [],
        done_spots: [],
        star_spots: [],
    },
    reducers: {
        getUserSpots: (state, action) => {
            state.undone_spots = [action.payload.undone_spots];
            state.done_spots = [action.payload.done_spots];
            state.star_spots = [action.payload.star_spots];
        }
    }
});

export const { getUserSpots } = userspotSlice.actions;
export default userspotSlice.reducer;