const initialState = {
    undone_spots: [],
    done_spots: [],
    star_spots: [],
}

const userspotReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GetUserSpots':
            return {
                ...state,
                undone_spots: [action.payload.undone_spots],
                done_spots: [action.payload.done_spots],
                star_spots: [action.payload.star_spots],
            };
        default:
            return state;
    }
};

export default userspotReducer;
