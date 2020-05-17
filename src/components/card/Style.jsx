import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({
    root: {
        minWidth: '210px',
        maxHeight: '132px',
        margin: '5px 5px',
        borderRadius: '8px',
        // backgroundImage: 'linear-gradient(45deg, rgb(7, 5, 117) -38%, rgb(0, 51, 212) 20%, rgb(0, 110, 232) 70%, rgb(0, 255, 247) 122%)',
        backgroundColor: 'rgb(0,0,0,0.6)',
        color: '#ffffff',
        transition: 'box-shadow .3s',
        border: '1px solid transparent',
        boxShadow: '0px 0px 0px grey',
        '&:hover': {
            boxShadow: '1px 6px 10px #3c3c3c',
            backgroundColor: 'rgb(0,0,0,0.7)'
        },
        '@media (max-width: 499px)': {
           flex: '1'
        }
    },

    cardHeader: {
        display: 'flex',
        fontSize: '14px',
        padding: '5px'
    },

    title: {
        margin: '1px 0px 0px 5px',
        color: '#ffffff'
    },

    cardIcon: {
        color: '#ffffff'
    },

    cardCenter: {
        minHeight: '50px',
        padding: '8px 0px 0px 10px'
    },

    buttonCard: {
        color: '#ffffff'
    },

    cardBottom: {
        display: 'flex',
        borderTop: '1px solid #cfcfcf',
        padding: '3px 10px'
    },

    cardBottomFlex: {
        flex: 1
    }
}));