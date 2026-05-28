const initialState = {
    loginWithGoogle: false,
    userId: "",
    displayName: "",
    email: "",
    photoURL: "",
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LoggedOutWithGoogle':
            return {
                ...state,
                loginWithGoogle: false,
                displayName: "",
                email: "",
                photoURL: ""
            }
        case 'Register':
            return {
                ...state,
                userId: action.payload.userId
            }
        case 'GetUser':
            return {
                ...state,
                userId: action.payload.userId,
                displayName: action.payload.displayName,
                email: action.payload.email,
                photoURL: action.payload.photoURL,
            }
        default:
            return state;
    }
};

export default loginReducer;
