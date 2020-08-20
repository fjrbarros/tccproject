import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({
    root: {
        flexGrow: 1
    },

    toolbar: {
        backgroundImage: 'linear-gradient(to right, rgb(0, 34, 109) -38%, rgb(8, 51, 187) 20%, rgb(0, 120, 171) 70%, rgb(0, 255, 247) 122%)',
        padding: '5px'
    },

    flex: {
        flex: '1',
    },

    logo: {
        height: '50px',
        marginLeft: '5px'
    },

    toolbarCenter: {
        flex: '2',
        textAlign: 'center',
        fontSize: '1.25rem',
        '& p': {
            '@media (max-width: 400px)': {
                fontSize: '1.07rem'
            }
        }
    }
}));