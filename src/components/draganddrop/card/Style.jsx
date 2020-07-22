import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles( props => ({
    card: {
        height: '50px',
        marginBottom: '10px',
        boxShadow: '0px 0px 8px 2px #cfcfcf',
        borderRadius: '5px',
        cursor: 'move',
        padding: '10px',
        color: '#969696',
        transition: 'box-shadow .2s',
        '&:hover': {
            boxShadow: '0px 0px 8px 2px #989797',
        }
    }
}));