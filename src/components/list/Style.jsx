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
        padding: '0px 5px',
        marginBottom: '3px',
        height: '20px',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.1)'
        }
    },

    itemListDescription: {
        width: '100%',
        fontSize: '0.9rem'
    },

    iconRemoveMember: {
        color: '#d02020',
        cursor: 'pointer',
        fontSize: '1.2rem'
    }
}));