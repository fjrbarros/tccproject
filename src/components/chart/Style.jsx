import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    svg: {
        height: '100%',
        width: '100%',
        '& text': {
            fontSize: '1.4em'
        }
    },

    content: {
        width: '100%',
        height: '100%',
        minWidth: '900px',
        padding: '0px 5px',
        display: 'flex'
    },

    tooltip: {
        color: '#545454'
    },

    moreDetail: {
        height: '302px',
        width: '371px',
        color: '#545454',
        backgroundColor: '#ffffff',
        boxShadow: '1px 4px 10px #3c3c3c',
        borderRadius: '5px',
        padding: '10px',
        '& p': {
            textAlign: 'center'
        },
        '& ul': {
            listStyle: 'none',
            padding: '0',
            margin: '0'
        }
    }
}))