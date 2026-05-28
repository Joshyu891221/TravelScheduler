import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
    name: 'group',
    initialState: {
        groups: []
    },
    reducers: {
        getGroup: (state, action) => {
            state.groups = [action.payload];
        }
    }
});

export const { getGroup } = groupSlice.actions;
export default groupSlice.reducer;