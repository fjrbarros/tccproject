import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const useStyles = makeStyles(({
    body: {
        // background: 'linear-gradient(45deg, rgba(150, 0, 121, 0.85) 0%, rgba(0, 90, 224, 0.85) 64%, rgba(0, 255, 221, 0.85) 126%)',
        background: 'linear-gradient(45deg, rgb(0, 34, 109) -38%, rgb(8, 51, 187) 20%, rgb(0, 120, 171) 70%, rgb(0, 255, 247) 122%)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '550px',
        color: '#ffffff'
    },

    form: {
        width: '350px',
        // background: 'rgb(0,0,0,0.1)',
        padding: '0 30px',
        boxShadow: '0px 0px 15px #312e2e',
        borderRadius: '10px',
        '@media (max-width: 600px)': {
            width: '100%',
            height: '100%',
            borderRadius: '0px',
        }
    },

    formHeader: {
        textAlign: 'center',
        fontSize: '21px',
        margin: '25px 0px 0px 0px'
    },

    logo: {
        height: '80px',
        margin: '10px 0'
    },

    formCenter: {
        '& div:first-child': {
            marginBottom: '10px'
        },
        margin: '25px 0'
    },

    formBottom: {
        margin: '25px 0',
        fontSize: '17px',
        textAlign: 'center',
        '& a': {
            color: '#ffffff',
            textDecoration: 'none'
        },
        '& a:hover': {
            textDecoration: 'underline'
        }
    },

    boxRecPassword: {
        margin: '15px 0',
    },

    RecPassword: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    },

    inputProps: {
        color: '#ffffff!important',
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset"
        }
    },

    inputLabelPropsEmail: {
        color: '#ffffff!important'
    },

    inputLabelPropsPassword: {
        color: '#ffffff!important'
    },

    textFieldEmail: {
        '& label.Mui-focused': {
            color: '#ffffff!important'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff!important'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#ffffff!important',
        }
    },

    textFieldPassword: {
        '& label.Mui-focused': {
            color: '#ffffff!important'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff!important'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#ffffff!important',
        }
    }
}));

export const CustomButton = withStyles(theme => ({
    root: {
        color: '#fff',
        border: '1px solid #007598',
        backgroundColor: '#00c1ff87',
        '&:hover': {
            backgroundColor: '#00aae087',
        },
        marginTop: '10px'
    }
}))(Button);