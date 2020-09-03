import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    body: {
        height: 'calc(100vh - 65px)',
        width: '100%',
        backgroundColor: props => props.backgroundColor ? props.backgroundColor : '#f0f0f0',
        overflow: props => props.overflow ? props.overflow : 'auto'
    }
}))