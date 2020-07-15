import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1000px',
        padding: '10px',
        margin: '0px auto',
        height: 'calc(100% - 20px)'
    }
}));