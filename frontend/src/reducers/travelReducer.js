const initialState = {
    travels: []
};

const travelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GetTravels':
            return {
                ...state,
                travels: [action.payload]
            }
        default:
            return state;
    }
}

export default travelReducer;