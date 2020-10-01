import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    svg: {
        height: '100%',
        width: '100%',
        '& rect': {
            fill: 'green'
        },
        '& rect:hover': {
            fill: 'red'
        },
        '& text': {
            fontSize: '1.4em'
        }
    },

    content: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },

    tooltip: {
        color: 'blue'
    }
}))