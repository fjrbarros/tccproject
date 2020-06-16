import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    cadastro: {
        width: '400px',
        margin: '0 auto',
        padding: '5px',
        textAlign: 'center',
        '@media (max-width: 600px)': {
            width: '97%',
            height: props => props.topBar ? `calc(100vh - ${props.topBar})` : '100vh'
        }
    },

    marginTopBottom: {
        margin: '15px 0px'
    },

    marginBottom: {
        margin: '0px 0px 15px 0px'
    },

    saveButton: {
        width: '70%'
    }
}))