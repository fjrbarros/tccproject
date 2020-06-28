import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({
    listMember: {
        listStyle: 'none',
        margin: 'initial',
        paddingInlineStart: '0px',
        textAlign: 'left'
    },

    itemListMember: {
        display: 'flex',
        marginBottom: '3px',
        height: '20px',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.1)'
        }
    },

    itemListEmail: {
        flex: 1,
        textAlign: 'center',
        fontSize: '0.9rem'
    },

    itemListDescription: {
        flex: 0.5,
        textAlign: 'center',
        fontSize: '0.9rem'
    },

    iconRemoveMember: {
        color: '#d02020',
        cursor: 'pointer',
        fontSize: '1.2rem'
    }
}));