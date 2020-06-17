import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    dialog: {
        '& .MuiDialog-paperWidthSm': {
            width: '300px',
            maxWidth: '600px',
            zIndex: 9999
        }
    },

    dialogContent: {
        padding: '8px'
    },

    button: {
        textTransform: 'none'
    },

    iconButton: {
        marginRight: '5px',
        fontSize: '1rem'
    }
}))