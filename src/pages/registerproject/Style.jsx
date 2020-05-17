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
        display: 'flex'
    },

    dateStart: {
        marginRight: '30px'
    },

    saveButton: {
        width: '50%',
        marginTop: '10px'
    }
}));