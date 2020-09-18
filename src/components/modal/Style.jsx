import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    modal: {
        '& .MuiDialog-paperWidthSm': {
            width: '100%',
            maxWidth: '400px',
            margin: '10px'
        }
    },

    modalTitle: {
        backgroundColor: '#eaeaea',
        padding: '10px 20px'
    },

    modalAction: {
        backgroundColor: '#eaeaea'
    },

    saveButton: {
        textTransform: 'none'
    }
}))