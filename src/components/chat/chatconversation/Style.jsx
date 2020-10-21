import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;

export const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            top: '58px',
            flex: '1 0 auto',
            height: '100%',
            display: 'flex',
            outline: '0',
            zIndex: '1200',
            position: 'fixed',
            overflowY: 'auto',
            flexDirection: 'column'
        }
    },

    drawerPaper: {
        width: drawerWidth
    },

    drawerHeader: {
        padding: '10px',
        backgroundColor: '#404040',
        color: '#ffffff',
        '& p': {
            whiteSpace: 'nowrap',
            textOverflow: 'Ellipsis',
            maxWidth: '250px',
            overflow: 'hidden',
            float: 'left'
        },
        '& svg': {
            float: 'right',
            cursor: 'pointer'
        }
    },

    contentConversation: {
        backgroundColor: 'red',
        flex: 1
    },

    contentMessage: {
        backgroundColor: 'blue',
        flex: 0.1
    }
}))