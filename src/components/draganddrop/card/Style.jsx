import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles( props => ({
    card: {
        height: '70px',
        marginBottom: '10px',
        backgroundImage: 'linear-gradient(220deg, rgb(0, 34, 109) -38%, rgb(8, 51, 187) 20%, rgb(0, 120, 171) 70%, rgb(0, 255, 247) 122%)',
        borderRadius: '5px'
    }
}));