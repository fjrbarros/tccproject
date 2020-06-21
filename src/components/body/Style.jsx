import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    body: {
        height: '100vh',
        width: '100%',
        backgroundColor: props => props.backgroundColor ? props.backgroundColor : '#f0f0f0',
        overflow: 'auto'
    }
}))