import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 10px 0px 10px',
        maxWidth: '988px',
        backgroundColor: 'tomato',
        margin: '0px auto',
        height: 'calc(100% - 20px)'
    }
}));