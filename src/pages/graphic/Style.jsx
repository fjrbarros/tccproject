import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({
    container: {
        width: 'calc(100% - 20px)',
        maxWidth: '764px',
        minWidth: '300px',
        minHeight: '400px',
        margin: '10px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 95px)',
        backgroundColor: 'tomato'
    }
}));