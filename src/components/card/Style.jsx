import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(hiddenCard => ({

    card: {
        minWidth: '246px',
        backgroundColor: '#f0f0f0',
        color: '#ffffff',
        height: '164px',
        margin: '5px auto',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        '&:hover': {
            boxShadow: '1px 4px 10px #3c3c3c'
        },
        '@media (max-width: 771px)': {
            width: '48.8%'
        },
        '@media (max-width: 500px)': {
            width: '100%'
        }
    },

    cardProject: {
        width: hiddenCard => hiddenCard ? '100%' : '0%',
        height: hiddenCard => hiddenCard ? '100%' : '0%',
        overflow: 'hidden',
        transition: 'width 0.3s'
    },

    cardProjectOptions: {
        width: hiddenCard => hiddenCard ? '0%' : '100%',
        height: hiddenCard => hiddenCard ? '0%' : '100%',
        backgroundImage: 'linear-gradient(to right, rgb(0, 34, 109) -2%, rgb(8, 51, 187) 0%, rgb(0, 120, 171) 83%, rgb(0, 255, 247) 165%)',
        overflow: 'hidden',
        transition: 'width 0.3s'
    },

    borderRadius: {
        borderRadius: '5px'
    },

    cardProjectHeader: {
        borderBottom: '1px solid #cfcfcf',
        backgroundImage: 'linear-gradient(to right, rgb(0, 34, 109) -2%, rgb(8, 51, 187) 0%, rgb(0, 120, 171) 83%, rgb(0, 255, 247) 165%)',
        padding: '10px 5px',
        display: 'flex',
        alignItems: 'center',
        '& p': {
            marginLeft: '5px',
            whiteSpace: 'nowrap',
            textOverflow: 'Ellipsis',
            maxWidth: '212px',
            overflow: 'hidden'
        }
    },

    cardProjectCenter: {
        padding: '10px 5px',
        color: '#565656',
        borderBottom: '1px solid #cfcfcf',
        '& p': {
            whiteSpace: 'nowrap',
            textOverflow: 'Ellipsis',
            maxWidth: '236px',
            overflow: 'hidden'
        }
    },

    cardProjectBottom: {
        display: 'flex',
        padding: '10px 5px',
        alignItems: 'center',
        borderBottomRightRadius: '5px',
        borderBottomLeftRadius: '5px',
        backgroundImage: 'linear-gradient(to right, rgb(0, 34, 109) -2%, rgb(8, 51, 187) 0%, rgb(0, 120, 171) 83%, rgb(0, 255, 247) 165%)',
        '& div': {
            float: 'left'
        },
        '& button': {
            float: 'right',
            color: '#ffffff',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: 'rgb(0,0,0,0.2)'
            }
        }
    },

    cardMoreOption: {
        margin: '5px 0px 0px 5px',
        cursor: 'pointer',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.2)'
        }
    },

    flex: {
        flex: 1
    },

    defaultOptionCard: {
        display: 'flex',
        padding: '5px',
        margin: '8px 0px',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '0.9rem',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.2)'
        }
    },

    iconCardMoreOption: {
        fontSize: '1.2rem',
        marginRight: '5px'
    }
}));