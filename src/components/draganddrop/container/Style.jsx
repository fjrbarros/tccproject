import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles( props => ({
    container: {
        flex: '1',
        minWidth: '270px',
        border: '1px solid #cfcfcf',
        margin: props => props.margin || '0px',
        backgroundColor: 'rgb(0,0,0,0.8)',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
    },

    header: {
        height: '60px',
        textAlign: 'center',
        borderBottom: '1px solid #cfcfcf'
    },

    typography: {
        fontSize: '1.3em',
        padding: '10px 0px',
        fontStyle: 'italic',
        color: '#ffffff'
    },

    containerCenter: {
        height: '400px',
        backgroundColor: 'red',
        minHeight: '10px',
        overflowY: 'auto',
        padding: '10px'
    }
    
}));