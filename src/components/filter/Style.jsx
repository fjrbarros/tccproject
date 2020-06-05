import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    dialog: {
        '& .MuiDialog-paperWidthSm': {
            width: '300px',
            maxWidth: '600px',
            zIndex: 9999
        }
    },

    dialogHeader: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },

    dialogHeaderTitle: {
        padding: '5px'
    },

    dialogContent: {
        padding: '8px'
    },

    iconFilter: {
        fontSize: '2.5rem',
        color: '#3f51b5'
    },

    titleFilter: {
        fontSize: '1.3rem',
        color: '#544e4e'
    },

    buttonFilter: {
        textTransform: 'none'
    },

    iconButton: {
        marginRight: '3px',
        fontSize: '1.2rem'
    }
}))