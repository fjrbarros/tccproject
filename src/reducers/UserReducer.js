const intialState = {
    name: '',
    email:'',
    phone: '',
    id: null
}

function rootReducer(state = intialState, actions) {
    switch(actions.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                name: actions.name,
                email: actions.email,
                phone: actions.phone,
                id: actions.id
            }
        default:
            return state;
    }
}

export default rootReducer;