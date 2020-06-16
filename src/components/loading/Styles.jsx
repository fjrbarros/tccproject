import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({
    containerLoading: {
        height: '100vh',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(0,0,0,0.2)',
        color: '#ffffff'
    }
}));