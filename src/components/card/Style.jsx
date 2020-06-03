import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({
    root: {
        minWidth: '210px',
        maxWidth: '212px',
        maxHeight: '132px',
        margin: '5px 5px',
        borderRadius: '8px',
        backgroundImage: 'linear-gradient(135deg, #5a4fa9, #2f9aee)',
        color: '#ffffff',
        transition: 'box-shadow .3s',
        border: '1px solid transparent',
        boxShadow: '0px 0px 0px grey',
        '&:hover': {
            boxShadow: '1px 6px 10px #3c3c3c',
            backgroundColor: 'rgb(0,0,0,0.7)'
        },
        '@media (max-width: 499px)': {
            flex: '1'
        }
    },

    cardHeader: {
        display: 'flex',
        fontSize: '14px',
        padding: '5px'
    },

    title: {
        margin: '1px 0px 0px 5px',
        color: '#ffffff'
    },

    cardIcon: {
        color: '#ffffff'
    },

    cardCenter: {
        minHeight: '30px',
        padding: '8px 0px 0px 10px'
    },

    buttonCard: {
        color: '#ffffff',
        textTransform: 'none'
    },

    progressBar: {
        height: '20px',
        display: 'flex',
        alignItems: 'center'
    },

    progressBarContent: {
        height: '8px',
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px'
    },

    progressBarColor: {
        height: '100%',
        width: props => `${props.percentual}%`,
        background: props => props.percentual <= 40 ? 'rgb(255, 0, 0)' : 
        props.percentual <= 70 ? 
        'linear-gradient(90deg, rgb(255, 0, 0) 25%, rgb(255, 231, 0) 70%)' : 
        'linear-gradient(90deg, rgb(255, 0, 0) 12%, rgb(255, 231, 0) 55%, rgb(0, 250, 25) 90%)'
    },

    progressBarRadius: {
        height: '18px',
        borderRadius: '10px',
        width: '30px',
        marginLeft: '-30px',
        background: 'radial-gradient(circle, rgba(0,192,232,1) 0%, rgba(6,48,161,1) 0%, rgba(2,67,128,1) 44%, rgba(5,136,186,1) 89%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '10px'
    },

    cardBottom: {
        display: 'flex',
        borderTop: '1px solid #cfcfcf',
        padding: '3px 10px'
    },

    cardBottomFlex: {
        flex: 1
    },

    cardMore: {
        margin: '3px 0px 0px -10px',
        cursor: 'pointer',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.2)'
        }
    },

    iconCardMoreOption: {
        fontSize: '1.2rem',
        marginRight: '5px'
    },

    typCardMoreOpt: {
        height: '25px',
        width: props => props.hiddenCardEdit ? '0px' : '100%',
        display: props => props.hiddenCardEdit ? 'none' : 'flex',
        fontSize: '0.85rem',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.4s',
        marginTop: '6px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.15)'
        }
    },

    rootEdit: {
        height: '132px',
        width: props => props.hiddenCardEdit ? '0px' : '212px',
        textAlign: 'center',
        margin: '-1px 0px 0px -1px',
        backgroundImage: 'linear-gradient(135deg, #2f9aee, #5a4fa9)',
        borderRadius: '8px',
        zIndex: 999,
        position: 'absolute',
        transition: 'width .4s',
        display: 'flex',
        flexDirection: 'column'
    }
}));