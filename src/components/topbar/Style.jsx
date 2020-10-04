import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(isMenuActive => ({
    root: {
        flexGrow: 1
    },

    toolbar: {
        backgroundImage: 'linear-gradient(to right, rgb(0, 34, 109) -38%, rgb(8, 51, 187) 20%, rgb(0, 120, 171) 70%, rgb(0, 255, 247) 122%)',
        padding: '5px'
    },

    toolbarLeft: {
        flex: '1',
        '@media (max-width: 600px)': {
            flex: '0.5'
        }
    },

    logo: {
        height: '50px'
    },

    toolbarCenter: {
        flex: '1',
        textAlign: 'center',
        '@media (max-width: 600px)': {
            flex: '2'
        }
    },

    toolbarRight: {
        flex: '1',
        display: 'flex',
        '@media (max-width: 600px)': {
            flex: '0.3'
        }
    },

    toolbarRightFlex: {
        flex: '1'
    },

    allIcon: {
        fontSize: '10px',
        cursor: 'pointer',
        margin: '0px 10px 0px 0px',
        width: '25px',
        height: '25px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '3px',
        transition: 'background-color .5s',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.3)'
        },
        '@media (max-width: 705px)': {
            display: 'none'
        }
    },

    menuIcon: {
        width: '25px',
        display: 'none',
        padding: '0px 2px',
        cursor: 'pointer',
        '& div, &::before, &::after':{
            backgroundColor: '#fff',
            borderRadius: '3px',
            content: "''",
            display: 'block',
            height: '3px',
            margin: '5px 0',
            transition: 'all .3s ease-in-out'
        },
        '@media (max-width: 705px)': {
            display: 'block'
        },
        '& div': {
            transform: isMenuActive => isMenuActive ? 'scale(0)' : 'scale(1)'
        },
        '&::after': {
            transform: isMenuActive => isMenuActive ? 'translateY(-8px) rotate(-135deg)' : 'translateY(0px) rotate(0deg)'
        },
        '&::before': {
            transform: isMenuActive => isMenuActive ? 'translateY(8px) rotate(135deg)' : 'translateY(0px) rotate(0deg)'
        }
    },

    menuItems: {
        height: isMenuActive => isMenuActive ? '215px' : '0px',
        width: '50px',
        position: 'absolute',
        marginLeft: 'calc(100% - 50px)',
        zIndex: '9999',
        background: 'rgb(0,0,0,0.5)',
        transition: 'all 0.5s ease',
        display: 'none',
        '@media (max-width: 705px)': {
            display: 'block'
        }
    },

    allIconMenu: {
        fontSize: '22px',
        cursor: 'pointer',
        margin: '10px 0px 0px 15px',
        color: '#ffffff',
        width: '25px',
        height: isMenuActive => isMenuActive ? '25px' : '0px',
        display: isMenuActive => isMenuActive ? 'block' : 'none',
        borderRadius: '3px',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: 'rgb(0,0,0,0.5)'
        }
    }
}))