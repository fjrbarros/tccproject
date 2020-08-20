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
        // boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        backgroundImage: 'linear-gradient(to right, rgb(0, 34, 109) -2%, rgb(8, 51, 187) 0%, rgb(0, 120, 171) 83%, rgb(0, 255, 247) 165%)',
        color: '#ffffff',
        // boxShadow: '2px 2px 8px #676767',
        '&:hover': {
            // boxShadow: '2px 2px 8px #676767'
            boxShadow: '1px 1px 6px gray',
            borderStyle: 'groove'
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