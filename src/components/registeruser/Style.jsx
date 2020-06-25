import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    cadastro: {
        width: '400px',
        margin: '0 auto',
        padding: '5px',
        textAlign: 'center',
        '@media (max-width: 400px)': {
            width: '97%'
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