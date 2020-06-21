import React from 'react';
import { useStyles } from './Style';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import Logo from '../../assets/logo.png';
import Body from '../../components/body/Index';
import ComponentRegisterUser from '../../components/registeruser/Index';

function PageRegister() {

  const classes = useStyles();

  return (
    <Body>
      <AppBar position='static'>
        <Toolbar variant='dense' className={classes.toolbar}>
          <Box className={classes.flex}>
            <img src={Logo} alt='Logo empresa' className={classes.logo} />
          </Box>
          <Box className={classes.toolbarCenter}>
            <Typography variant='h6' color='inherit' >
              Cadastro de usuário
            </Typography>
          </Box>
          <Box className={classes.flex} />
        </Toolbar>
      </AppBar>
      <Box className={classes.content}>
        <ComponentRegisterUser />
      </Box>
    </Body>
  );
}

export default PageRegister;