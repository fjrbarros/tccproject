import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(length => ({
    content: {
        maxHeight: 'calc(100vh - 65px)',
        width: '100%',
        overflow: 'auto'
    },

    dashboard: {
        maxWidth: function (length) {
            switch (length) {
                case 1:
                    return '222px';
                case 2:
                    return '444px';
                default:
                    return '666px';
            }
        },
        margin: '0px auto',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '20px',
        '@media (max-width: 280px)': {
            width: '100%'
        }
    }
}))