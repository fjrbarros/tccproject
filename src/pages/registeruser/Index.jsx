import React from 'react';
import { useStyles } from './Style';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import Logo from '../../assets/logo.png';
import ComponentRegisterUser from '../../components/registeruser/Index';

function PageRegister() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position='static'>
        <Toolbar variant='dense' className={classes.toolbar}>
          <Box className={classes.flex}>
            <img src={Logo} alt='Logo empresa' className={classes.logo} />
          </Box>
          <Box className={classes.toolbarCenter}>
            <Typography> Cadastro de usuário </Typography>
          </Box>
          <Box className={classes.flex} />
        </Toolbar>
      </AppBar>
      <ComponentRegisterUser isNewUser />
    </React.Fragment>
  );
}

export default PageRegister;