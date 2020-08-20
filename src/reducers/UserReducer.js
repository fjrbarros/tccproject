const intialState = {
    name: '',
    email:'',
    phone: '',
    id: null,
    isAuthenticated: false, 
    isLoading: false,
    activityStage: [],
    projectClosureReason: [],
    projectMemberProfile: [],
    activityStatus: [],
    projectStatus: [],
    typeProject: []
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
        case 'UPDATE_LOADING':
            return {
                ...state,
                isLoading: actions.isLoading
            }
        case 'UPDATE_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: actions.isAuthenticated
            }
        case 'UPDATE_DATA_ENUM':
            return {
                ...state,
                activityStage: actions.data.filter(item => item.tipo === 'ESTAGIO_ATIVIDADE')[0].valores,
                projectClosureReason: actions.data.filter(item => item.tipo === 'MOTIVO_ENCERRAMENTO_PROJETO')[0].valores,
                projectMemberProfile: actions.data.filter(item => item.tipo === 'PERFIL_MEMBRO_PROJETO')[0].valores,
                activityStatus: actions.data.filter(item => item.tipo === 'STATUS_ATIVIDADE')[0].valores,
                projectStatus: actions.data.filter(item => item.tipo === 'STATUS_PROJETO')[0].valores,
                typeProject: actions.data.filter(item => item.tipo === 'TIPO_PROJETO')[0].valores
            }
        default:
            return state;
    }
}

export default rootReducer;