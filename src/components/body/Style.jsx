import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    body: {
        height: props => props.topBar ? `calc(100vh - ${props.topBar})` : '100vh',
        backgroundColor: props => props.backgroundColor ? props.backgroundColor : '#f0f0f0',
        overflowY: 'auto'
    }
}))