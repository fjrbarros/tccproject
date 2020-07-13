import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    saveButton: {
        width: props => props.width ? props.width : '100%',
        marginTop: '20px'
    }
}))