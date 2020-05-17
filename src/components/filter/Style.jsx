import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        backgroundColor: theme.palette.background.paper,
        width: '300px',
        padding: '10px',
    },

    containerButton: {
        display: 'flex',
        height: '30px',
        marginTop: '10px'
    },

    flex: {
        flex: '1'
    },

    cancelButton: {
        backgroundColor: '#e80000',
        color: '#ffffff',
        marginRight: '5px',
        '&:hover': {
            backgroundColor: '#af0606'
        }
    },

    formControl: {
        minWidth: '300px'
    }
}))