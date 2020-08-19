import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(props => ({

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
        width: props => props.hiddenCard ? '100%' : '0%',
        height: props => props.hiddenCard ? '100%' : '0%',
        overflow: 'hidden',
        transition: 'width 0.3s'
    },

    cardProjectOptions: {
        width: props => props.hiddenCard ? '0%' : '100%',
        height: props => props.hiddenCard ? '0%' : '100%',
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














    // root: {
    //     minWidth: '210px',
    //     maxWidth: '210px',
    //     maxHeight: '132px',
    //     margin: '5px 5px',
    //     borderRadius: '8px',
    //     backgroundImage: props => {
    //         if (props.concluded) {
    //             return 'linear-gradient(135deg, #03f900, #0a4c00)';
    //         }

    //         return 'linear-gradient(135deg, #5a4fa9, #2f9aee)';
    //     },
    //     color: '#ffffff',
    //     transition: 'box-shadow .3s',
    //     border: '1px solid transparent',
    //     boxShadow: '0px 0px 0px grey',
    //     '&:hover': {
    //         boxShadow: '1px 6px 10px #3c3c3c'
    //     },
    //     '@media (max-width: 705px)': {
    //         maxWidth: 'none',
    //         minWidth: '210px',
    //         width: '47%'
    //     },
    //     '@media (max-width: 483px)': {
    //         maxWidth: 'none',
    //         width: '100%'
    //     }
    // },

    // cardHeader: {
    //     display: 'flex',
    //     fontSize: '14px',
    //     padding: '5px'
    // },

    // title: {
    //     margin: '1px 0px 0px 5px',
    //     color: '#ffffff'
    // },

    // cardIcon: {
    //     color: '#ffffff'
    // },

    // cardCenter: {
    //     minHeight: '30px',
    //     maxHeight: '30px',
    //     overflowY: 'auto',
    //     wordBreak: 'break-all',
    //     padding: '8px 0px 0px 8px'
    // },

    // buttonCard: {
    //     color: '#ffffff',
    //     textTransform: 'none'
    // },

    // progressBar: {
    //     height: '20px',
    //     display: 'flex',
    //     alignItems: 'center'
    // },

    // progressBarContent: {
    //     height: '8px',
    //     width: '100%',
    //     backgroundColor: '#f0f0f0',
    //     borderTopRightRadius: '10px',
    //     borderBottomRightRadius: '10px'
    // },

    // progressBarColor: {
    //     height: '100%',
    //     width: props => `${props.percentual}%`,
    //     background: props => props.percentual <= 40 ? 'rgb(255, 0, 0)' :
    //         props.percentual <= 70 ?
    //             'linear-gradient(90deg, rgb(255, 0, 0) 25%, rgb(255, 231, 0) 70%)' :
    //             'linear-gradient(90deg, rgb(255, 0, 0) 12%, rgb(255, 231, 0) 55%, rgb(0, 250, 25) 90%)'
    // },

    // progressBarRadius: {
    //     height: '18px',
    //     borderRadius: '10px',
    //     width: '30px',
    //     marginLeft: '-30px',
    //     background: 'radial-gradient(circle, rgba(0,192,232,1) 0%, rgba(6,48,161,1) 0%, rgba(2,67,128,1) 44%, rgba(5,136,186,1) 89%)',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     fontSize: '10px'
    // },

    // cardBottom: {
    //     height: '37px',
    //     display: 'flex',
    //     borderTop: '1px solid #cfcfcf',
    //     padding: '3px 10px'
    // },

    // cardBottomFlex: {
    //     flex: 1
    // },

    // iconCardMoreOption: {
    //     fontSize: '1.2rem',
    //     marginRight: '5px'
    // },

    // typCardMoreOpt: {
    //     height: '25px',
    //     width: props => props.hiddenCard ? '0px' : '100%',
    //     display: props => props.hiddenCard ? 'none' : 'flex',
    //     fontSize: '0.85rem',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     transition: 'width 0.4s',
    //     marginTop: '6px',
    //     cursor: 'pointer',
    //     '&:hover': {
    //         backgroundColor: 'rgb(0,0,0,0.15)'
    //     }
    // },

    // rootEdit: {
    //     height: '132px',
    //     width: props => props.hiddenCard ? '0px' : '212px',
    //     textAlign: 'center',
    //     margin: '-1px 0px 0px -1px',
    //     backgroundImage: 'linear-gradient(135deg, #2f9aee, #5a4fa9)',
    //     borderRadius: '8px',
    //     zIndex: 999,
    //     position: 'absolute',
    //     transition: 'width .2s',
    //     display: 'flex',
    //     flexDirection: 'column'
    // }
}));