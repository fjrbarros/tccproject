import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(length => ({
    flex: {
        flex: 1
    },

    containerFilter: {
        width: '100%',
        margin: '0px 7px',
        display: 'flex'
    },

    iconFilter: {
        fontSize: '2rem',
        cursor: 'pointer',
        color: '#585858'
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