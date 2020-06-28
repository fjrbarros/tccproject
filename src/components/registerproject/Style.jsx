import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({
    container: {
        width: '500px',
        margin: '0px auto',
        '@media (max-width: 600px)': {
            width: '100%'
        }
    },

    containerCenter: {
        padding: '15px',
        textAlign: 'center'
    },

    containerInput: {
        width: '100%',
        marginBottom: '20px'
    },

    containerDate: {
        display: 'flex',
        marginBottom: '20px'
    },

    dateStart: {
        marginRight: '30px'
    },

    saveButton: {
        width: '50%',
        marginTop: '10px'
    },

    addMemberProject: {
        height: '20px',
        width: '100%',
        display: 'flex',
        marginBottom: '10px'
    },

    flex: {
        flex: 1
    },

    addMemberProjectTitle: {
        fontSize: '1.2rem',
        fontStyle: 'italic',
        color: '#464545'
    },

    iconAddMemberProject: {
        marginLeft: '5px',
        cursor: 'pointer',
        color: '#062faa',
        fontSize: '1.7rem'
    },

    containerMemberProject: {
        width: '100%',
        height: '92px',
        border: '1px solid #b7b4b4',
        borderRadius: '5px'
    },

    headerContainerMemberProject: {
        borderBottom: '1px solid #b7b4b4',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        display: 'flex'
    },

    textHeaderContainerMember: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        color: '#464545',
        fontSize: '1rem',
        fontStyle: 'italic'
    },

    textHeaderContainerFunction: {
        display: 'flex',
        flex: 0.5,
        justifyContent: 'center',
        color: '#464545',
        fontSize: '1rem',
        fontStyle: 'italic'
    },

    containerCenterMemberProject: {
        overflowY: 'auto',
        maxHeight: '70px'
    }
}));