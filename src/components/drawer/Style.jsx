import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({
    list: {
        width: '265px'
    },

    iconLeftFlex: {
        flex: 1
    },

    listProject: {
        paddingTop: '0',
        paddingBottom: '0'
    },

    listItemProject: {
        width: '100%',
        margin: '5px auto',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        backgroundImage: 'linear-gradient(to right, rgb(0, 34, 109) -2%, rgb(8, 51, 187) 0%, rgb(0, 120, 171) 83%, rgb(0, 255, 247) 165%)',
        color: '#ffffff',
        border: '2px solid',
        '&:hover': {
            boxShadow: '1px 1px 6px gray',
            border: '2px solid #ffffff',
        },
        '& p': {
            fontSize: '0.9rem',
            margin: '5px 0px',
            whiteSpace: 'nowrap',
            textOverflow: 'Ellipsis',
            maxWidth: '194px',
            overflow: 'hidden'
        },
        '& svg': {
            marginRight: '5px',
            fontSize: '0.9rem'
        }
    }
}))