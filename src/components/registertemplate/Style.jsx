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
        fontStyle: 'italic'
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
    }
}))