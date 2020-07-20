const intialState = {
    name: '',
    email:'',
    phone: '',
    id: null,
    isAuthenticated: false, 
    isLoading: false
}

function rootReducer(state = intialState, actions) {
    switch(actions.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                name: actions.name,
                email: actions.email,
                phone: actions.phone,
                id: actions.id,
                isAuthenticated: actions.isAuthenticated,
                isLoading: actions.isLoading
            }
        default:
            return state;
    }
}

export default rootReducer;