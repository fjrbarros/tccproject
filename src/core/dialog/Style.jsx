import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    dialog: {
        '& .MuiDialog-paperWidthSm': {
            width: '300px',
            maxWidth: '600px'
        }
    },

    dialogCenter: {
        textAlign: 'center'
    },

    button: {
        border: '1px solid blue',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.1)'
        }
    },

    dialogHeader: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },

    dialogHeaderIcon: {
        marginTop: '5px',
        '& .MuiSvgIcon-root': {
            fontSize: '3.5rem'
        },
        color: function(props) {
            if(props.type === 'error') return '#ff0000'
            if(props.type === 'alert') return '#ff8300'
            if(props.type === 'confirm') return '#3f51b5'
        } 
    },

    dialogHeaderTitle: {
        padding: '5px'
    }
}))