import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles( props => ({
    container: {
        flex: '1',
        width: '100%',
        minWidth: '320px',
        minHeight: '500px',
        border: '1px solid #cfcfcf',
        margin: props => props.margin || '0px',
        backgroundColor: 'rgb(0,0,0,0.8)',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
    },

    header: {
        height: '60px',
        textAlign: 'center',
        borderBottom: '1px solid #cfcfcf',
        borderTopLeftRadius: '7px',
        borderTopRightRadius: '7px',
        backgroundColor: props => props.headerContainerBackgroun || 'none'
    },

    typography: {
        fontSize: '1.3em',
        padding: '10px 0px',
        fontStyle: 'italic',
        color: '#ffffff'
    },

    containerCenter: {
        height: 'calc(100% - 80px)',
        overflowY: 'auto',
        padding: '10px'
    }
    
}));