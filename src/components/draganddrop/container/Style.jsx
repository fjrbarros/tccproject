import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles( props => ({
    container: {
        flex: '1',
        width: '100%',
        minWidth: '320px',
        minHeight: '500px',
        margin: props => props.margin || '0px',
        boxShadow: '0px 0px 7px 1px #b3b3b3',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        border: props => props.border || 'none'
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