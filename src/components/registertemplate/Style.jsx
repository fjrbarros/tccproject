import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        width: '600px',
        margin: '0px auto',
        '@media (max-width: 600px)': {
            width: '100%'
        }
    },

    containerCenter: {
        padding: '20px',
        textAlign: 'center'
    },

    flex: {
        flex: '1'
    },

    containerInput: {
        width: '100%',
        margin: '15px 0px'
    },

    activities: {
        display: 'flex',
        alignItems: 'center',
        fontStyle: 'italic',
        marginTop: '10px'
    },

    addBoxIcon: {
        marginLeft: '20px',
        fontSize: '2rem',
        cursor: 'pointer',
        color: '#062faa'
    },

    saveButton: {
        width: '40%',
        marginTop: '10px'
    },

    addBoxIconTask: {
        margin: '0px 2px 0px 15px',
        fontSize: '1.7rem',
        cursor: 'pointer',
        color: '#062faa'
    },

    activity: {
        width: '94%',
        padding: '10px',
        margin: '10px auto',
        border: '1px solid #cfcfcf',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px grey'
    },

    removeActivity: {
        fontSize: '30px',
        cursor: 'pointer',
        margin: '-10px -11px 0px 0px',
        color: '#e41313'
    },

    tasks: {
        display: 'flex',
        marginTop: '10px',
        fontStyle: 'italic'
    },

    inputTask: {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center'
    },

    deleteTaskIcon: {
        margin: '27px 2px 0px 15px',
        color: '#e41313',
        cursor: 'pointer',
        fontSize: '1.6rem'
    }
}))