import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    container: {
        width: '400px',
        display: 'flex',
        margin: '0 auto',
        justifyContent:  'center',
        '@media (max-width: 400px)': {
            width: '100%'
        }
    },

    form: {
        textAlign: 'center',
        marginTop: '10px',
        width: '94%'
    },

    marginTopBottom: {
        margin: '15px 0px'
    },

    marginBottom: {
        margin: '0px 0px 15px 0px'
    },

    editPasswordButton: {
        width: '49%',
        marginRight: '5px',
        textTransform: 'none'
    },

    saveButton: {
        width: '49%',
        textTransform: 'none'
    }
}))