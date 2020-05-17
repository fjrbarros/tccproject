import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({

    flex: {
        flex: '1'
    },

    activities: {
        display: 'flex',
        alignItems: 'center',
        fontStyle: 'italic'
    },

    addBoxIcon: {
        margin: '0px 2px 0px 15px',
        fontSize: '1.7rem',
        cursor: 'pointer',
        color: '#062faa'
    },

    activity: {
        width: '300px',
        padding: '10px',
        margin: '10px auto',
        border: '1px solid #cfcfcf',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px grey'
    },

    removeActivity: {
        fontSize: '30px',
        cursor: 'pointer',
        margin: '20px 0px 0px 15px',
        color: '#e41313'
    },

    tasks: {
        display: 'flex',
        marginTop: '10px',
        fontStyle: 'italic'
    },

    inputTask: {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center'
    },

    deleteTaskIcon: {
        margin: '27px 2px 0px 15px',
        color: '#e41313',
        cursor: 'pointer',
        fontSize: '1.6rem'
    }
}))