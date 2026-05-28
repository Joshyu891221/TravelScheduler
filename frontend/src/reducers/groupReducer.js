const initialState = {
    groups: []
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GetGroup':
            return {
                ...state,
                groups: [action.payload]
            }
        default:
            return state;
    }
}

export default groupReducer;
