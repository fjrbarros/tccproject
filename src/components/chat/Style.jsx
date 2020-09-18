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

    listItem: {
        '&:hover': {
            backgroundColor: '#e6e6e6'
        }
    },

    nameUser: {
        whiteSpace: 'nowrap',
        textOverflow: 'Ellipsis',
        overflow: 'hidden'
    }
}))