import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    width: '300px',
    padding: '10px',
  },

  modalBottom: {
    display: 'flex',
    marginTop: '10px'
  },

  bottomLeft: {
    flex: '1'
  },

  buttonSave: {
    fontSize: '12px',
    background: '#1b73ff',
    color: '#ffffff',
    '&:hover': {
      background: '#0062ff'
    }
  }
}))